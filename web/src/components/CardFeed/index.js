import React, { useState, useContext, memo, lazy, Suspense } from "react";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import { Link } from "react-router-dom";

import {
  FavoriteBorder,
  FavoriteSharp,
  ChatBubbleOutlineOutlined
} from "@material-ui/icons";

import { FeedContext } from "../../store/context/FeedContext";

import Profile from "../Profile";
import PhotoCard from "../PhotoCard";

import EmptyMessage from "../EmptyMessage";

import ModalMoreOptions from "../Modal/ModalMoreOptions";

import {
  Card,
  CardHeader,
  CardControls,
  CardDetails,
  CardFooter,
  TimeAgo as StyleTimeAgo
} from "./styles";

const formatter = buildFormatter(frenchStrings);
const CommentList = lazy(() => import("../CommentList"));

function CardFeed({ feed }) {
  const [like, setLike] = useState(() => {
    if (feed) return feed.isLiked;
  });

  const [comment, setComment] = useState("");
  const [disabled, setDisabled] = useState(true);

  const { likeAction, commentAction } = useContext(FeedContext);

  const toggleLike = id => {
    setLike(!like);
    likeAction(id);
  };

  if (feed === null)
    return (
      <Card
        style={{
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <EmptyMessage message="Preparate para seguir a todos los amigos y poder ver las fotos que comparten, que esperas empiza a seguir a tus amigos o a personas conocidas" />
      </Card>
    );

  const { isAutor, photo } = feed;

  const handleComment = e => {
    setComment(e.target.value);
    comment.trim().length > 0 ? setDisabled(false) : setDisabled(true);
  };

  const hanldeSubmit = e => {
    e.preventDefault();
    setComment("");
    setDisabled(true);
    commentAction(photo.id, comment);
  };

  return (
    <Card>
      <CardHeader>
        <Profile
          direction={"row"}
          img={photo.uploadedBy.avatar_url}
          username={photo.uploadedBy.username}
        />
        {/* Arreglar si es Autor */}

        <ModalMoreOptions isAutor={isAutor} photo={photo} />
      </CardHeader>

      <PhotoCard img={photo.photo_url} />

      <CardControls>
        {like ? (
          <FavoriteSharp
            onClick={() => toggleLike(photo.id, feed, like)}
            style={{ color: "#FC4850", marginRight: 10 }}
          />
        ) : (
          <FavoriteBorder
            onClick={() => toggleLike(photo.id, feed, like)}
            style={{ marginRight: 10 }}
          />
        )}
        <Link to={`/photo/${photo.id}`} style={{ color: "#2c2c2c" }}>
          <ChatBubbleOutlineOutlined />
        </Link>
      </CardControls>
      <CardDetails>
        <p style={{ fontWeight: "bold" }}>
          {photo.uploadedBy.username}
          <span
            style={{
              marginLeft: 5,
              fontWeight: "normal",
              marginBottom: 10,
              display: "inline-block"
            }}
          >
            {photo.body}
          </span>
        </p>

        <Suspense fallback={<p>Cargando...</p>}>
          {photo.getComments.length > 0 && (
            <CommentList comments={photo.getComments} />
          )}
        </Suspense>

        <StyleTimeAgo>
          <TimeAgo date={`${photo.createdAt}Z`} formatter={formatter} />
        </StyleTimeAgo>

        <Link
          to={`/photo/${photo.id}`}
          style={{
            fontWeight: "bold",
            textDecoration: "none",
            color: "#999999",
            marginTop: "10px",
            display: "block"
          }}
        >
          Ver más detalles
        </Link>
      </CardDetails>

      <CardFooter>
        <form onSubmit={hanldeSubmit}>
          <input
            type="text"
            value={comment}
            onChange={handleComment}
            placeholder="Añade un comentario..."
          />
          <button type="submit" value="Publicar" disabled={disabled}>
            Publicar
          </button>
        </form>
      </CardFooter>
    </Card>
  );
}

export default memo(CardFeed);
