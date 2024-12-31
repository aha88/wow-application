/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('employees', function(table) {
        table.string('height').nullable().after('company_id'); ; 
        table.string('weight').nullable().after('company_id'); ;  
        table.string('registration_date').nullable().after('company_id'); ;  
        table.string('gender', 10).nullable().after('company_id'); ; 
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('employees', function(table) {
        table.dropColumn('height');  
        table.dropColumn('weight');  
        table.dropColumn('gender');  
      });
};
