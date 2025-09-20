import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';
import { JsonParseExceptionFilter } from './common/filters/json-parse-exception.filter';
import { APP_CONFIG } from './common/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurare Swagger
  const config = new DocumentBuilder()
    .setTitle(APP_CONFIG.swagger.title)
    .setDescription(APP_CONFIG.swagger.description)
    .setVersion(APP_CONFIG.swagger.version)
    .addTag('students', 'Operații pentru gestionarea studenților')
    .addTag('universities', 'Operații pentru gestionarea universităților')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(APP_CONFIG.swagger.path, app, document);

  // Configurare globală pentru validare
  app.useGlobalPipes(new ValidationPipe());

  // Configurare globală pentru filtrarea erorilor de parsare JSON
  app.useGlobalFilters(new JsonParseExceptionFilter());

  // Pornire server
  await app.listen(APP_CONFIG.server.port);
  console.log(`🚀 Aplicația rulează pe portul ${APP_CONFIG.server.port}`);
  console.log(
    `📚 Documentația API: http://localhost:${APP_CONFIG.server.port}/${APP_CONFIG.swagger.path}`,
  );
}

void bootstrap();
