import React, { createContext, useReducer } from "react";

import api from "../../services/api";

import { authReducer } from "../reducer/authReducer";

import { GET_USER, GET_ERROR } from "../types/typesAuth";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const initialState = {
    user: null,
    error: false
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const getUser = async () => {
    try {
      const { data } = await api.get("/auth");

      dispatch({ type: GET_USER, payload: data });
    } catch (err) {
      dispatch({ type: GET_ERROR });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, error: state.error, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
