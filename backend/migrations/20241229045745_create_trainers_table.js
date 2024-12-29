/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("trainers", function (table) {
      table.increments("id").primary();
      table.string("event_id");
      table.string("company_id");
      table.string("trainer_name");
      table.string("designation");
      table.string("title");
  
      table
        .foreign("event_id")
        .references("id")
        .inTable("events")
        .onDelete("CASCADE");
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
    return knex.schema.dropTable("trainers");
  };
  