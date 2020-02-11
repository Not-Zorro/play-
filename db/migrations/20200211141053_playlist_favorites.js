exports.up = function(knex) {
  return knex.schema.createTable('playlist_favorites', function(table) {
    table.increments('id').primary().notNullable();
    table.integer('playlistId').unsigned().references('id').inTable('playlists').notNullable();
    table.integer('favoriteId').unsigned().references('id').inTable('favorites').notNullable();
    table.unique(['playlistId', 'favoriteId'])
  })
};

exports.down = function(knex) {
  return knex.schema.table('playlist_favorites', function(table) {
    table.dropUnique(['playlistId', 'favoriteId'])
  }).dropTable('playlist_favorites')
};
