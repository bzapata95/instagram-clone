import { GET_USER, GET_ERROR } from "../types/typesAuth";

export const authReducer = (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    case GET_ERROR:
      return {
        ...state,
        user: null,
        error: true
      };
    default:
      return state;
  }
};
