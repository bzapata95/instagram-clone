import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";

import Main from "./pages/Main";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Post from "./pages/Post";

import { isAuthenticated } from "./services/auth";
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <>
          <Header />
          <Component {...props} />
        </>
      ) : (
        <Redirect
          to={{ pathname: "/register", state: { from: props.location } }}
        />
      )
    }
  />
);

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Switch>
        <LoginRoute exact path="/login" component={Login} />
        <LoginRoute exact path="/register" component={Register} />
        <PrivateRoute exact path="/" component={Main} />
        <PrivateRoute exact path="/photo/:photo" component={Post} />
        <PrivateRoute exact path="/profile/:username" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}
