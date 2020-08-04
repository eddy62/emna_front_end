import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "../helpers/PrivateRoute";
import Login from "./login/Login";

import AccueilSocial from "./social/SocialHome";
import ListEmployes from "./social/gestion_employes/List_employes";
import DetailEmploye from "./social/gestion_employes/Detail_employe";

import ListeContrat from "./contrat/listeContrat/ListeContrat";
import Contrat from "./contrat/Contrat";
import DetailContrat from "./contrat/detailContrat/DetailContrat";
import CreerContrat from "./contrat/creerContrat/CreerContrat";

import MenuClientFournisseur from "./component-clientFournisseur/menuClientFournisseur";

import Bancaire from "./bancaire";
import CreationOperation from "./bancaire/operation/creationOperation/creationOperation";
import IndexOperation from "./bancaire/operation/index";
import ListeOperations from "./bancaire/operation/listeOperations/listeOperations";
import RoutesWithNavigation from "./RoutesWithNavigation";

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/socialHome" component={AccueilSocial} />
          <PrivateRoute path="/listEmployes" component={ListEmployes} />
          <PrivateRoute path="/detailEmploye" component={DetailEmploye} />
          <PrivateRoute path="/listcontrat" component={ListeContrat} />
          <PrivateRoute path="/contrat" component={Contrat} />
          <PrivateRoute path="/detailcontrat/:id" component={DetailContrat} />
          <PrivateRoute path="/creercontrat" component={CreerContrat} />

          <PrivateRoute path="/bancaire" component={Bancaire} />
          <PrivateRoute
            path="/creationoperation"
            component={CreationOperation}
          />
          <PrivateRoute path="/indexoperation" component={IndexOperation} />
          <PrivateRoute path="/listeoperations" component={ListeOperations} />

          <Route path="/client-fournisseur" component={MenuClientFournisseur} />
        </Switch>
      </BrowserRouter>
    );
  }
}
