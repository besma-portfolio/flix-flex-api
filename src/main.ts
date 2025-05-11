import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomValidationPipe } from './utils/exceptions/custom-validation-pipe';
import { CustomExceptionFilter } from './utils/exceptions/global-exception-filter';

async function bootstrap() {
  // Creates a nestjs express instance, with CORS enabled
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get<ConfigService>(ConfigService);

  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  // Adds security headers to the response
  app.use(helmet());

  // Register a global validation pipe to automatically validate and transform incoming request data
  // - `transform: true` allows automatic type conversion (e.g., string to number)
  // - `whitelist: true` removes any properties that are not part of the DTO
  app.useGlobalPipes(
    new CustomValidationPipe({ transform: true, whitelist: true }),
  );

  // Register a global exception filter to handle all uncaught exceptions in a consistent way
  // - It formats error responses and can include custom error codes or structures
  const adapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CustomExceptionFilter(adapterHost));

  // Configure Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Flix Flex API')
    .setDescription(' Flix Flex API Documentation')
    .setVersion('1.0.0')
    .addBearerAuth({
      description: 'JWT Bearer Authentication token',
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: false,
    },
  });

  const PORT = configService.get<number>('PORT') || 3000;
  const logger = new Logger('Main');
  logger.verbose(`Server is running on: http://localhost:${PORT}/api`);
  await app.listen(PORT);
}
bootstrap();
