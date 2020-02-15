import {
  UPLOAD_PHOTO,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_ERROR,
  RESET_VALUES
} from "../types/typeUpload";

export const uploadReducer = (state, action) => {
  switch (action.type) {
    case UPLOAD_PHOTO:
      return { ...state, loading: true };
    case UPLOAD_PHOTO_SUCCESS:
      // Falta funcionalidad
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case UPLOAD_PHOTO_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case RESET_VALUES:
      return {
        ...state,
        data: null,
        error: false
      };
    default:
      return state;
  }
};
