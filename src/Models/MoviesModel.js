//https://api.themoviedb.org/3/discover/movie?api_key=23f1e4dc64dcdfe853dd2aee44cf082d

import axios from "axios";

async function MoviesModel() {
  const data = await axios
    .get(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=23f1e4dc64dcdfe853dd2aee44cf082d"
    )
    .then(function (response) {
      // return ở đây chỉ trả dữ liệu về cho axios chứ không phải cho MoviesModel
      return response.data.results;
    })
    .catch(function (error) {
      return error;
    });

  return data;
}

export default MoviesModel;
