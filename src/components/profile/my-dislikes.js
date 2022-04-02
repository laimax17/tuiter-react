import Tuits from "../tuits";
import * as service from "../../services/dislikes-service";
import {useEffect, useState} from "react";
import SampleTuit from "../tuits/SampleTuit";
/**
 * find all disliked tuits
 * @returns an array of tuits disliked
 */
const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuits] = useState([]);
    const findTuitsIDislike = () =>
        service.findAllTuitsDislikedByUser("me")
            .then((tuits) => setDislikedTuits(tuits));

    const sample = {
    tuit: "test tuit",
    postedBy: "1234abc",
    postedOn: "2022/12/31",
    stats: {
      replies: 1,
      retuits: 1,
      likes: 100,
      dislikes: 100,
    },
  };

    useEffect(findTuitsIDislike, []);
    return(
        <div>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIDislike}/>
            <SampleTuit tuit={sample}></SampleTuit>
      </div>

    );
};
export default MyDislikes;