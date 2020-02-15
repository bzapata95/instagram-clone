import React, { createContext, useReducer } from "react";

import api from "../../services/api";

import { SEARCH_USER, SEARCH_FINISH } from "../types/typeSearch";
import { searchReducer } from "../reducer/searchReducer";

export const SearchContext = createContext();

export default function SearchContextProvider({ children }) {
  const initialState = {
    users: [],
    loading: false
  };

  const [state, dispatch] = useReducer(searchReducer, initialState);

  const searchAction = async term => {
    dispatch({ type: SEARCH_USER });
    try {
      if (term) {
        const res = await api.get(`/search/${term}`);
        if (res.status === 200) {
          dispatch({ type: SEARCH_FINISH, payload: res.data });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SearchContext.Provider
      value={{ users: state.users, loading: state.loading, searchAction }}
    >
      {children}
    </SearchContext.Provider>
  );
}
