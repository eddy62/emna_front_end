import React from "react";
import {Redirect, Route} from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      cookies.get("authToken") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
