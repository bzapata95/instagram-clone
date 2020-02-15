import React, { createContext, useReducer } from "react";

import api from "../../services/api";

import { feedReducer } from "../reducer/feedReducer";
import {
  GET_FEEDS,
  LOADING_MORE,
  DEFAULT_ERROR,
  LIKE_ERROR,
  COMMENT_POST,
  COMMENT_ERROR,
  FOLLOW_USER,
  FOLLOW_ERROR,
  DELETE_POST,
  DELETE_ERROR,
  ADD_FEED,
  EXIT_APP
} from "../types/typeFeed";

export const FeedContext = createContext();

const FeedContextProvider = ({ children }) => {
  const initalState = {
    feeds: [],
    page: 0,
    pageSize: 12,
    loading: false,
    error: false,
    message: null
  };

  const [state, dispatch] = useReducer(feedReducer, initalState);

  const getFeeds = async (page = 0) => {
    try {
      const res = await api.get("/feeds", {
        params: { page, pageSize: state.pageSize, limit: state.feeds.length }
      });

      if (res.status === 200) {
        dispatch({ type: GET_FEEDS, payload: res.data.newArray });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const getMore = () => {
    dispatch({ type: LOADING_MORE });
  };

  const likeAction = async id => {
    try {
      await api.post(`/likes/${id}`);
      dispatch({ type: DEFAULT_ERROR });
    } catch (error) {
      dispatch({ type: LIKE_ERROR, payload: error.response.data.message });

      dispatch({ type: DEFAULT_ERROR });
    }
  };

  const commentAction = async (photo, body) => {
    try {
      const { data } = await api.post(`/comments/${photo}`, { body });
      dispatch({ type: COMMENT_POST, payload: data });
    } catch (error) {
      dispatch({ type: COMMENT_ERROR, payload: error.response.data.message });
      dispatch({ type: DEFAULT_ERROR });
    }
  };

  const followAction = async idUser => {
    try {
      await api.post(`/follows/${idUser}`);
      dispatch({ type: FOLLOW_USER, payload: idUser });
    } catch (error) {
      dispatch({ type: FOLLOW_ERROR, payload: error.response.data.message });
      dispatch({ type: DEFAULT_ERROR });
    }
  };

  const deleteAction = async photo => {
    try {
      await api.delete(`/photos/${photo.id}`, { params: { key: photo.key } });
      dispatch({ type: DELETE_POST, payload: photo.id });
    } catch (error) {
      dispatch({ type: DELETE_ERROR, payload: error.response.data.message });
      dispatch({ type: DEFAULT_ERROR });
    }
  };

  const addFeed = data => {
    dispatch({ type: ADD_FEED, payload: data });
  };

  const exit = () => {
    dispatch({ type: EXIT_APP });
  };

  return (
    <FeedContext.Provider
      value={{
        feeds: state.feeds,
        page: state.page,
        loading: state.loading,
        loadingUpload: state.loadingUpload,
        error: state.error,
        message: state.message,
        getFeeds,
        getMore,
        likeAction,
        commentAction,
        followAction,
        deleteAction,
        addFeed,
        exit
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export default FeedContextProvider;
