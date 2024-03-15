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
    host: "localhost2",
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

const config: Knex.Config = isDevelopment ? development : production;

export default config;
