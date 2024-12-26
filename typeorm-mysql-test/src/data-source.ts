import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "xinyu",
    database: "practice",
    synchronize: true,
    logging: true,
    entities: ['./**/entity/*.ts'],
    connectorPackage: "mysql2",
    extra: {
        connectionLimit: 10,
        authplugin: "sha256_password",
    },
    migrations: [],
    subscribers: [],
})
