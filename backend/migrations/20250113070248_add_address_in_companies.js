/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('companies', function(table) {
        table.string('address1').nullable().after('status'); 
        table.string('address2').nullable().after('address1'); 
        table.string('city').nullable().after('address2'); 
        table.string('states_id').nullable().after('city'); 
        table.string('postcode').nullable().after('states'); 

      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('companies', function(table) {
        table.dropColumn('address1'); 
        table.dropColumn('address2'); 
        table.dropColumn('city'); 
        table.dropColumn('states_id'); 
        table.dropColumn('postcode'); 
      });
};
