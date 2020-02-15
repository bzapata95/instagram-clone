import React, { useEffect, useContext } from "react";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import Profile from "../../components/Profile";

import { PostContext } from "../../store/context/PostContext";
import {
  Container,
  ContainerPhoto,
  Img,
  ContainerPost,
  HeaderPost,
  ContainerComments,
  ContainerOptions,
  ContainerComment,
  TimeAgo as TimeStyle
} from "./styles";

const formatter = buildFormatter(frenchStrings);

export default function Post({ match }) {
  const { post, loading, error, message, getPost } = useContext(PostContext);

  useEffect(() => {
    const { photo } = match.params;
    getPost(photo);

    //eslint-disable-next-line
  }, [match.params]);

  if (!post) {
    return (
      <Container>
        {error && <p>{message}</p>} {loading && <p>Cargando...</p>}
      </Container>
    );
  } else {
    return (
      <Container>
        <ContainerPhoto>
          <Img src={post.photo.photo_url} alt={post.photo.body} />
        </ContainerPhoto>
        <ContainerPost>
          <HeaderPost>
            <Profile
              img={post.photo.uploadedBy.avatar_url}
              username={post.photo.uploadedBy.username}
            />
            <p>{post.photo.body}</p>
          </HeaderPost>
          <ContainerComments>
            {post.photo.getComments.length > 0 ? (
              post.photo.getComments.map(comment => (
                <div key={comment.id} style={{ marginBottom: "10px" }}>
                  <Profile
                    img={comment.postedBy.avatar_url}
                    username={comment.postedBy.username}
                  />
                  <p style={{ margin: "5px 0" }}>{comment.body}</p>
                  <TimeStyle>
                    <TimeAgo
                      date={`${comment.createdAt}Z`}
                      formatter={formatter}
                    />
                  </TimeStyle>
                </div>
              ))
            ) : (
              <p>No hay comentarios para mostrar</p>
            )}
          </ContainerComments>
          <ContainerOptions>
            <span>{post.photo.likesCount} Me gustas</span>
            <div>{/* Aquí el boton de like */}</div>
          </ContainerOptions>
          <ContainerComment>{/* La sección de comentario */}</ContainerComment>
        </ContainerPost>
      </Container>
    );
  }
}
