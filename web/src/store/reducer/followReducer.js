import {
  GET_FOLLOW,
  LOADING_FOLLOW,
  REMOVE_FOLLOW
} from "../types/typesFollow";

export const followReducer = (state, action) => {
  switch (action.type) {
    case LOADING_FOLLOW:
      return {
        ...state,
        loading: true
      };
    case GET_FOLLOW:
      return {
        ...state,
        follows: action.payload,
        loading: false
      };
    case REMOVE_FOLLOW:
      return {
        ...state,
        follows: state.follows.filter(follow => follow.id !== action.payload)
      };
    default:
      return state;
  }
};
