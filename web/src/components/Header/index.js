import React, { useContext, memo } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { Search, Person, ExitToApp } from "@material-ui/icons";
import logo from "../../assets/logo.svg";

import ModalUploadPhoto from "../Modal/ModalUploadPhoto";
import SearchContainer from "../Search";

import { SearchContext } from "../../store/context/SearchContext";
import { AuthContext } from "../../store/context/AuthContext";
import { FeedContext } from "../../store/context/FeedContext";

import { logout } from "../../services/auth";

import {
  Nav,
  Container,
  Img,
  ContainerSearch,
  Input,
  ContainerOpcitions
} from "./styles";

function Header({ history }) {
  const [term, setTerm] = React.useState("");

  const { searchAction } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const { exit } = useContext(FeedContext);

  const handleExit = () => {
    logout();
    exit();
    history.push("/login");
  };

  const handleSearch = e => {
    setTerm(e.target.value);
  };

  React.useEffect(() => {
    searchAction(term);

    //eslint-disable-next-line
  }, [term]);

  const toggleClose = () => {
    setTerm("");
  };
  return (
    <Nav>
      <Container>
        <Link to="/">
          <Img src={logo} alt="logo" />
        </Link>
        <ContainerSearch>
          <Search
            style={{
              fontSize: 33,
              color: "#999",
              background: "#FAFAFA",
              border: "1px solid #e6e6e6",
              borderRight: "0px",
              borderRadius: "4px 0px 0px 4px",
              padding: "7px 5px"
            }}
          />
          <Input placeholder="Buscar" value={term} onChange={handleSearch} />

          {term.length > 0 && <SearchContainer toggleClose={toggleClose} />}
        </ContainerSearch>
        <ContainerOpcitions>
          <ModalUploadPhoto />

          <Link to={`/profile/${user && user.username}`}>
            <Person
              style={{ color: "#2c2c2c", fontSize: 30, marginLeft: 15 }}
            />
          </Link>
          <ExitToApp
            onClick={handleExit}
            style={{
              color: "#2c2c2c",
              fontSize: 30,
              marginLeft: 15,
              cursor: "pointer"
            }}
          />
        </ContainerOpcitions>
      </Container>
    </Nav>
  );
}

export default memo(withRouter(Header));
