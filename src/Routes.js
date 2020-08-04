import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./helpers/PrivateRoute";
import IndexLogin from "./components/login/Index";

//Gestion Social import
import AccueilSocial from "./components/social/SocialHome";
import ListEmployes from "./components/social/gestion_employes/List_employes";
import DetailEmploye from "./components/social/gestion_employes/Detail_employe";
import NewEmploye from "./components/social/gestion_employes/Create_employe";
import UpdateEmploye from "./components/social/gestion_employes/Update_employe";

import ListeContrat from "./components/contrat/listeContrat/ListeContrat";
import Contrat from "./components/contrat/Contrat";
import DetailContrat from "./components/contrat/detailContrat/DetailContrat";
import CreerContrat from "./components/contrat/creerContrat/CreerContrat";
import Home from "./components/home/Home";
import MenuClientFournisseur from "./components/clientFournisseur/menuClientFournisseur";

import Bancaire from "./components/bancaire/index";
import CreationOperation from "./components/bancaire/operation/creationOperation/creationOperation";
import IndexOperation from "./components/bancaire/operation/index";
import ListeOperations from "./components/bancaire/operation/listeOperations/listeOperations";

// gestionUserRoutesImports
import Users from "./components/users/Users";
import NotFound from "./components/pages/NotFound";
import EditUser from "./components/users/EditUser";
import AddUser from "./components/users/AddUser";
import ViewUser from "./components/users/ViewUser";
import AddComptable from "./components/comptables/AddComptable";
import ViewComptable from "./components/comptables/ViewComptable";
import EditComptable from "./components/comptables/EditComptable";
import SelectToAddUser from "./components/pages/SelectToAddUser";
import AddSociete from "./components/societe/AddSociete";
import ViewSociete from "./components/societe/ViewSociete";
import EditSociete from "./components/societe/EditSociete";

// finGestionUserRoutesImports

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={IndexLogin} />

          {/* Gestion Social */}
          <Route path="/socialHome" component={AccueilSocial} />
          <Route path="/listEmployes" component={ListEmployes} />
          <Route path="/detailEmploye/:id" component={DetailEmploye} />
          <Route path="/newEmploye" component={NewEmploye} />
          <Route path="/updateEmploye/:id" component={UpdateEmploye} />

          <Route path="/listcontrat" component={ListeContrat} />
          <Route path="/contrat" component={Contrat} />
          <Route path="/detailcontrat/:id" component={DetailContrat} />
          <Route path="/creercontrat" component={CreerContrat} />

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
          <Route component={NotFound} />
          {/* finGestionUserRoutes */}

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
