import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files',20,{
    dest: './uploads'
  }))
  uploadFiles(@UploadedFiles() files:Array<Express.Multer.File> ,@Body() body): string {
    console.log(files)
    return 'sdsda'
  }

}
