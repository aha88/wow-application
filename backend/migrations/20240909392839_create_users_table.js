/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("name");
    table.string("email");
    table.string("password");
    table.integer("role_id");
    table.integer("status");

    table
      .foreign("role_id")
      .references("id")
      .inTable("roles")
      .onDelete("CASCADE");
    table
      .foreign("status")
      .references("id")
      .inTable("status_code")
      .onDelete("CASCADE");

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
