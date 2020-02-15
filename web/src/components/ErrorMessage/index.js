import React from "react";

import { Error } from "./styles";

export default function ErrorMessage({ error }) {
  return <Error>{error}</Error>;
}
