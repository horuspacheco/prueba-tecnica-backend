import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
	const port = process.env.PORT || 3001;
	await app.listen(port);
	console.log(`Payment service listening on ${port}`);
}

bootstrap();
