import "./RelatedVideoPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function RelatedVideoPage(props) {
  const navigate = useNavigate();
  function handleRelatedVideo(id) {
    console.log(`id la ${id}`);
    navigate(`/MainPage/VideoPlayer/${id}`);
  }
  return (
    <div className="wrapperRelatedVideo">
      {props.relatedvideos.map((movie) => {
        if (movie.backdrop_path) {
          return (
            <div
              key={movie.id}
              className="relatedItem"
              onClick={() => {
                handleRelatedVideo(movie.id);
              }}
            >
              <div className="wrapperImgRelatedMovie">
                <img
                  className="imgRelatedMovie"
                  alt="Ảnh ko tải được"
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                />
                <FontAwesomeIcon icon={faPlay} className="playRelatedIcon" />
              </div>
              <h4 className="titleRelatedMovie">{movie.title}</h4>
            </div>
          );
        }
      })}
    </div>
  );
}

export default RelatedVideoPage;
