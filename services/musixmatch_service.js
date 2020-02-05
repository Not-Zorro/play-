require('dotenv').config();
const fetch = require('node-fetch');

module.exports = async function fetchMusicData(title, artistName) {
  try {
    let apikey = process.env.MUSIXMATCH_KEY
    let url = `https://api.musixmatch.com/ws/1.1/matcher.track.get?q_artist=${artistName}&q_track=${title}&apikey=${apikey}`
    let musicData = await fetch(url).then(response => response.json()).then(data => data)
    return musicData
  } catch (e) {
    console.log(e)
  }
}
