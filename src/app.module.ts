import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { taskDb } from './config/taskDb.config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [TypeOrmModule.forRoot(taskDb), TasksModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
