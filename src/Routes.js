import React, { Component } from "react";
import App from "./App";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./helpers/PrivateRoute";
import IndexLogin from "./components/login/Index";
import ListeContrat from "./components/contrat/listeContrat/ListeContrat"
import Contrat from "./components/contrat/Contrat"
import DetailContrat from "./components/contrat/detailContrat/DetailContrat"
import CreerContrat from "./components/contrat/creerContrat/CreerContrat"

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={App} />
          <Route path="/login" component={IndexLogin} />
          <Route path="/listcontrat" component={ListeContrat} />
          <Route path="/contrat" component={Contrat} />
          <Route path="/detailcontrat/:id" component={DetailContrat} />
          <Route path="/creercontrat" component={CreerContrat} />
        </Switch>
      </BrowserRouter>
    );
  }
}
