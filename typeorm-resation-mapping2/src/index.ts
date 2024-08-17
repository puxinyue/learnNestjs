import { AppDataSource } from "./data-source"
import { Department } from "./entity/Department";
import { Employee } from "./entity/Employee";


AppDataSource.initialize().then(async () => {

// const e1 = new Employee();
//     e1.name = '张三';

//     const e2 = new Employee();
//     e2.name = '李四';

//     const e3 = new Employee();
//     e3.name = '王五';

//     const d1 = new Department();
//     d1.name = '技术部';
//     d1.employees = [e1, e2, e3];

//     await AppDataSource.manager.save(Department, d1);

   const deps = await AppDataSource.manager.find(Employee,{ relations: ['department'] });
    console.log(deps);
console.log(deps.map(item => item.department))

}).catch(error => console.log(error))
