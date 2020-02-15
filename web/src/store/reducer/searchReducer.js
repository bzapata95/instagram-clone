import { SEARCH_USER, SEARCH_FINISH } from "../types/typeSearch";

export const searchReducer = (state, action) => {
  switch (action.type) {
    case SEARCH_USER:
      return {
        ...state,
        loading: true
      };
    case SEARCH_FINISH:
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    default:
      return state;
  }
};
