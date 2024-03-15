import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("categories", (tableBuider) => {
    tableBuider.increments("id").notNullable().primary();
    tableBuider
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    tableBuider.string("name").notNullable();
    tableBuider.string("description");
    tableBuider.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("categories");
}
