const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Simple logger middleware
app.use((req, res, next) => {
	const start = Date.now();
	res.on('finish', () => {
		const ms = Date.now() - start;
		console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`);
	});
	next();
});

// In-memory rate limiter per api key
const RATE_LIMIT = 100; // requests
const WINDOW_MS = 60 * 1000; // 1 minute
const buckets = new Map();

function rateLimiter(req, res, next) {
	const key = req.headers['x-api-key'] || req.ip;
	const entry = buckets.get(key) || { count: 0, reset: Date.now() + WINDOW_MS };
	if (Date.now() > entry.reset) {
		entry.count = 0;
		entry.reset = Date.now() + WINDOW_MS;
	}
	entry.count++;
	buckets.set(key, entry);
	res.set('X-RateLimit-Limit', RATE_LIMIT);
	res.set('X-RateLimit-Remaining', Math.max(0, RATE_LIMIT - entry.count));
	if (entry.count > RATE_LIMIT) {
		res.set('Retry-After', Math.ceil((entry.reset - Date.now()) / 1000));
		return res.status(429).json({ message: 'Too Many Requests' });
	}
	next();
}

// Cleanup expired buckets periodically
setInterval(() => {
	const now = Date.now();
	for (const [k, v] of buckets.entries()) {
		if (v.reset < now) buckets.delete(k);
	}
}, WINDOW_MS);

// Dual auth middleware: JWT first, then API key
const SECRET = process.env.PRUEBA_TECNICA_SECRET_KEY || 'PRUEBA_TECNICA_SECRET_KEY';
function dualAuth(req, res, next) {
	const auth = req.headers['authorization'];
	if (auth && auth.startsWith('Bearer ')) {
		const token = auth.split(' ')[1];
		try {
			const payload = jwt.verify(token, SECRET);
			req.user = payload;
			return next();
		} catch (err) {
			return res.status(401).json({ message: 'Invalid token' });
		}
	}

	const apiKey = req.headers['x-api-key'];
	if (!apiKey) return res.status(401).json({ message: 'Missing credentials' });
	// For the gateway, we just forward the key downstream; validation is done by service
	req.apiKey = apiKey;
	return next();
}

app.use(rateLimiter);
app.use(dualAuth);

// Proxy helper
async function proxyToPaymentService(req, res) {
	const target = process.env.PAYMENT_SERVICE_URL || 'http://localhost:3001';
	const url = `${target}${req.originalUrl.replace(/^\/api\/v1/, '')}`;
	try {
		const headers = { ...req.headers };
		// propagate relevant headers
		headers['host'] = undefined;
		const resp = await axios({ method: req.method, url, data: req.body, headers, timeout: 5000 });
		res.status(resp.status).json(resp.data);
	} catch (err) {
		if (err.response) {
			res.status(err.response.status).json(err.response.data);
		} else if (err.code === 'ECONNABORTED') {
			res.status(504).json({ message: 'Gateway timeout' });
		} else {
			res.status(502).json({ message: 'Bad gateway' });
		}
	}
}

// Routes to proxy
app.use('/api/v1/transactions', (req, res) => proxyToPaymentService(req, res));
app.use('/api/v1/settlements', (req, res) => proxyToPaymentService(req, res));

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'api-gateway', timestamp: new Date().toISOString() }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API Gateway listening on ${port}`));

