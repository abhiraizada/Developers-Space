import axios from "axios";
import { setAlert } from "./alert";
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, UPDATE_PROFILE } from "./types";

//All Posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.repsonse.statusText, status: err.repsonse.status },
    });
  }
};

//Like Profile
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    console.log("res[onse os : ", res);
    console.log("res[onse os : ", res.data);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    console.log("res[onse err: ", err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.repsonse.statusText, status: err.repsonse.status },
    });
  }
};

//Unlike Profile
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.repsonse.statusText, status: err.repsonse.status },
    });
  }
};