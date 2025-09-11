import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { UniversitiesModule } from '../universities/universities.module';

@Module({
  imports: [UniversitiesModule],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
