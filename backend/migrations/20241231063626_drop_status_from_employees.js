/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    // Drop the 'status' column from the 'employees' table
    await knex.schema.table('employees', function(table) {
      table.dropColumn('status');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function(knex) {
    // Add the 'status' column back to the 'employees' table
    await knex.schema.table('employees', function(table) {
      table.integer('status').notNullable().defaultTo(1);  
    });
  };
  