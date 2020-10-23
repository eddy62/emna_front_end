import React, {Component} from "react";
import {Switch} from "react-router-dom";
import {PrivateRoute} from "../helpers/PrivateRoute";
//Gestion Social import
import SocialHome from "./social/SocialHome";
import ListEmployes from "./social/employee-management/ListEmployes";
import DetailEmploye from "./social/employee-management/DetailEmploye";
import CreateEmploye from "./social/employee-management/CreateEmploye";
import UpdateEmploye from "./social/employee-management/UpdateEmploye";
import DeleteEmploye from "./social/employee-management/DeleteEmploye";
import ArchiveEmploye from "./social/employee-management/ArchiveEmploye";

import ListeContrat from "./contrat/list-contract/ListeContrat";
import Contrat from "./contrat/Contrat";
import DetailContrat from "./contrat/list-contract/detail-contract/DetailContrat";
import CreerContrat from "./contrat/create-contract/CreerContrat";

import CreateDpae from "./social/dpae/add-dpae/CreateDpae";
//gestion ClientFournisseur imports
import MenuClientFournisseur from "./client-fournisseur/MenuClientFournisseur";
import ListerClients from "./client-fournisseur/list-client-fournisseur/ListClients";
import AddClient from "./client-fournisseur/add-client-fournisseur/AddClient";
import ModifierClient from "./client-fournisseur/update-cLient-fournisseur/UpdateClient";
import SupprimerClient from "./client-fournisseur/delete-client-founisseur/DeleteClient";
import DetailsClient from "./client-fournisseur/detail-client-founisseur/DetailClient";
//gestionBancaire
import Bancaire from "./bancaire/index";
import OperationsMerger from "./bancaire/releve/gestion_releves/rapprochement_bancaire/OperationsMerger";
import Releve from "./bancaire/releve/releve";
import ListeReleves from "./bancaire/releve/historique_releves/liste_releves_archive";
import DetailsReleve from "./bancaire/releve/details_releve/details_releve";
import DetailsReleveInvalide from "./bancaire/releve/details_releve/details_releve_invalide";
import DetailsReleveNonArchive from "./bancaire/releve/details_releve/details_releve_non_archive";
import CreationReleve from "./bancaire/releve/creation_releve/creation_releve";
import DetailsOperation from "./bancaire/releve/details_releve/operation/details_operation/details_operation";
import EditOperation from "./bancaire/releve/details_releve/operation/edit_operation/pageEditOperationStatement";
import MenuReleveNon from "./bancaire/releve/historique_releves/menu_releve_non";
import ListeRelevesInvalide from "./bancaire/releve/historique_releves/liste_releves_invalide";
import ListeRelevesValide from "./bancaire/releve/historique_releves/liste_releves_valide";
import ListeRelevesNonArchive from "./bancaire/releve/historique_releves/liste_releves_non_archive";
import PageAddOperationStatement
    from "./bancaire/releve/details_releve/operation/creation_operation/pageAddOperationStatement";
import BankReconciliation from "./bancaire/releve/gestion_releves/rapprochement_bancaire/BankReconciliation";
import ListOfOperations from "./bancaire/releve/gestion_releves/rapprochement_bancaire/ListOfOperations";
import ListOfInvoices from "./bancaire/releve/gestion_releves/rapprochement_bancaire/ListOfInvoices";
import EditStatement from "./bancaire/releve/details_releve/edit-statement/EditStatement";
import QuotesHome from "./quotes/quotes-home/QuotesHome";
import QuoteCreate from "./quotes/quotes-form/quote-create/QuoteCreate";
import QuoteEdit from "./quotes/quotes-form/quote-edit/QuoteEdit";
// gestionUserRoutesImports
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
import ContentHtmlDpae from "./social/declaration-of-employment/detail-declaration-of-employment/ContentHtmlDpae";
// finGestionUserRoutesImports
//GestionProduits
import ListeProduits from "./produits/list-produits/ListProduits";
import DetailsProduit from "./produits/detail-produit/DetailsProduit";
import AddProduit from "./produits/add-produit/AddProduit";
import UpdateProduit from "./produits/update-produit/UpdateProduit";
//finGestionProduits
//GestionReferentiels
import Referentiels from "./contrat/referencial/Referentiels";
//GestionFactures
import AccueilFacture from "./gestion_factures/factures/accueilFactures";
import CreerFacture from "./gestion_factures/factures/creerFacture";
import CreateDepense from "./gestion_factures/depenses/create-depense/CreateDepense";
import AccueilDepense from './gestion_factures/depenses/AccueilDepenses';
import CreateArticle from "./contrat/referencial/article/create-article/CreateArticle";
import EditArticle from "./contrat/referencial/article/edit-article/EditArticle";
import DetailDepense from "./gestion_factures/depenses/detail-depense/DetailDepense";
//Juridique
//import ListOfClauses from "./contrat/referencial/clauses/list-of-clauses/ListOfClauses";
import ListArticle from "./contrat/referencial/article/list-article/ListArticle";
//gestion Variables de paie
import ParentAddPayrollVariables from "./social/payroll-variables/add-payroll-variables/ParentAddPayrollVariables";
import ParentUpdatePayrollVariables
    from "./social/payroll-variables/update-payroll-variables/ParentUpdatePayrollVariables";

import ParentUpdatePayrollVariablesAccountants
    from "./social/validation-comptable/update-payroll-variables/ParentUpdatePayrollVariablesAccountants";

import ParentPayslip from "./social/payslip/ParentPayslip";
import UpdateDepense from "./gestion_factures/depenses/update-depense/UpdateDepense";
import ConsultDeclarationOfEmployment
    from "./social/declaration-of-employment/consult-declaration-of-employment/ConsultDeclarationOfEmployment";
import AmendmentList from "./amendment/amendment-list/AmendmentList";


export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path="/" component={HomeMenu} />
        <PrivateRoute path="/menu/comptabilite" component={ComptabiliteMenu} />
        <PrivateRoute path="/menu/juridique" component={JuridiqueMenu} />
        {/* Gestion Social */}
        <PrivateRoute path="/socialHome/:id" component={SocialHome} />
        <PrivateRoute path="/listEmployes/:id" component={ListEmployes} />
        <PrivateRoute path="/detailEmploye/:id" component={DetailEmploye} />
        <PrivateRoute path="/newEmploye/:id" component={CreateEmploye} />
        <PrivateRoute path="/updateEmploye/:id" component={UpdateEmploye} />
        <PrivateRoute path="/deleteEmploye/:id" component={DeleteEmploye} />
        <PrivateRoute path="/archiveEmploye/:id" component={ArchiveEmploye} />
        <PrivateRoute
          path="/add-payroll-variables/:id" component={ParentAddPayrollVariables} />
        <PrivateRoute
          path="/modify-payroll-variables/:societyId/:id/:yearSelected/:monthSelected"
          component={ParentUpdatePayrollVariables}
        />
        <PrivateRoute path="/add-declaration-of-employment/:id" component={CreateDpae} />
        <PrivateRoute path="/consult-declaration-of-employment/:id" component={ConsultDeclarationOfEmployment} />
        <PrivateRoute path="/payslip/ParentPayslip/:id" component={ParentPayslip} />
        <PrivateRoute path="/validation-comptable/update-payroll-variables/ParentUpdatePayrollVariablesAccountants/:id" component={ParentUpdatePayrollVariablesAccountants} />
        <PrivateRoute path="/contentHtmlDpae/:id" component={ContentHtmlDpae} />
          {/* Gestion Facture */}
        <PrivateRoute path="/accueilfactures" component={AccueilFacture} />
        <PrivateRoute path="/accueildepenses" component={AccueilDepense} />
        <PrivateRoute path="/newfacture" component={CreerFacture} />
        <PrivateRoute exact path="/depenses/create" component={CreateDepense} />
        <PrivateRoute exact path="/depenses/update/:id" component={UpdateDepense} />
        <PrivateRoute exact path="/depenses/details/:id" component={DetailDepense} />

        {/* Gestion Devis */}
        <PrivateRoute path="/devis/accueil" component={QuotesHome} />
        <PrivateRoute path="/devis/créer" component={QuoteCreate} />
        <PrivateRoute path="/devis/modifier/:id" component={QuoteEdit} />


        {/* Juridique  */}

        {/* Gestion des Contrats*/}
        <PrivateRoute path="/listcontrat" component={ListeContrat} />
        <PrivateRoute exact path="/contrat" component={Contrat} />
        <PrivateRoute path="/detailcontrat/:id" component={DetailContrat} />
        <PrivateRoute path="/creercontrat" component={CreerContrat} />
        {/*<PrivateRoute path="/clauses/society/:id" component={ListOfClauses} />*/}
        <PrivateRoute exact path="/articles" component={ListArticle} />
        <PrivateRoute exact path="/articles/create" component={CreateArticle} />
        <PrivateRoute exact path="/articles/edit/:id" component={EditArticle} />
        {/*<PrivateRoute exact path="/articles/delete/:id" component={DeleteArticle}/>*/}
        <PrivateRoute exact path="/contrat/avenant/:id" component={AmendmentList} />
        {/* gestionUserRoutes */}
        {/* <PrivateRoute exact path="/users" component={Users} />
        <PrivateRoute exact path="/users/add" component={AddUser} /> */}

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
        <PrivateRoute
          path="/creationoperation/:id"
          component={PageAddOperationStatement}
        />
        <PrivateRoute path="/menureleve" component={Releve} />
        <PrivateRoute path="/historiquereleve/:id" component={ListeReleves} />
        <PrivateRoute path="/detailsreleve/:id" component={DetailsReleve} />
        <PrivateRoute
          path="/detailsreleveinvalide/:id"
          component={DetailsReleveInvalide}
        />
        
        <PrivateRoute path="/modification/:id" component={EditStatement} />

        <PrivateRoute
          path="/detailsrelevenonarchive/:id"
          component={DetailsReleveNonArchive}
        />
        <PrivateRoute path="/creationreleve" component={CreationReleve} />
        <PrivateRoute
          path="/detailsoperation/:id"
          component={DetailsOperation}
        />

        <PrivateRoute path="/editoperation/:id" component={EditOperation} />
        <PrivateRoute path="/menurelevenon" component={MenuReleveNon} />
        {/* Rapprochement bancaire */}
        <PrivateRoute path="/gestionReleves/rapprochementBancaire/:id" component={BankReconciliation} />
        <PrivateRoute path="/gestionReleves/rapprochementBancaire/listeOperations" component={ListOfOperations} />
        <PrivateRoute path="/gestionReleves/rapprochementBancaire/listeFactures" component={ListOfInvoices} />
        <PrivateRoute path="/operationsmerger/:id" component={OperationsMerger} />

        <PrivateRoute
          path="/gestionReleves/rapprochementBancaire"
          component={BankReconciliation}
        />
        <PrivateRoute
          path="/gestionReleves/rapprochementBancaire/listeOperations"
          component={ListOfOperations}
        />
        <PrivateRoute
          path="/gestionReleves/rapprochementBancaire/listeFactures"
          component={ListOfInvoices}
        />
        <PrivateRoute path="/releveinvalide" component={ListeRelevesInvalide} />
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
        <PrivateRoute exact path="/produits"            component={ListeProduits} />
        <PrivateRoute exact path="/produits/detail/:id" component={DetailsProduit} />
        <PrivateRoute exact path="/produits/update/:id" component={UpdateProduit} />
        <PrivateRoute exact path="/produits/create"     component={AddProduit} />
        {/* Gestion Referentiels */}
        <PrivateRoute path="/ref" component={Referentiels} />
        {/* <Route component={NotFound} /> */}
        <PrivateRoute component={NotFound} />
      </Switch>
    );
  }
}
