function formatFav(fav) {
  delete fav.created_at; delete fav.updated_at;
  return fav;
}

module.exports = formatFav
