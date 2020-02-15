import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import avatar from "../../assets/avatar.png";

import { Container, Img, Username, Name } from "./styles";

export default function Profile({
  direction = "row",
  img,
  username,
  usidebar = false,
  name,
  isOwner = false
}) {
  const urlUser = useMemo(() => {
    return `/profile/${username}`;
  }, [username]);
  return (
    <Container direction={direction} usidebar={usidebar}>
      <Link className="image" to={urlUser}>
        {img ? (
          <Img src={img} alt="avatar" usidebar={usidebar} isOwner={isOwner} />
        ) : (
          <Img src={avatar} alt="avatar" usidebar={usidebar} />
        )}
      </Link>
      <div>
        <Link to={urlUser}>
          {username && <Username usidebar={usidebar}>{username}</Username>}
        </Link>
        {name && <Name>{name}</Name>}
      </div>
    </Container>
  );
}
