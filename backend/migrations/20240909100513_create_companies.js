/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('companies', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string('registration_number');
        table.string('company_address');
        table.string('phone');
        table.string('email');
        table.integer('status');

        table.foreign('status').references('id').inTable('status_code').onDelete('CASCADE');

        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('companies');
};
