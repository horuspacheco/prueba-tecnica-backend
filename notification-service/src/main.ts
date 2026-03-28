import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
	const port = process.env.PORT || 3002;
	await app.listen(port);
	console.log(`Notification service listening on ${port}`);
}

bootstrap();
