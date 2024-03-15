import type { Knex, TableBuilder } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("users", (tableBuilder) => {
    tableBuilder.increments("id").primary();
    tableBuilder.string("name");
    tableBuilder.string("email");
    tableBuilder.string("password");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("user");
}
