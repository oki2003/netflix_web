import "./HomePage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function HomePage(props) {
  const navigate = useNavigate();
  function handleMovie(id) {
    navigate(`/MainPage/VideoPlayer/${id}`);
  }
  return (
    <>
      <div className="wrapperMovies">
        {props.data.map((movie) => (
          <div
            className="movieItem"
            key={movie.id}
            onClick={() => {
              handleMovie(movie.id);
            }}
          >
            <div className="wrapperImgMovie">
              <img
                className="imgMovie"
                alt="Ảnh ko tải được"
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              />
              <FontAwesomeIcon icon={faPlay} className="playIcon" />
            </div>
            {/* <h4 className="titleMovie">{movie.original_title}</h4> */}
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
