/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('companies', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string('register_date');
        table.string('counter_name');
        table.string('status');

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
exports.down = function(knex) {
    return knex.schema.dropTable('companies');
};
