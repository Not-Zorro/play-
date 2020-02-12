exports.up = function(knex) {
  return knex.schema.createTable('playlist_favorites', function(table) {
    table.increments('id').primary().notNullable();
    table.integer('playlist_id').unsigned().references('id').inTable('playlists').notNullable();
    table.integer('favorite_id').unsigned().references('id').inTable('favorites').notNullable();
    table.unique(['playlist_id', 'favorite_id'])
  })
};

exports.down = function(knex) {
  return knex.schema.table('playlist_favorites', function(table) {
    table.dropUnique(['playlist_id', 'favorite_id'])
  }).dropTable('playlist_favorites')
};
