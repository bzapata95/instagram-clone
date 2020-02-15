import { GET_POST, GET_POST_SUCCESS, GET_POST_ERROR } from "../types/typePost";

export const postReducer = (state, action) => {
  switch (action.type) {
    case GET_POST:
      return { ...state, loading: true };
    case GET_POST_SUCCESS:
      return { ...state, loading: false, post: action.payload };
    case GET_POST_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
        post: ""
      };
    default:
      return state;
  }
};
