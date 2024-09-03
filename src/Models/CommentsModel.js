import axios from "axios";

async function CommentsModel(id) {
  const lstMoives = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=23f1e4dc64dcdfe853dd2aee44cf082d`
  );

  return lstMoives.data.results;
}

export default CommentsModel;
