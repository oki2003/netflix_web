import { useNavigate } from "react-router-dom";
import "./IdeaSearch.css";

function IdeaSearch(props) {
  const navigate = useNavigate();
  function handleChooseIdea(id) {
    navigate(`/VideoPlayer/${id}`);
  }
  if (props.data.length === 0 || props.check === false) {
    return <div></div>;
  } else {
    return (
      <div id="wrapperIdeaSearch">
        {props.data.map((movie) => (
          <div
            onMouseDown={(e) => {
              handleChooseIdea(movie.id);
            }}
            key={movie.id}
            className="IdeaSearchItem"
          >
            {movie.title}
          </div>
        ))}
      </div>
    );
  }
}

export default IdeaSearch;
