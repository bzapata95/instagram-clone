import React, { useContext, useRef } from "react";
import { toast } from "react-toastify";

import CardFeed from "../../components/CardFeed";
import Profile from "../../components/Profile";

import EmptyMessage from "../../components/EmptyMessage";

import Spinner from "../../components/Spinner";

import { AuthContext } from "../../store/context/AuthContext";
import { FeedContext } from "../../store/context/FeedContext";
import { FollowContext } from "../../store/context/FollowContext";

import {
  Container,
  Aside,
  ContainerOwner,
  ContainerFollows,
  ContainerFeeds,
  ContainerFooter
} from "./styles";
import { logout } from "../../services/auth";

export default function Main({ history }) {
  const { user, error, getUser } = useContext(AuthContext);

  const {
    page,
    feeds,
    loading: feedLoading,
    message,
    error: likeError,
    getFeeds,
    getMore
  } = useContext(FeedContext);

  const { follows, loading, getFollows } = useContext(FollowContext);

  React.useEffect(() => {
    getUser();
    getFollows();
    //eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (error) {
      logout();
      toast(
        "Se ha cerrado sesión por motivos de seguridad! Ingrese nuevamente"
      );
      history.push("/login");
    }
  }, [error, history]);

  React.useEffect(() => {
    getFeeds(page);
    //eslint-disable-next-line
  }, [page]);

  const observer = useRef(
    new IntersectionObserver(
      async entries => {
        const first = entries[0];
        if (first.isIntersecting) {
          getMore();
        }
      },
      {
        threshold: 1
      }
    )
  );

  const [element, setElement] = React.useState(null);

  React.useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  return (
    <Container>
      {likeError && toast.error(message)}
      <Aside>
        <ContainerOwner>
          <Profile
            img={user && user.avatar_url}
            username={user && user.username}
            isOwner={true}
            name={user && user.name}
          />
        </ContainerOwner>
        <ContainerFollows>
          {follows &&
            follows.map(follow => (
              <Profile
                key={follow.id}
                direction="column"
                img={follow.avatar_url}
                usidebar={true}
                username={follow.username}
                name={follow.name}
              />
            ))}

          {follows.length === 0 && loading === false && (
            <EmptyMessage message="No sigues a nadie, empieza a seguir a tus amigos" />
          )}

          {loading && <Spinner />}
        </ContainerFollows>
        <ContainerFooter>
          Información - AyudaPrensa - API - Empleo - Privacidad - Condiciones -
          Directorio - Perfiles - Hashtags - Idioma
        </ContainerFooter>
      </Aside>

      <ContainerFeeds>
        {feeds &&
          feeds.map(feed => <CardFeed key={feed.photo.id} feed={feed} />)}
        {feeds.length === 0 && feedLoading === false && (
          <CardFeed feed={null} />
        )}

        {feeds.length > 0 && (
          <button
            ref={setElement}
            style={{
              position: "relative",
              width: "100%",
              height: "100px",
              marginBottom: "10px",
              display: "block",
              background: "transparent",
              border: "none"
            }}
          />
        )}

        {feedLoading && (
          <Container>
            <Spinner />
          </Container>
        )}
      </ContainerFeeds>
    </Container>
  );
}
