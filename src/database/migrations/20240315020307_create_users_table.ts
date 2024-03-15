import type { Knex, TableBuilder } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("users", (tableBuilder) => {
    tableBuilder.increments("id").notNullable().primary();
    tableBuilder.string("name").notNullable();
    tableBuilder.string("email").notNullable();
    tableBuilder.string("password").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("user");
}
