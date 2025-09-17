import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './modules/students/students.module';
import { UniversitiesModule } from './modules/universities/universities.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './database/typeorm.config';

@Module({
  imports: [
    // Configurez ConfigModule pentru variabilele de mediu
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // Configurez TypeORM async cu retry pentru conexiune la MySQL
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UniversitiesModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, TypeOrmConfigService],
})
export class AppModule {}
