/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("checkup", function (table) {
      table.increments("id").primary();
      table.string("company_id");
      table.string("type_checkup_id");
      table.string("condition_id");
     
  
      table
        .foreign("company_id")
        .references("id")
        .inTable("companies")
        .onDelete("CASCADE");
      table
        .foreign("company_id")
        .references("id")
        .inTable("companies")
        .onDelete("CASCADE");
      table
        .foreign("condition_id")
        .references("id")
        .inTable("condition_type")
        .onDelete("CASCADE");
  
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("checkup");
  };
  