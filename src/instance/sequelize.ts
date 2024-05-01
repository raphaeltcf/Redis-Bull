import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";

export const connection = new Sequelize({
  dialect: "postgres",
  host: process.env.DATABASE_HOST || "",
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME || "",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME || "",
  models: [User],
});

export default connection;
