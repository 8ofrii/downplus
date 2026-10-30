import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Global API Version Prefix
  app.setGlobalPrefix('api/v1');

  // Security & Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Interceptors & Exception Filters
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  // CORS Configuration
  const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : ['http://localhost:3001', 'http://localhost:8081'];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow mobile apps and server-to-server requests with no origin
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Dev-friendly fallback
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Swagger Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('Down Plus — Digital Health Engine API')
    .setDescription(
      'Complete OpenAPI 3.1 specification for Down Plus mobile app, Doctor portal, and Admin engine.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Authentication')
    .addTag('Children')
    .addTag('Milestones & Skills')
    .addTag('Medical Documents')
    .addTag('Clinical Case Baseline')
    .addTag('AI Clinical Copilot')
    .addTag('Doctor Matching Engine')
    .addTag('Sharing & Guest Portal')
    .addTag('Doctor Portal')
    .addTag('Subscriptions & Paymob')
    .addTag('Timeline & Case Updates')
    .addTag('Super Admin Operations')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.APP_PORT || 3000;
  await app.listen(port);

  logger.log(`🚀 Down Plus API running on: http://localhost:${port}/api/v1`);
  logger.log(`📖 Swagger API Docs available at: http://localhost:${port}/api/docs`);
}

bootstrap();
