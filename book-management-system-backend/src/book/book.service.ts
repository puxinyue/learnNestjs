import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DbService } from 'src/db/db.service';
import { Book } from './entities/book.entity';

function randomNum() {
  return Math.floor(Math.random() * 1000000);
}

@Injectable()
export class BookService {
  @Inject() dbService:DbService

  async create(createBookDto: CreateBookDto) {
    const list:Book[] = await this.dbService.red()
    const book = new Book()
    book.author = createBookDto.author
    book.cover = createBookDto.cover
    book.description = createBookDto.description
    book.name = createBookDto.name
    book.id = randomNum()
    list.push(book)
    await this.dbService.while(list)
    return book;
  }

 async getList(name?: string) {
    const list:Book[] = await this.dbService.red()
    const books = name ?list.filter((item)=>item.name.includes(name)):list
    return books
  }

 async findOne(id: number|string) {
    const list:Book[] = await this.dbService.red()
    const findList = list?.find((item)=>item.id==id)
    return findList
  }

 async update(updateBookDto: UpdateBookDto) {
    const list:Book[] = await this.dbService.red()
    const newList = list?.find((item)=>item.id==updateBookDto.id)
    if(!newList) {
      throw new BadRequestException('该图书不存在');
  }
    newList.author = updateBookDto.author
    newList.cover = updateBookDto.cover
    newList.description = updateBookDto.description
    newList.name = updateBookDto.name

    this.dbService.while(list)
    return newList;
  }

 async delete(id: number|string) {
  const books: Book[] = await this.dbService.red();
  const index = books.findIndex(book => book.id == id);

  if(index !== -1) {
      books.splice(index, 1);
      await this.dbService.while(books);
  }
}

}
