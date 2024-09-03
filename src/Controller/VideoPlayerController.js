import { useParams } from "react-router-dom";
import VideoPage from "../Views/Content/VideoPage/VideoPage";
import VideoPlayerModel from "../Models/VideoPlayerModel";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RelatedVideoModels from "../Models/RelatedVideoModel";
import CommentsModel from "../Models/CommentsModel";
function VideoPlayerController() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [key, setKey] = useState("");
  const [relatedvideos, setRelatedVideos] = useState([]);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const value = await VideoPlayerModel(id);
      if (value == null) {
        navigate("/MainPage/VideoNotFound");
      } else {
        setKey(value);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchRelatedData() {
      const value = await RelatedVideoModels(id);
      setRelatedVideos(value);
    }
    fetchRelatedData();
  }, [id]);

  useEffect(() => {
    async function fetchComments() {
      const value = await CommentsModel(id);
      setComments(value);
    }
    fetchComments();
  }, [id]);
  return (
    <VideoPage data={key} relatedvideos={relatedvideos} comments={comments} />
  );
}

export default VideoPlayerController;
