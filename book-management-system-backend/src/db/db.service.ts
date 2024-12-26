import { Inject, Injectable } from '@nestjs/common';
import { DbModuleOptons } from './db.module';
import { access, readFile, writeFile } from 'fs/promises';

@Injectable()
export class DbService {
    @Inject('OPTIONS')
    private options: DbModuleOptons;

  async red(){
     const filePath = this.options.path

      try {
        await access(filePath)
      } catch (error) {
        return []
      }

     const str = await readFile(filePath,{encoding:'utf-8'})
     if(!str){
        return []
     }

      return JSON.parse(str)

  }

  async while (obj:Record<string,any>) {
    await writeFile(this.options.path,JSON.stringify(obj||[]),{encoding:'utf-8'})
   }
}
