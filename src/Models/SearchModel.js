import axios from "axios";

async function SearchModel(value) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=23f1e4dc64dcdfe853dd2aee44cf082d&query=${value}`
  );
  return response.data.results;
}

export default SearchModel;

//https://api.themoviedb.org/3/search/movie?api_key=23f1e4dc64dcdfe853dd2aee44cf082d&query=marvel
