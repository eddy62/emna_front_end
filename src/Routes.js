import React, { Component } from "react";
import App from "./App";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./helpers/PrivateRoute";
import IndexLogin from "./components/login/Index";

import AccueilSocial from "./components/social/SocialHome";
import ListEmployes from "./components/social/gestion_employes/List_employes";
import DetailEmploye from "./components/social/gestion_employes/Detail_employe";

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={App} />
          <Route path="/login" component={IndexLogin} />
          <Route path="/socialHome" component={AccueilSocial} />
          <Route path="/listEmployes" component={ListEmployes} />
          <Route path="/detailEmploye" component={DetailEmploye} />
        </Switch>
      </BrowserRouter>
    );
  }
}
