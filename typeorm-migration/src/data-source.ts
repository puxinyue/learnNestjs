import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "xinyu",
    database: "migration-test",
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: ['./src/migration/**.ts'],
    subscribers: [],
    connectorPackage:'mysql2',
    extra: {
        authPlugin: "sha256_password"
    }
})
