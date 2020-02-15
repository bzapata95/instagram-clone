import {
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  FOLLOW,
  FOLLOW_SUCCESS,
  FOLLOW_ERROR
} from "../types/typeProfile";

export const profileReducer = (state, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false,
        message: null
      };
    case GET_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
        data: null
      };
    case FOLLOW:
      return {
        ...state,
        loading: true
      };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        data: { ...state.data, isFollow: !state.data.isFollow },
        loading: false
      };
    case FOLLOW_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload
      };
    case "RESET":
      return { data: "", loading: false, error: false, message: null };
    default:
      return state;
  }
};
