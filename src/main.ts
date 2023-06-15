import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('TIENDA DE COSMETICOS')
    .setDescription('API de la tienda de cosmeticos')
    .setVersion('1.0')
    .addTag('Clientes')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, document,{
    swaggerOptions: { filter: true, displayRequestDuration: true },
  });
  

  await app.listen(process.env.PORT);
  console.log(`Api corriendo en ${await app.getUrl()}`);
}
bootstrap();
