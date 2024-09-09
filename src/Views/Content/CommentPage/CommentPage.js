import "./CommentPage.scss";
import DefaultAvatar from "./DefaultAvatar.png";

function CommentPage(props) {
  return (
    <div className="wrapperComments">
      {props.comments.length === 0 && (
        <div className="CommentItem">
          <h2>0 comment</h2>
        </div>
      )}

      {props.comments.map((comment) => (
        <div key={comment.id} className="CommentItem">
          <img
            alt=""
            src={
              comment.author_details.avatar_path
                ? `https://image.tmdb.org/t/p/w500${comment.author_details.avatar_path}`
                : DefaultAvatar
            }
            className="avatar"
          />
          <div className="contentComment">
            <p className="nameOfComment">@{comment.author_details.username}</p>
            {comment.content.split("\r\n").map((pagrapgh) => (
              <p>{pagrapgh}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentPage;
