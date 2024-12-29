/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("certifications", function (table) {
      table.increments("id").primary();
      table.string("company_id");
      table.string("name");
      table.string("date");
  
      table
        .foreign("company_id")
        .references("id")
        .inTable("companies")
        .onDelete("CASCADE");
  
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("certifications");
  };
  