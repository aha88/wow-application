/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("condition_type", function (table) {
      table.increments("id").primary();
      table.string("checkup_id");
      table.string("name");
      table.string("value");
   
      table
        .foreign("checkup_id")
        .references("id")
        .inTable("checkup")
        .onDelete("CASCADE");
  
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("condition_type");
  };
  