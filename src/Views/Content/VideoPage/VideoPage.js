import "./VideoPage.css";
import RelatedVideoPage from "../RelatedVideoPage/RelatedVideoPage";
import CommentPage from "../CommentPage/CommentPage";

function VideoPage(props) {
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "60%" }}>
          <iframe
            width="100%"
            height="526"
            src={`https://www.youtube.com/embed/${props.data}`}
            frameborder="0"
            allowFullScreen
            style={{ borderRadius: "15px" }}
          ></iframe>

          <CommentPage comments={props.comments} />
        </div>
        <RelatedVideoPage relatedvideos={props.relatedvideos} />
      </div>
    </>
  );
}

export default VideoPage;
