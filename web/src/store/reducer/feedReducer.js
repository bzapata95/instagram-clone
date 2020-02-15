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

export const feedReducer = (state, action) => {
  switch (action.type) {
    case GET_FEEDS:
      return {
        ...state,
        feeds: [...state.feeds, ...action.payload],
        loading: false
      };
    case LOADING_MORE:
      return {
        ...state,
        page: state.page + 1,
        loading: true
      };
    case DEFAULT_ERROR:
      return { ...state, error: false };

    case LIKE_ERROR:
    case COMMENT_ERROR:
    case FOLLOW_ERROR:
    case DELETE_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload
      };
    case COMMENT_POST:
      let index = state.feeds.findIndex(
        feed => feed.photo.id === action.payload.photo_id
      );

      let newArray = [...state.feeds];
      newArray[index] = {
        ...newArray[index],
        photo: {
          ...newArray[index].photo,
          getComments: [...newArray[index].photo.getComments, action.payload]
        }
      };
      return {
        ...state,
        feeds: newArray
      };
    case FOLLOW_USER:
      const newData = state.feeds.filter(
        feed => feed.photo.user_id !== action.payload
      );

      return {
        ...state,
        feeds: newData
      };

    case DELETE_POST:
      return {
        ...state,
        feeds: state.feeds.filter(feed => feed.photo.id !== action.payload)
      };

    case ADD_FEED:
      return {
        ...state,
        feeds: [action.payload, ...state.feeds]
      };

    case EXIT_APP:
      return {
        ...state,
        feeds: [],
        page: 0,
        pageSize: 12,
        loading: false,
        error: false,
        message: null
      };
    default:
      return state;
  }
};
