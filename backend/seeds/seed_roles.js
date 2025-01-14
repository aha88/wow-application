/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  await knex('roles').insert([
    {id:1, name: 'Admin'},
    {id:2, name: 'HR'},
    {id:3, name: 'Employee'},
    {id:4, name: 'OSH'},
    {id:5, name: 'HSE'},
    {id:6, name: 'Medical Provider'},
    {id:7, name: 'Freelance Medical Provider'},
    {id:8, name: 'TPA'},
    {id:9, name: 'MCO'},
    {id:10, name: 'Insurance'},
    {id:11, name: 'Broker'},
  ]);
};
