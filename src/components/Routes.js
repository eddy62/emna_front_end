import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "../helpers/PrivateRoute";

import AccueilSocial from "./social/SocialHome";
import ListEmployes from "./social/gestion_employes/List_employes";
import DetailEmploye from "./social/gestion_employes/Detail_employe";

import ListeContrat from "./contrat/listeContrat/ListeContrat";
import Contrat from "./contrat/Contrat";
import DetailContrat from "./contrat/detailContrat/DetailContrat";
import CreerContrat from "./contrat/creerContrat/CreerContrat";

import MenuClientFournisseur from "./clientFournisseur/menuClientFournisseur";

import Bancaire from "./bancaire";
import CreationOperation from "./bancaire/operation/creationOperation/creationOperation";
import IndexOperation from "./bancaire/operation/index";
import ListeOperations from "./bancaire/operation/listeOperations/listeOperations";
// gestionUserRoutesImports
import Users from "./users/Users";
import NotFound from "./pages/NotFound";
import EditUser from "./users/EditUser";
import AddUser from "./users/AddUser";
import ViewUser from "./users/ViewUser";
import AddComptable from "./comptables/AddComptable";
import ViewComptable from "./comptables/ViewComptable";
import EditComptable from "./comptables/EditComptable";
import SelectToAddUser from "./pages/SelectToAddUser";
import AddSociete from "./societe/AddSociete";
import ViewSociete from "./societe/ViewSociete";
import EditSociete from "./societe/EditSociete";
import HomeMenu from "./home/HomeMenu";
// finGestionUserRoutesImports

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path="/" component={HomeMenu} />
        <PrivateRoute path="/socialHome" component={AccueilSocial} />
        <PrivateRoute path="/listEmployes" component={ListEmployes} />
        <PrivateRoute path="/detailEmploye" component={DetailEmploye} />
        <PrivateRoute path="/listcontrat" component={ListeContrat} />
        <PrivateRoute path="/contrat" component={Contrat} />
        <PrivateRoute path="/detailcontrat/:id" component={DetailContrat} />
        <PrivateRoute path="/creercontrat" component={CreerContrat} />
        {/* gestionUserRoutes */}
        <PrivateRoute exact path="/users" component={Users} />
        <PrivateRoute exact path="/users/add" component={AddUser} />
        <PrivateRoute exact path="/users/edit/:id" component={EditUser} />
        <PrivateRoute exact path="/users/view/:id" component={ViewUser} />
        <PrivateRoute
          exact
          path="/users/add/comptable"
          component={AddComptable}
        />
        <PrivateRoute
          exact
          path="/users/view/comptable/:id"
          component={ViewComptable}
        />
        <PrivateRoute
          exact
          path="/users/edit/comptable/:id"
          component={EditComptable}
        />
        <PrivateRoute exact path="/users/add/societe" component={AddSociete} />
        <PrivateRoute
          exact
          path="/users/view/societe/:id"
          component={ViewSociete}
        />
        <PrivateRoute
          exact
          path="/users/edit/societe/:id"
          component={EditSociete}
        />
        <PrivateRoute exact path="/users/stau" component={SelectToAddUser} />

        {/* finGestionUserRoutes */}
        <PrivateRoute path="/bancaire" component={Bancaire} />
        <PrivateRoute path="/creationoperation" component={CreationOperation} />
        <PrivateRoute path="/indexoperation" component={IndexOperation} />
        <PrivateRoute path="/listeoperations" component={ListeOperations} />

        <PrivateRoute
          path="/client-fournisseur"
          component={MenuClientFournisseur}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}
