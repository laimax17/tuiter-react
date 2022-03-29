import React, { useState, useEffect }  from "react";
import * as likeService from "../../services/likes-service";
import * as dislikeService from "../../services/dislikes-service";

const TuitStats = ({tuit, likeTuit = () => {}, dislikeTuit = () => {}}) => {

    const [hasLiked, setHasLike] = useState(null);

    const [hasDisliked, setHasDisliked] = useState(null);

    useEffect(() => {
      checkLike();
      checkDislike();
    },[])

    const checkLike = async() => {
      const userLiked = likeService.userHasLikedTuit("me",tuit._id);
      if (userLiked) {
        setHasLike(true);
        // setHasDisliked(false);
      }else{
        setHasLike(false);
      }
    }

    const checkDislike = async() => {
      const userDisliked = dislikeService.userHasDislikedTuit("me",tuit._id);
      if (userDisliked){
        setHasDisliked(true);
        // setHasLike(false);
      }else{
        setHasDisliked(false);
      }
    }

    const clickOnLike = async() => {
      likeTuit(tuit);
      checkLike();
      checkDislike();
    }

    const clickOnDislike = async() => {
      dislikeTuit(tuit);
      checkLike();
      checkDislike();
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
          <span onClick={() => clickOnLike()}>
              {
                hasLiked ? (
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
          <span onClick={() => clickOnDislike()}>
              {
                hasDisliked ? (
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