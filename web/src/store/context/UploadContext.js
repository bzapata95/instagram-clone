import React, { useReducer, createContext } from "react";

import api from "../../services/api";

import { uploadReducer } from "../reducer/uploadReducer";

import {
  UPLOAD_PHOTO,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_ERROR,
  RESET_VALUES
} from "../types/typeUpload";

export const UploadContext = createContext();

const UploadContextProvider = ({ children }) => {
  const initialState = {
    data: null,
    loading: false,
    error: false
  };

  const [state, dispatch] = useReducer(uploadReducer, initialState);

  const uploadPhotoAction = async dataImage => {
    try {
      const fd = new FormData();
      fd.append("file", dataImage.file, dataImage.file.name);
      fd.append("body", dataImage.body);

      dispatch({ type: UPLOAD_PHOTO });
      const res = await api.post("/photos", fd);

      if (res.status === 200)
        dispatch({ type: UPLOAD_PHOTO_SUCCESS, payload: res.data });
    } catch (error) {
      if (error.response.status === 500) {
        dispatch({ type: UPLOAD_PHOTO_ERROR });
      }
    }
  };

  const resetValues = () => {
    dispatch({ type: RESET_VALUES });
  };

  return (
    <UploadContext.Provider
      value={{
        data: state.data,
        loading: state.loading,
        error: state.error,
        uploadPhotoAction,
        resetValues
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export default UploadContextProvider;
