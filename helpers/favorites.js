function formatFav(fav) {
  delete fav.createdAt; delete fav.updatedAt;
  return fav;
}

module.exports = formatFav
