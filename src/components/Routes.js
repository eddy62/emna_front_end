import React, { Component } from "react";
import { Switch } from "react-router-dom";
import { PrivateRoute } from "../helpers/PrivateRoute";

//Gestion Social import
import AccueilSocial from "./social/SocialHome";
import ListEmployes from "./social/gestion_employes/List_employes";
import DetailEmploye from "./social/gestion_employes/Detail_employe";
import NewEmploye from "./social/gestion_employes/Create_employe";
import UpdateEmploye from "./social/gestion_employes/Update_employe";
import SupprimerEmploye from "./social/gestion_employes/Supprimer_employe";
import ArchiverEmploye from "./social/gestion_employes/Archive_employe";

import ListeContrat from "./contrat/listeContrat/ListeContrat";
import Contrat from "./contrat/Contrat";
import DetailContrat from "./contrat/detailContrat/DetailContrat";
import CreerContrat from "./contrat/creerContrat/CreerContrat";

//gestion ClientFournisseur imports
import MenuClientFournisseur from "./clientFournisseur/menuClientFournisseur";
import ListerClients from "./clientFournisseur/listerClientFournisseur/listerClients";
import AddClient from "./clientFournisseur/addClientFournisseur/addClient";
import ModifierClient from "./clientFournisseur/modifierCLientFournisseur/modifierClient";
import SupprimerClient from "./clientFournisseur/supprimerClientFounisseur/supprimerClient";
import DetailsClient from "./clientFournisseur/detailsClientFounisseur/detailsClient";

//gestionBancaire
import Bancaire from "./bancaire/index";
import Releve from "./bancaire/releve/releve";
import ListeReleves from "./bancaire/releve/historique_releves/liste_releves_archive";
import DetailsReleve from "./bancaire/releve/details_releve/details_releve";
import DetailsReleveInvalide from "./bancaire/releve/details_releve/details_releve_invalide";
import DetailsReleveNonArchive from "./bancaire/releve/details_releve/details_releve_non_archive";
import CreationReleve from "./bancaire/releve/creation_releve/creation_releve";
import DetailsOperation from "./bancaire/releve/details_releve/operation/details_operation/details_operation";
import MenuReleveNon from "./bancaire/releve/historique_releves/menu_releve_non";
import ListeRelevesInvalide from "./bancaire/releve/historique_releves/liste_releves_invalide";
import ListeRelevesValide from "./bancaire/releve/historique_releves/liste_releves_valide";
import ListeRelevesNonArchive from "./bancaire/releve/historique_releves/liste_releves_non_archive";
import PageAddOperationStatement from "./bancaire/releve/details_releve/operation/creation_operation/pageAddOperationStatement";
import BankReconciliation from "./bancaire/releve/gestion_releves/rapprochement_bancaire/BankReconciliation";
import ListOfOperations from "./bancaire/releve/gestion_releves/rapprochement_bancaire/ListOfOperations";
import ListOfInvoices from "./bancaire/releve/gestion_releves/rapprochement_bancaire/ListOfInvoices";


// gestionUserRoutesImports
import Users from "./users/Users";
import NotFound from "./pages/NotFound";
import EditUser from "./users/EditUser";
import AddUser from "./users/AddUser";
import ViewUser from "./users/ViewUser";
import ListUser from "./users/ListUser";
import ListAdminByType from "./users/ListAdminByType";
import ListAllUsers from "./users/allUsers/ListAllUsers";
import AddComptable from "./comptables/AddComptable";
import ViewComptable from "./comptables/ViewComptable";
import EditComptable from "./comptables/EditComptable";
import ListComptable from "./comptables/ListComptable";
import ListComptableByType from "./comptables/ListComptableByType";
import SelectToAddUser from "./pages/SelectToAddUser";
import selectToViewUser from "./pages/SelectToViewUser";
import AddSociete from "./societe/AddSociete";
import ViewSociete from "./societe/ViewSociete";
import ListSocieteByType from "./societe/ListSocieteByType";
import EditSociete from "./societe/EditSociete";
import ListSociete from "./societe/ListSociete";
import HomeMenu from "./navigation/HomeMenu";
import ComptabiliteMenu from "./navigation/ComptabiliteMenu";
import JuridiqueMenu from "./navigation/JuridiqueMenu";
// finGestionUserRoutesImports

//GestionProduits
import ListeProduits from "./produits/listeProduits/listeProduits";
import DetailsProduit from "./produits/detailsProduits/detailsProduit";
import AddProduit from "./produits/addProduits/addProduit";
import UpdateProduit from "./produits/updateProduit/updateProduit";
//finGestionProduits

//GestionReferentiels
import Referentiels from "./referentiels/Referentiels";

//GestionFactures
import AccueilFacture from "./gestion_factures/accueilFactures";
import CreerFacture from "./gestion_factures/creerFacture";
import CreerDepense from "./gestion_factures/creerDepense";
import DetailFacture from "./gestion_factures/detailFacture";

//gestion Variables de paie

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path="/" component={HomeMenu} />
        <PrivateRoute path="/menu/comptabilite" component={ComptabiliteMenu} />
        <PrivateRoute path="/menu/juridique" component={JuridiqueMenu} />
        {/* Gestion Social */}
        <PrivateRoute path="/socialHome/:id" component={AccueilSocial} />
        <PrivateRoute path="/listEmployes/:id" component={ListEmployes} />
        <PrivateRoute path="/detailEmploye/:id" component={DetailEmploye} />
        <PrivateRoute path="/newEmploye/:id" component={NewEmploye} />
        <PrivateRoute path="/updateEmploye/:id" component={UpdateEmploye} />
        <PrivateRoute path="/deleteEmploye/:id" component={SupprimerEmploye} />
        <PrivateRoute path="/archiveEmploye/:id" component={ArchiverEmploye} />
        {/* Gestion Facture */}
        <PrivateRoute path="/accueilfactures" component={AccueilFacture} />
        <PrivateRoute path="/newfacture" component={CreerFacture} />
        <PrivateRoute path="/detailfacture" component={DetailFacture} />
        <PrivateRoute path="/newfacture" component={CreerFacture} />
        <PrivateRoute path="/newdepense" component={CreerDepense} />
        {/* Gestion des Contrats*/}
        <PrivateRoute path="/listcontrat" component={ListeContrat} />
        <PrivateRoute path="/contrat" component={Contrat} />
        <PrivateRoute path="/detailcontrat/:id" component={DetailContrat} />
        <PrivateRoute path="/creercontrat" component={CreerContrat} />
        {/* gestionUserRoutes */}
        <PrivateRoute exact path="/users" component={Users} />
        <PrivateRoute exact path="/users/add" component={AddUser} />
        <PrivateRoute exact path="/users/edit/:id" component={EditUser} />
        <PrivateRoute exact path="/users/view/:id" component={ViewUser} />
        <PrivateRoute exact path="/users/stvu/admins" component={ListUser} />
        <PrivateRoute exact path="/users/stvu/users/add" component={AddUser} />
        <PrivateRoute exact path="/users/stvu/all" component={ListAllUsers} />
        <PrivateRoute exact path="/users/stvu" component={selectToViewUser} />
        {/*stvu stands for : Select to view user*/}
        <PrivateRoute
          exact
          path="/users/stvu/comptables"
          component={ListComptable}
        />
        <PrivateRoute
          exact
          path="/users/stvu/societes"
          component={ListSociete}
        />
        <PrivateRoute
          exact
          path="/users/stvu/comptables/add"
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
        <PrivateRoute
          exact
          path="/users/stvu/comptables/active"
          component={ListComptableByType}
        />
        <PrivateRoute
          exact
          path="/users/stvu/comptables/desactive"
          component={ListComptableByType}
        />
        <PrivateRoute
          exact
          path="/users/stvu/comptables/all"
          component={ListComptableByType}
        />
        <PrivateRoute
          exact
          path="/users/stvu/admins/all"
          component={ListAdminByType}
        />
        <PrivateRoute
          exact
          path="/users/stvu/admins/active"
          component={ListAdminByType}
        />
        <PrivateRoute
          exact
          path="/users/stvu/admins/desactive"
          component={ListAdminByType}
        />
        <PrivateRoute
          exact
          path="/users/stvu/societes/all"
          component={ListSocieteByType}
        />
        <PrivateRoute
          exact
          path="/users/stvu/societes/active"
          component={ListSocieteByType}
        />
        <PrivateRoute
          exact
          path="/users/stvu/societes/desactive"
          component={ListSocieteByType}
        />
        <PrivateRoute
          exact
          path="/users/stvu/societes/add"
          component={AddSociete}
        />
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
        <PrivateRoute exact path="/users/stau" component={SelectToAddUser} />{" "}
        {/*stau stands for : Select to add user*/}
        {/* finGestionUserRoutes */}
        <PrivateRoute path="/bancaire" component={Bancaire} />
        <PrivateRoute path="/creationoperation/:id" component={PageAddOperationStatement} />
        <PrivateRoute path="/menureleve" component={Releve} />
        <PrivateRoute path="/historiquereleve/:id" component={ListeReleves} />
        <PrivateRoute path="/detailsreleve/:id" component={DetailsReleve} />
        <PrivateRoute
          path="/detailsreleveinvalide/:id"
          component={DetailsReleveInvalide}
        />
        <PrivateRoute
          path="/detailsrelevenonarchive/:id"
          component={DetailsReleveNonArchive}
        />
        <PrivateRoute path="/creationreleve" component={CreationReleve} />
        <PrivateRoute
          path="/detailsoperation/:id"
          component={DetailsOperation}
        />
        <PrivateRoute path="/menurelevenon" component={MenuReleveNon} />

        {/* Rapprochement bancaire */}
        <PrivateRoute path="/gestionReleves/rapprochementBancaire" component={BankReconciliation} />
        <PrivateRoute path="/gestionReleves/rapprochementBancaire/listeOperations" component={ListOfOperations} />
        <PrivateRoute path="/gestionReleves/rapprochementBancaire/listeFactures" component={ListOfInvoices} />


        <PrivateRoute
          path="/releveinvalide"
          component={ListeRelevesInvalide}
        />
        <PrivateRoute
            path="/relevevalide"
            component={ListeRelevesValide}
        />
        <PrivateRoute
          path="/relevenonarchive/:id"
          component={ListeRelevesNonArchive}
        />
        {/* gestionClientFournisseur */}
        <PrivateRoute
          path="/client-fournisseur"
          component={MenuClientFournisseur}
        />
        <PrivateRoute
          path="/clientFournisseur/modifier/:id"
          component={ModifierClient}
        />
        <PrivateRoute
          path="/clientFournisseur/liste"
          component={ListerClients}
        />
        <PrivateRoute path="/clientFournisseur/creer" component={AddClient} />
        <PrivateRoute
          path="/clientFournisseur/delete/:id"
          component={SupprimerClient}
        />
        <PrivateRoute
          path="/clientFournisseur/detail/:id"
          component={DetailsClient}
        />
        {/* finGestionClientFournisseur */}
        {/* GestionProduit */}
        <PrivateRoute path="/produits" component={ListeProduits} />
        <PrivateRoute path="/produit/detail/:id" component={DetailsProduit} />
        <PrivateRoute path="/produit/creer" component={AddProduit} />
        <PrivateRoute path="/produit/update/:id" component={UpdateProduit} />
        {/* Gestion Referentiels */}
        <PrivateRoute path="/ref" component={Referentiels} />
        {/* <Route component={NotFound} /> */}
        <PrivateRoute component={NotFound} />
      </Switch>
    );
  }
}
