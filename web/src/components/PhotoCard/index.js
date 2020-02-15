import React from "react";

import { Img } from "./styles";

export default function PhotoCard({ img, toggleLike }) {
  return <Img src={img} onDoubleClick={toggleLike} />;
}
