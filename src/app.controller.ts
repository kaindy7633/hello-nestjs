import { Controller, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('公共接口')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('list')
  getHello(): string {
    return 'hello /app/list111';
  }

  @Post('list')
  create(): string {
    return 'hello post method /app/list111';
  }

  @Get('user_*')
  getUser(): string {
    return 'getUser';
  }

  @Put('list/:id')
  update(): string {
    return 'update';
  }
}
