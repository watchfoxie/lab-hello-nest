import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversitiesController } from './universities.controller';
import { UniversitiesService } from './universities.service';
import { UniversityEntity } from './university.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UniversityEntity])],
  controllers: [UniversitiesController],
  providers: [UniversitiesService],
  exports: [UniversitiesService, TypeOrmModule],
})
export class UniversitiesModule {}
