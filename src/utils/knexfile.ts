import { Knex } from "knex";

var environment = process.env.NODE_ENV;

var isDevelopment = environment !== "production";

const development: Knex.Config = {
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    database: "my_books",
    user: "postgres",
    password: "root",
  },
  migrations: {
    directory: "../database/migrations",
  },
  seeds: {
    directory: "../database/seeds",
  },
};

const production: Knex.Config = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    directory: "../database/migrations",
  },
  seeds: {
    directory: "../database/seeds",
  },
};

const config: Knex.Config = isDevelopment ? development : production;

export default config;
