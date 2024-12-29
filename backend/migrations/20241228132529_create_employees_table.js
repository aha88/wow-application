/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("employees", function (table) {
    table.increments("id").primary();
    table.string("company_id");
    table.string("name");
    table.string("registration_date");
    table.string("gender");
    table.string("height");
    table.string("weight");
    table.string("status");

    table
      .foreign("company_id")
      .references("id")
      .inTable("companies")
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
  return knex.schema.dropTable("employees");
};
