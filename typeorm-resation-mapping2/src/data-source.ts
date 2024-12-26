import "reflect-metadata"
import { DataSource } from "typeorm"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "xinyu",
    database: "typeorm_test",
    synchronize: true,
    logging: true,
    entities: ['./**/entity/*.ts'],
    migrations: [],
    subscribers: [],
    connectorPackage:'mysql2',
    extra:{
        authPlugin: 'sha256_password'
    }
})
