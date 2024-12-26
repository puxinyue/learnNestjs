import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CityService {
  @InjectRepository(City)
  private cityRepository: Repository<City>;

  @InjectEntityManager()
  private entityManager: EntityManager;


  create(createCityDto: CreateCityDto) {    
    // this.cityRepository.save(createCityDto);

    return 'This action adds a new city';
  }

 async findAll() {
  //   const city = new City();
  //   city.name = '华北'
  //   await this.cityRepository.save(city);

  //  const parent = await this.cityRepository.findOne({
  //     where: { name: '华北' },
  //   })

  //   const children = new City();
  //   children.name = '山东'
    
  //   if(parent){
  //     children.parent = parent;
  //     await this.cityRepository.save(children);
  //   }

  //   return this.entityManager.getTreeRepository(City).findTrees();

    // const city = new City();
    // city.name = '华南'
    // await this.cityRepository.save(city);
     
    // const children = new City();
    // children.name = '云南'
    // const parent = await this.cityRepository.findOne({
    //   where: { name: '华南' },
    // })

    // if(parent){
    //   children.parent = parent;
    // }
    // await this.cityRepository.save(children);
   
    // const children2 = new City();
    // children2.name = '昆明'
    
    // const parent2 = await this.cityRepository.findOne({
    //   where: { name: '云南' },
    // })

    // if(parent2){
    //   children2.parent = parent2;
    // }
    // await this.cityRepository.save(children2);

    // return this.entityManager.getTreeRepository(City).findTrees();

   // return this.entityManager.getTreeRepository(City).findRoots() // 查询根节点
     const parent = await this.cityRepository.findOne({where:{name:'云南'}})
     return this.entityManager.getTreeRepository(City).findDescendantsTree(parent) // 查询某个节点的所有子节点
    
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
