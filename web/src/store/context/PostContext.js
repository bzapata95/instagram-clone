import React, { useReducer, createContext } from "react";

import api from "../../services/api";

import { postReducer } from "../reducer/postReducer";
import { GET_POST, GET_POST_SUCCESS, GET_POST_ERROR } from "../types/typePost";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const initialState = {
    post: "",
    loading: false,
    error: false,
    message: null
  };

  const [state, dispatch] = useReducer(postReducer, initialState);

  const getPost = async id => {
    dispatch({ type: GET_POST });
    try {
      const res = await api.get(`/photos/${id}`);

      if (res.status === 200) {
        dispatch({ type: GET_POST_SUCCESS, payload: res.data });
      }
    } catch (error) {
      dispatch({ type: GET_POST_ERROR, payload: error.response.data.message });
    }
  };

  return (
    <PostContext.Provider
      value={{
        post: state.post,
        loading: state.loading,
        error: false,
        message: state.message,
        getPost
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
