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
      const userLiked = await likeService.userHasLikedTuit("me",tuit._id);
      // console.log("userliked");
      // console.log(userLiked);
      if (!userLiked) {
        setHasLike(false);
        //setHasDisliked(false);
      }else{
        setHasLike(true);
        //setHasDisliked(false);
      }
    }

    const checkDislike = async() => {
      const userDisliked = await dislikeService.userHasDislikedTuit("me",tuit._id);
      // console.log("userdisliked");
      // console.log(userDisliked);
      if (!userDisliked){
        setHasDisliked(false);
        //setHasLike(false);
      }else{
        setHasDisliked(true);
        //setHasLike(false);
      }
    }

    const clickOnLike = async() => {
      await likeTuit(tuit);
      await checkLike();
      await checkDislike();
    }

    const clickOnDislike = async() => {
      await dislikeTuit(tuit);
      await checkLike();
      await checkDislike();
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