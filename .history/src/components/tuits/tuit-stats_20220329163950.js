import React, { useState, useEffect }  from "react";
import * as likeService from "../../services/likes-service";
import * as dislikeService from "../../services/dislikes-service";

const TuitStats = ({tuit, likeTuit = () => {}, dislikeTuit = () => {}}) => {

    const [like, setLike] = useState(0);

    const [dislike, setDislike] = useState(0);

    useEffect(() => {
      checkLike();
      checkDislike();
    })
    const checkLike = async() => {
      const userLiked = likeService.userHasLikedTuit("me",tuit._id);
      if (!userLiked) {
        setLike(1);
        setDislike(0);
      }else{
        setLike(0);
      }
    }

    const checkDislike = async() => {
      const userDisliked = dislikeService.userHasDislikedTuit("me",tuit._id);
      if (!userDisliked){
        setDislike(1);
        setLike(0);
      }else{
        setDislike(0);
      }
    }

    const clickOnLike = async() => {
      likeTuit(tuit);
    }

    const clickOnDislike = async() => {
      dislikeTuit(tuit);
    }
    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          {tuit.stats && tuit.stats.replies}
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          {tuit.stats && tuit.stats.retuits}
        </div>

        {/* like button */}
        <div className="col">
          <span onClick={() => clickOnLike}>
              {
                tuit.stats && tuit.stats.likes && tuit.stats.likes > 0 ? (
                  <i className="fa-solid fa-thumbs-up"></i>
                ) : (
                  <i className="fa-regular fa-thumbs-up"></i>
                )
              
              }
              
            {tuit.stats && tuit.stats.likes}
            
          </span>
          </div>
          {/* dislike button */}
          <div className="col">
          <span onClick={() => clickOnDislike}>
              {
                tuit.stats && tuit.stats.dislikes && tuit.stats.dislikes > 0 ? (
                  <i class="fa-solid fa-thumbs-down"></i>
                ) : (
                  <i class="fa-regular fa-thumbs-down"></i>
                )
              
              }
              
            {tuit.stats && tuit.stats.dislikes}
            
          </span>
        </div>

        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
}
export default TuitStats;