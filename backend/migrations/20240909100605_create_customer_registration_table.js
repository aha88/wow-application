/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('customer_registration', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string('email');
        table.string('phone');
        table.string('national_id');
        table.string('birth_of_date');
        table.text('address');
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('customer_registration');
};
