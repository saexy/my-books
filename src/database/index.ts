import knex from "knex";
import knexConfig from "../utils/knexfile";

export const database = knex(knexConfig);
