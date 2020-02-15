import React, { useContext } from "react";

import Spinner from "../Spinner";
import Profile from "../Profile";
import { SearchContext } from "../../store/context/SearchContext";

import {
  Container,
  ContainerResult,
  ContainerProfile,
  ContainerEmpty
} from "./styles";

export default function SearchContainer({ toggleClose }) {
  const { loading, users } = useContext(SearchContext);
  return (
    <Container>
      {loading ? (
        <Spinner style={{ marginTop: "10px" }} />
      ) : (
        <ContainerResult>
          {users.length > 0 ? (
            users.map(user => (
              <ContainerProfile key={user.id} onClick={toggleClose}>
                <Profile
                  direction="row"
                  img={user.avatar_url}
                  username={user.username}
                  name={user.name}
                />
              </ContainerProfile>
            ))
          ) : (
            <ContainerEmpty>
              <p>No hay resultados</p>
            </ContainerEmpty>
          )}
        </ContainerResult>
      )}
    </Container>
  );
}
