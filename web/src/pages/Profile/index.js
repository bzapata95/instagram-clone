import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import avatar from "../../assets/avatar.png";
import { ProfileContext } from "../../store/context/ProfileContext";
import { FeedContext } from "../../store/context/FeedContext";

import {
  Container,
  DescriptionContainer,
  ImageProfile,
  CountsContainer,
  Button,
  Username,
  Description,
  ButtonisFollow,
  ButtonFollow,
  ContainerPhotos,
  Photo
} from "./styles";

export default function Profile({ match }) {
  const { loading, data, getProfile, followProfile, reset } = useContext(
    ProfileContext
  );
  const { followAction } = useContext(FeedContext);

  useEffect(() => {
    const { username } = match.params;
    getProfile(username);

    return () => {
      reset();
    };

    //eslint-disable-next-line
  }, [match.params]);

  const hanldeFollowButton = async id => {
    await followProfile(id);
    await followAction(id);
  };
  if (data) {
    return (
      <Container>
        <DescriptionContainer>
          {data.user.avatar_url ? (
            <ImageProfile src={data.user.avatar_url} alt={data.user.name} />
          ) : (
            <ImageProfile src={avatar} alt={data.user.name} />
          )}

          <div>
            <Username>{data.user.username}</Username>
            {data.isProfile ? (
              <Button>Editar perfil</Button>
            ) : data.isFollow ? (
              <ButtonisFollow
                onClick={() => hanldeFollowButton(data.user.id)}
                disabled={loading ? true : false}
              >
                {loading ? "Cargando..." : "Siguiendo"}
              </ButtonisFollow>
            ) : (
              <ButtonFollow
                onClick={() => followProfile(data.user.id)}
                disabled={loading ? true : false}
              >
                {loading ? "Cargando..." : "Seguir"}
              </ButtonFollow>
            )}
            <CountsContainer>
              <span>{data.count_photos} publicaciones</span>
              <span>{data.count_followers} seguidores</span>
              <span>{data.count_follows} seguidos</span>
            </CountsContainer>
          </div>
          <Description>
            <p>{data.user.name}</p>
            <span>{data.user.bio}</span>
          </Description>
        </DescriptionContainer>
        <ContainerPhotos>
          {data.user.photoUploads.map(photo => (
            <Link key={photo.id} to={`/photo/${photo.id}`}>
              <Photo src={photo.photo_url} alt={photo.body} />
            </Link>
          ))}
        </ContainerPhotos>
      </Container>
    );
  } else {
    return (
      <Container>
        <p>Cargando...</p>
      </Container>
    );
  }
}
