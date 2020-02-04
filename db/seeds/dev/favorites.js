exports.seed = function(knex) {
  return knex('favorites').del()
    .then(() => {
      return Promise.all([
        knex('favorites').insert({
          title: 'We Will Rock You',
          artistName: 'Queen',
          genre: 'Rock',
          rating: 88 }, 'id'),
        knex('favorites').insert({
          title: 'Careless Whisper',
          artistName: 'George Michael',
          rating: 93 }, 'id')
      ])
      .then(() => console.log('Seeding complete!'))
      .catch(error => console.log(`Error seeding data: ${error}`))
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
