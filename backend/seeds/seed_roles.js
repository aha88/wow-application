/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  await knex('roles').insert([
    {id:1, name: 'Admin', company_id: 1},
    {id:2, name: 'Manager', company_id: 1},
    {id:3, name: 'HR', company_id: 1},
    {id:4, name: 'Employee', company_id: 1}
  ]);
};
