import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "../helpers/PrivateRoute";

//Gestion Social import
import AccueilSocial from "./components/social/SocialHome";
import ListEmployes from "./components/social/gestion_employes/List_employes";
import DetailEmploye from "./components/social/gestion_employes/Detail_employe";
import NewEmploye from "./components/social/gestion_employes/Create_employe";
import UpdateEmploye from "./components/social/gestion_employes/Update_employe";

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
// finGestionUserRoutesImports

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* Gestion Social */}
          <PrivateRoute path="/socialHome" component={AccueilSocial} />
          <PrivateRoute path="/listEmployes" component={ListEmployes} />
          <PrivateRoute path="/detailEmploye" component={DetailEmploye} />
          <PrivateRoute path="/newEmploye" component={NewEmploye} />
          <PrivateRoute path="/updateEmploye/:id" component={UpdateEmploye} />

          <PrivateRoute path="/listcontrat" component={ListeContrat} />
          <PrivateRoute path="/contrat" component={Contrat} />
          <PrivateRoute path="/detailcontrat/:id" component={DetailContrat} />
          <PrivateRoute path="/creercontrat" component={CreerContrat} />
          {/* gestionUserRoutes */}
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/add" component={AddUser} />
          <Route exact path="/users/edit/:id" component={EditUser} />
          <Route exact path="/users/view/:id" component={ViewUser} />
          <Route exact path="/users/add/comptable" component={AddComptable} />
          <Route
            exact
            path="/users/view/comptable/:id"
            component={ViewComptable}
          />
          <Route
            exact
            path="/users/edit/comptable/:id"
            component={EditComptable}
          />
          <Route exact path="/users/add/societe" component={AddSociete} />
          <Route exact path="/users/view/societe/:id" component={ViewSociete} />
          <Route exact path="/users/edit/societe/:id" component={EditSociete} />
          <Route exact path="/users/stau" component={SelectToAddUser} />

          {/* finGestionUserRoutes */}
          <PrivateRoute path="/bancaire" component={Bancaire} />
          <PrivateRoute
            path="/creationoperation"
            component={CreationOperation}
          />
          <PrivateRoute path="/indexoperation" component={IndexOperation} />
          <PrivateRoute path="/listeoperations" component={ListeOperations} />

          <Route path="/client-fournisseur" component={MenuClientFournisseur} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
