import { DynamicModule, Module } from '@nestjs/common';
import { DbService } from './db.service';

export interface DbModuleOptons {
 path:string
}

@Module({})
export class DbModule {
    static register(option:DbModuleOptons):DynamicModule{
        return {
            module: DbModule,
            providers:[DbService,{
                provide:'OPTIONS',
                useValue: option
            }],
            exports:[DbService],
        }
    }
}
