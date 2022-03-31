import Tuits from "../tuits";
import * as service from "../../services/dislikes-service";
import {useEffect, useState} from "react";
import { sample } from "../../tests/tuit-dislike.test";
/**
 * find all disliked tuits
 * @returns an array of tuits di
 */
const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuits] = useState([]);
    const findTuitsIDislike = () =>
        service.findAllTuitsDislikedByUser("me")
            .then((tuits) => setDislikedTuits(tuits));
    useEffect(findTuitsIDislike, []);
    const tuit = sample
    return(
        <div>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIDislike}/>

        <h2
          className="fs-5">
          {tuit.postedBy && tuit.postedBy.username}
          @{tuit.postedBy && tuit.postedBy.username} -
            <span className="ms-1">{tuit.postedOn}</span></h2>
        {tuit.tuit}
   
      </div>

    );
};
export default MyDislikes;