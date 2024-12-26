import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UploadedFile, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { storage } from './my-file-storage';
import * as path from 'path';


@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
 async getList(@Query('name') name: string) {
    return this.bookService.getList(name)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Put('update')
  async update(@Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(updateBookDto)
  }

  @Post('create')
  async create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto)
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.bookService.delete(id)
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{
    dest:'uploads',
    storage:storage,
    limits: {
      fileSize: 1024 * 1024 * 10
    },
    fileFilter:(req,file,callback)=>{
       const extName = path.extname(file.originalname)
        if(['.jpg','.png'].includes(extName)){
            callback(null,true)
        }else{
           callback(new Error('只支持jpg和png格式'),false)
        }
    }
  }))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return file.path
  }
}
