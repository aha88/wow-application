/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('status_registration').del()
  await knex('status_registration').insert([
    { id:1,  name: 'Pending'},
    { id:2,  name: 'Approved'},
    { id:3,  name: 'Rejected'},
  ]);
};
