/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('states').del()

  await knex('states').insert([
      { id:1 ,name: 'Johor', code: 'JHR' },
      { id:2 ,name: 'Kedah', code: 'KDH' },
      { id:3 ,name: 'Kelantan', code: 'KTN' },
      { id:4 ,name: 'Melaka', code: 'MLK' },
      { id:5 ,name: 'Negeri Sembilan', code: 'NSN' },
      { id:6 ,name: 'Pahang', code: 'PHG' },
      { id:7 ,name: 'Penang', code: 'PNG' },
      { id:8 ,name: 'Perak', code: 'PRK' },
      { id:9 ,name: 'Perlis', code: 'PLS' },
      { id:10 ,name: 'Sabah', code: 'SBH' },
      { id:11 ,name: 'Sarawak', code: 'SWK' },
      { id:12 ,name: 'Selangor', code: 'SGR' },
      { id:13 ,name: 'Terengganu', code: 'TRG' },
      { id:14 ,name: 'Kuala Lumpur', code: 'KUL' },
      { id:15 ,name: 'Labuan', code: 'LBN' },
      { id:16 ,name: 'Putrajaya', code: 'PJY' }
  ]);
};
