exports.up = function(knex) {
  return knex.schema.createTable('playlists', function(playlist) {
    playlist.increments('id').primary();
    playlist.string('title').notNullable();
    playlist.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('playlists');
};
