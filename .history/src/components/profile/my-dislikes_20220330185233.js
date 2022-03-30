import Tuits from "../tuits";
import * as service from "../../services/dislikes-service";
import {useEffect, useState} from "react";

/**
 * find all disliked tuits
 * @returns an array of tuits disliked
 */
const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuits] = useState([]);
    const findTuitsIDislike = () =>
        service.findAllTuitsDislikedByUser("me")
            .then((tuits) => setDislikedTuits(tuits));
    useEffect(findTuitsIDislike, []);
    
    return(
        <div>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIDislike}/>
        </div>
    );
};
export default MyDislikes;