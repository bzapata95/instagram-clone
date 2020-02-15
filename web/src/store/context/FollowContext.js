import React, { createContext, useReducer } from "react";

import api from "../../services/api";

import { followReducer } from "../reducer/followReducer";
import {
  GET_FOLLOW,
  LOADING_FOLLOW,
  REMOVE_FOLLOW
} from "../types/typesFollow";

export const FollowContext = createContext();

const FollowContextProvider = ({ children }) => {
  const initialState = {
    follows: [],
    loading: false
  };

  const [state, dispatch] = useReducer(followReducer, initialState);

  const getFollows = async () => {
    try {
      dispatch({ type: LOADING_FOLLOW });
      const res = await api.get("/follows");

      if (res.status === 200) {
        dispatch({ type: GET_FOLLOW, payload: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFollow = async id => {
    dispatch({ type: REMOVE_FOLLOW, payload: id });
  };

  return (
    <FollowContext.Provider
      value={{
        follows: state.follows,
        loading: state.loading,
        getFollows,
        removeFollow
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};

export default FollowContextProvider;
