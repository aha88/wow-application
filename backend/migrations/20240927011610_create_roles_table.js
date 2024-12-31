/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('roles', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.integer('company_id');

        table.foreign('company_id').references('id').inTable('companies').onDelete('CASCADE');

        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('roles');
};
