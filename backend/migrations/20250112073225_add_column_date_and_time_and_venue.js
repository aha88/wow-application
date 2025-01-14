/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('events', function(table) {
        table.string('date').nullable().after('details'); ; 
        table.string('time').nullable().after('date'); ; 
        table.string('venue').nullable().after('time'); ; 


      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('events', function(table) {
        table.dropColumn('date'); 
        table.dropColumn('time');
        table.dropColumn('venue'); 
      });
};
