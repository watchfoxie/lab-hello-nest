import { Module } from '@nestjs/common';
import { StudentsModule } from './modules/students/students.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
