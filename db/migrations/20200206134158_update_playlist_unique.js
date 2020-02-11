exports.up = function(knex) {
  return knex.schema.table('playlists', function(playlist) {
    playlist.renameColumn('created_at', 'createdAt');
    playlist.renameColumn('updated_at', 'updatedAt');
    playlist.unique('title')
  })
};

exports.down = function(knex) {
  return knex.schema.table('playlists', function(table) {
    table.renameColumn('createdAt', 'created_at');
    table.renameColumn('updatedAt', 'updated_at');
    table.dropUnique('title')
  })
};
