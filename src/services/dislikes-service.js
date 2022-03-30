import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;



const api = axios.create({
  withCredentials: true
});

/**
 * get all tuits disliked by the user
 * @param {*} userId current user id
 * @returns an array of tuits disliked by user
 */
export const findAllTuitsDislikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/dislikes`)
        .then(response => response.data);

export const findAllUsersThatDislikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/dislikes`)
        .then(response => response.data);

export const userDislikesTuit = (uid, tid) =>{
    return api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);
    }

/**
 * 
 * @param {string} uid user id
 * @param {string} tid tuit id
 * @returns if a user has disliked the tuit, it returns a dislike object
 */
export const userHasDislikedTuit = (uid,tid) =>  {
    return api.get(`${USERS_API}/${uid}/hasDisliked/${tid}`)
        .then(response => response.data);
    }