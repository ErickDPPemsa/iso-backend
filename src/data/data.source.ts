import { DataSource } from "typeorm";
import { Report, User, UserReport } from "../entities";

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "Desarrollo1234",
    database: "ISO",
    synchronize: true,
    logging: false,
    entities: [User, Report, UserReport],
    subscribers: [],
    migrations: [],
    options: {
        trustServerCertificate: true
    },
})