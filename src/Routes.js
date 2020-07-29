import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./helpers/PrivateRoute";
import IndexLogin from "./components/login/Index";
import Home from "./components/home/Home";
import MenuClientFournisseur from "./components/component-clientFournisseur/menuClientFournisseur";


export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={IndexLogin} />
          <Route path="/client-fournisseur" component={MenuClientFournisseur} />
        </Switch>
      </BrowserRouter>
    );
  }
}
