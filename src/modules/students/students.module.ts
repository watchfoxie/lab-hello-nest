import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { UniversitiesModule } from '../universities/universities.module';
import { StudentEntity } from './student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity]), UniversitiesModule],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
