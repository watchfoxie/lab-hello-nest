import { Module } from '@nestjs/common';
import { UniversityModule } from './modules/university/university.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UniversityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
