import { AppDataSource } from "./data-source"
import { Article } from "./entity/Article"
import { Tag } from "./entity/Tag"

AppDataSource.initialize().then(async () => {
    // const a1 = new Article();
    // a1.title = 'aaaa';
    // a1.content = 'aaaaaaaaaa';

    // const a2 = new Article();
    // a2.title = 'bbbbbb';
    // a2.content = 'bbbbbbbbbb';

    // const t1 = new Tag();
    // t1.name = 'ttt1111';

    // const t2 = new Tag();
    // t2.name = 'ttt2222';

    // const t3 = new Tag();
    // t3.name = 'ttt33333';

    // a1.tags = [t1,t2];
    // a2.tags = [t1,t2,t3];

    const entityManager = AppDataSource.manager;

    // await entityManager.save(t1);
    // await entityManager.save(t2);
    // await entityManager.save(t3);

    // await entityManager.save(a1);
    // await entityManager.save(a2);

    //查询
//  const deps =  await entityManager.find(Article, {relations: ['tags']})
//  console.log(deps)

// 删除跟新
   const art = await entityManager.findOne(Article,{
       where:{
            id:1
       },
       relations:['tags']
    })

     art.title = 'ccccc6666';
     art.tags = art.tags.filter(tag => tag.name.includes('ttt1111'))
    await entityManager.save(art)


}).catch(error => console.log(error))
