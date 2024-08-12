import { In } from "typeorm"
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.id = 1
    // user.firstName = "222bbb"
    // user.lastName = "aaa"
    // user.age = 25
    // await AppDataSource.manager.save(User,[
    //     { id:2,firstName: '222ccc', lastName: 'ccc', age: 21},
    //     { id:3,firstName: '333ddd', lastName: 'ddd', age: 22},
    //     { id:4,firstName: '444eee', lastName: 'eee', age: 23}
    // ])
    // await AppDataSource.manager.delete(User,[1])
    // console.log("Saved a new user with id: " + user.id)

   const user =  await AppDataSource.manager.find(User,{
        select:{
            age: true,
            firstName: true
        },
        where:{
            id: In([2,3])
        },
        order:{
            age: 'DESC'
        }
    })
    console.log(user)
    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

}).catch(error => console.log(error))
