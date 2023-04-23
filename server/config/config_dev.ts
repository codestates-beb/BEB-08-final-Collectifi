import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize';
dotenv.config();

interface Config {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect:Dialect;
  timezone: string;
}

const config:Config = {
 
      username : process.env.DB_USERNAME || "root",
      password : process.env.DB_PASSWD || "9164",
      database : process.env.DB_DBNAME || "test",
      host : process.env.DB_HOST || "localhost",
      dialect : "mysql",
      timezone: "+09:00"
};

export default config;