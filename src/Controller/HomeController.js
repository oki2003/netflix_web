import HomePage from "../Views/Content/HomePage/HomePage";
import LoadingPage from "../Views/Content/LoadingPage/LoadingPage";
import MoviesModel from "../Models/MoviesModel";
import { useEffect, useState } from "react";
function HomeController() {
  // return <HomePage data={[]} />;
  let [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fecthData() {
      let dulieu = await MoviesModel();
      setMovies(dulieu);
    }
    fecthData();
  }, []);

  if (movies.length < 1) {
    return <LoadingPage />;
  } else {
    return <HomePage data={movies} />;
  }
}

export default HomeController;
