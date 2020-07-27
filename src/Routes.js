import React, { Component } from "react";
import App from "./App";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./helpers/PrivateRoute";
import IndexLogin from "./components/login/Index";

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={App} />
          <Route path="/login" component={IndexLogin} />
        </Switch>
      </BrowserRouter>
    );
  }
}
