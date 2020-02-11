exports.up = function(knex) {
  return knex.schema.createTable('favorites', function(fav) {
    fav.increments('id').primary();
    fav.string('title').notNullable();
    fav.string('artistName').notNullable();
    fav.string('genre').notNullable().defaultTo('Unknown');
    fav.integer('rating').notNullable();
    fav.timestamps(true, true);
  }).then(function() {
    return knex.schema.table('favorites', function(table) {
        table.renameColumn('created_at', 'createdAt');
        table.renameColumn('updated_at', 'updatedAt');
      })
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('favorites');
};
