import React from "react";

import { ModalProvider, BaseModalBackground } from "styled-react-modal";
import styled from "styled-components";

import Routes from "./routes";

import AuthContextProvider from "./store/context/AuthContext";
import FeedContextProvider from "./store/context/FeedContext";
import FollowContextProvider from "./store/context/FollowContext";
import UploadContextProvider from "./store/context/UploadContext";
import SearchContextProvider from "./store/context/SearchContext";
import ProfileContextProvider from "./store/context/ProfileContext";
import PostContextProvider from "./store/context/PostContext";

import GlobalStyle from "./styles/GlobalStyle";
import "./App.css";

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${props => props.opacity};
  transition: opacity ease 200ms;
`;

function App() {
  return (
    <AuthContextProvider>
      <FeedContextProvider>
        <FollowContextProvider>
          <UploadContextProvider>
            <SearchContextProvider>
              <ProfileContextProvider>
                <PostContextProvider>
                  <GlobalStyle />
                  <ModalProvider backgroundComponent={FadingBackground}>
                    <Routes />
                  </ModalProvider>
                </PostContextProvider>
              </ProfileContextProvider>
            </SearchContextProvider>
          </UploadContextProvider>
        </FollowContextProvider>
      </FeedContextProvider>
    </AuthContextProvider>
  );
}

export default App;
