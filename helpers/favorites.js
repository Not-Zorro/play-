function formatFav(fav) {
  delete fav.createdAt; delete fav.updatedAt; delete fav.playlist_id; delete fav.favorite_id;
  return fav;
}

module.exports = formatFav
