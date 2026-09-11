import 'dotenv/config';
import { Report } from "../reports/entities/report.entity";
import { User } from "../users/entities/user.entity";
import { envs } from "../config/envs";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    host: envs.DB_HOST,
    type: 'postgres',
    database: envs.DB_NAME,
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    port: envs.DB_PORT,
    entities: [Report, User],
    synchronize: false,
    migrations: ['dist/db/migrations/[0-9]*-*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;