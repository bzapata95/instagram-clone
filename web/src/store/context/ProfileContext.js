import React, { useReducer, createContext } from "react";

import api from "../../services/api";

import { profileReducer } from "../reducer/profileReducer";
import {
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  FOLLOW,
  FOLLOW_SUCCESS,
  FOLLOW_ERROR
} from "../types/typeProfile";

export const ProfileContext = createContext();

export default function ProfileContextProvider({ children }) {
  const initialState = {
    data: "",
    loading: false,
    error: false,
    message: null
  };

  const [state, dispatch] = useReducer(profileReducer, initialState);

  const getProfile = async username => {
    try {
      dispatch({ type: GET_PROFILE });
      const res = await api.get(`/users/${username}`, {
        params: {
          page: 0,
          pageSize: 12
        }
      });

      if (res.status === 200) {
        dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data });
      }
    } catch (error) {
      dispatch({
        type: GET_PROFILE_ERROR,
        payload: error.response.data.message
      });
    }
  };

  const followProfile = async id => {
    dispatch({ type: FOLLOW });
    try {
      const res = await api.post(`/follows/${id}`);

      if (res.status === 200) {
        dispatch({ type: FOLLOW_SUCCESS });
      }
    } catch (error) {
      dispatch({ type: FOLLOW_ERROR, payload: error.response.data.message });
    }
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <ProfileContext.Provider
      value={{
        data: state.data,
        loading: state.loading,
        getProfile,
        followProfile,
        reset
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
