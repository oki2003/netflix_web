import axios from "axios";

async function VideoPlayerModel(id) {
  const lstMoives = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=23f1e4dc64dcdfe853dd2aee44cf082d`
  );
  let key = null;
  if (lstMoives.data.results.length > 0) {
    key = lstMoives.data.results.filter((movie) => movie.type === "Trailer")[0]
      .key;
  }

  return key;
}

export default VideoPlayerModel;
