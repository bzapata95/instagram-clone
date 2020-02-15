import React, { useState, useRef, useContext } from "react";

import { UploadContext } from "../../store/context/UploadContext";

import {
  Container,
  ImagePreview,
  MessagePreview,
  Body,
  Button
} from "./styles";

export default function Upload() {
  const inputFile = useRef(null);
  const inputBody = useRef(null);

  const { error, loading, uploadPhotoAction, resetValues } = useContext(
    UploadContext
  );

  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleUpload = e => {
    e.preventDefault();
    const dataImage = {
      file: inputFile.current.files[0],
      body
    };
    setDisabled(true);
    uploadPhotoAction(dataImage);
  };

  const hanldeInputFile = file => {
    resetValues();
    setBody("");
    if (file.target.files[0]) {
      setImage(URL.createObjectURL(file.target.files[0]));
    } else {
      setImage("");
    }
    inputBody.current.focus();
  };

  const handleBody = e => {
    setBody(e.target.value);
    body.trim().length > 0 ? setDisabled(false) : setDisabled(true);
  };

  return (
    <Container onSubmit={handleUpload} enctype="multipart/form-data">
      {image ? (
        <ImagePreview
          src={image}
          title="image preview"
          onClick={() => inputFile.current.click()}
        />
      ) : (
        <MessagePreview onClick={() => inputFile.current.click()}>
          Seleccione su fotografía
        </MessagePreview>
      )}
      <input
        ref={inputFile}
        type="file"
        onChange={hanldeInputFile}
        accept="image/*"
        style={{ display: "none" }}
      />
      <Body
        placeholder="Ponga alguna descripción"
        value={body}
        onChange={handleBody}
        ref={inputBody}
      ></Body>

      <Button type="submit" disabled={disabled} error={error}>
        {loading ? "Cargando... " : error ? "Imagen muy grande" : "Publicar"}
      </Button>
    </Container>
  );
}
