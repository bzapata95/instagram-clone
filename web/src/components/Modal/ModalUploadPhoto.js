import React, { useState, useContext } from "react";
import { Publish } from "@material-ui/icons";

import Upload from "../Upload";

import { StyledModal } from "./styles";

import { UploadContext } from "../../store/context/UploadContext";
import { FeedContext } from "../../store/context/FeedContext";

export default function ModalUploadPhoto() {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const { data, resetValues } = useContext(UploadContext);
  const { addFeed } = useContext(FeedContext);

  function toggleModal(e) {
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise(resolve => {
      setOpacity(0);
      setTimeout(resolve, 200);
    });
  }

  React.useEffect(() => {
    if (data) {
      toggleModal();
      addFeed(data);
      resetValues();
    }

    //eslint-disable-next-line
  }, [data]);

  return (
    <>
      <Publish
        onClick={toggleModal}
        style={{ color: "#2c2c2c", fontSize: 30, cursor: "pointer" }}
      />
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <Upload />
      </StyledModal>
    </>
  );
}
