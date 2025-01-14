/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("trainer_events", function (table) {
        table.increments("id").primary();
        table.string("trainer_id");
        table.string("event_id");
        table.string("company_id");
        table.string("activities");
        table.string("equipment");
        table.string("remarks");
    
        table
            .foreign("trainer_id")
            .references("id")
            .inTable("trainers")
            .onDelete("CASCADE");
            
        table
          .foreign("event_id")
          .references("id")
          .inTable("events")
          .onDelete("CASCADE");
        table
          .foreign("company_id")
          .references("id")
          .inTable("companies")
          .onDelete("CASCADE");
    
        table.timestamps(true, true);
      });   
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("trainer_events");
};
