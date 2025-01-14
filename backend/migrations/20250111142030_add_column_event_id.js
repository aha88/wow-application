/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('attendances', function(table) {
        table.string('event_id').nullable().after('company_id'); ; 

        table.foreign('event_id').references('id').inTable('events').onDelete('CASCADE');

      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('attendances', function(table) {
        table.dropColumn('event_id');  
      });
};
