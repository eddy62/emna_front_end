import React, {Component} from "react";
import {Switch} from "react-router-dom";
import {PrivateRoute} from "../helpers/PrivateRoute";
import {Roles} from "../shared/constants/Roles";
//Gestion Social import
import SocialHome from "./social/SocialHome";
import ListEmployes from "./social/employee-management/ListEmployes";
import DetailEmploye from "./social/employee-management/DetailEmploye";
import CreateEmploye from "./social/employee-management/CreateEmploye";
import UpdateEmploye from "./social/employee-management/UpdateEmploye";
import DeleteEmploye from "./social/employee-management/DeleteEmploye";
import ArchiveEmploye from "./social/employee-management/ArchiveEmploye";
import ListeContrat from "./contrat/list-contract/ListeContrat";
import CreerAvenant from "./contrat/list-contract/detail-contract/CreerAvenant";
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
import QuoteDetails from "./quotes/quotes-details/QuotesDetails";


export default class Routes extends Component {
    render() {
        return (
            /**
             * ********************************
             * Utilisation de la PrivateRoute *
             * ********************************
             *
             * <PrivateRoute path="le chemin de la route" component={le composant}  roles={la liste des roles autoriser a consulter la route}  />
             * exemeple: autoriser que l'admin et le comptable à acceder au 'menu/comptabilite'
             *  <PrivateRoute path="/menu/comptabilite" component={ComptabiliteMenu}  roles={[Roles.Admin, Roles.ACCOUNTANT]}  />
             * */

            <Switch>
                <PrivateRoute exact path="/" component={HomeMenu}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute path="/menu/comptabilite" component={ComptabiliteMenu}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute path="/menu/juridique" component={JuridiqueMenu}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                {/* Gestion Social */}
                <PrivateRoute path="/socialHome/:id" component={SocialHome}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute path="/listEmployes/:id" component={ListEmployes}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute path="/detailEmploye/:id" component={DetailEmploye}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute path="/newEmploye/:id" component={CreateEmploye}
                              roles={[Roles.Admin,Roles.SOCIETY]}/>
                <PrivateRoute path="/updateEmploye/:id" component={UpdateEmploye}
                              roles={[Roles.Admin,Roles.SOCIETY]}/>
                <PrivateRoute path="/deleteEmploye/:id" component={DeleteEmploye}
                              roles={[Roles.Admin,Roles.SOCIETY]}/>
                <PrivateRoute path="/archiveEmploye/:id" component={ArchiveEmploye}
                              roles={[Roles.Admin,Roles.SOCIETY]}/>
                <PrivateRoute
                    path="/add-payroll-variables/:id" component={ParentAddPayrollVariables}
                    roles={[Roles.Admin,Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute
                    path="/modify-payroll-variables/:societyId/:id/:yearSelected/:monthSelected"
                    component={ParentUpdatePayrollVariables}
                    roles={[Roles.Admin,Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute path="/add-declaration-of-employment/:id" component={CreateDpae}
                              roles={[Roles.Admin,Roles.SOCIETY]}/>
                <PrivateRoute path="/consult-declaration-of-employment/:id" component={ConsultDeclarationOfEmployment}
                              roles={[Roles.Admin,Roles.SOCIETY]}/>
                <PrivateRoute path="/payslip/ParentPayslip/:id" component={ParentPayslip}
                              roles={[Roles.Admin,Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute
                    path="/validation-comptable/update-payroll-variables/ParentUpdatePayrollVariablesAccountants/:id"
                    component={ParentUpdatePayrollVariablesAccountants}
                    roles={[Roles.Admin,Roles.ACCOUNTANT]}/>
                <PrivateRoute path="/contentHtmlDpae/:id" component={ContentHtmlDpae}
                              roles={[Roles.Admin,Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                {/* Gestion Facture  Admin societe*/}
                <PrivateRoute path="/accueilfactures" component={AccueilFacture}
                              roles={[Roles.Admin,  Roles.SOCIETY]}/>
                <PrivateRoute path="/accueildepenses" component={AccueilDepense}
                              roles={[Roles.Admin,  Roles.SOCIETY]}/>
                <PrivateRoute path="/newfacture" component={CreerFacture}
                              roles={[Roles.Admin,  Roles.SOCIETY]}/>
                <PrivateRoute exact path="/depenses/create" component={CreateDepense}
                              roles={[Roles.Admin,  Roles.SOCIETY]}/>
                <PrivateRoute exact path="/depenses/update/:id" component={UpdateDepense}
                              roles={[Roles.Admin,  Roles.SOCIETY]}/>
                <PrivateRoute exact path="/depenses/details/:id" component={DetailDepense}
                              roles={[Roles.Admin,  Roles.SOCIETY]}/>

                {/* Gestion Devis Admin society*/}
                <PrivateRoute path="/devis/accueil" component={QuotesHome}
                              roles={[Roles.Admin,  Roles.SOCIETY]}/>
                <PrivateRoute path="/devis/créer" component={QuoteCreate}
                              roles={[Roles.Admin,  Roles.SOCIETY]}/>
                <PrivateRoute path="/devis/modifier/:id" component={QuoteEdit}
                              roles={[Roles.Admin,  Roles.SOCIETY]}/>
                <PrivateRoute path="/devis/details/:id" component={QuoteDetails}
                              roles={[Roles.Admin,  Roles.SOCIETY]}/>

                {/* Juridique  */}

                {/* Gestion des Contrats admin society */}
                <PrivateRoute path="/listcontrat" component={ListeContrat}
                              roles={[Roles.Admin,  Roles.SOCIETY]}/>
                <PrivateRoute exact path="/contrat" component={Contrat}
                              roles={[Roles.Admin,  Roles.SOCIETY]}/>
                <PrivateRoute path="/detailcontrat/:id" component={DetailContrat}
                              roles={[Roles.Admin,  Roles.SOCIETY]}/>
                <PrivateRoute path="/creercontrat" component={CreerContrat}
                              roles={[Roles.Admin,  Roles.SOCIETY]}/>
                <PrivateRoute path="/creeravenant/:id" component={CreerAvenant}
                              roles={[Roles.Admin, Roles.SOCIETY]}/>
                {/*<PrivateRoute path="/clauses/society/:id" component={ListOfClauses}  roles={[Roles.Admin, Roles.ACCOUNTANT,Roles.SOCIETY]}  />*/}
                <PrivateRoute exact path="/articles" component={ListArticle}
                              roles={[Roles.Admin, Roles.SOCIETY]}/>
                <PrivateRoute exact path="/articles/create" component={CreateArticle}
                              roles={[Roles.Admin, Roles.SOCIETY]}/>
                <PrivateRoute exact path="/articles/edit/:id" component={EditArticle}
                              roles={[Roles.Admin, Roles.SOCIETY]}/>
                {/*<PrivateRoute exact path="/articles/delete/:id" component={DeleteArticle} roles={[Roles.Admin, Roles.ACCOUNTANT,Roles.SOCIETY]}  />*/}
                <PrivateRoute exact path="/contrat/avenant/:id" component={AmendmentList}
                              roles={[Roles.Admin, Roles.SOCIETY]}/>
                {/* gestionUserRoutes admin */}
                {/* <PrivateRoute exact path="/users" component={Users}  roles={[Roles.Admin, Roles.ACCOUNTANT,Roles.SOCIETY]}  />
        <PrivateRoute exact path="/users/add" component={AddUser}  roles={[Roles.Admin, Roles.ACCOUNTANT,Roles.SOCIETY]}  /> */}

                <PrivateRoute exact path="/users/edit/:id" component={EditUser}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute exact path="/users/view/:id" component={ViewUser}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute exact path="/users/stvu/admins" component={ListUser}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute exact path="/users/stvu/users/add" component={AddUser}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute exact path="/users/stvu/all" component={ListAllUsers}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute exact path="/users/stvu" component={selectToViewUser}
                              roles={[Roles.Admin, Roles.SOCIETY]}/>
                {/*stvu stands for : Select to view user admin only*/}
                <PrivateRoute
                    exact
                    path="/users/stvu/comptables"
                    component={ListComptable}
                    roles={[Roles.Admin]}/>
                <PrivateRoute
                    exact
                    path="/users/stvu/societes"
                    component={ListSociete}
                    roles={[Roles.Admin]}/>
                <PrivateRoute
                    exact
                    path="/users/stvu/comptables/add"
                    component={AddComptable}
                    roles={[Roles.Admin]}/>
                <PrivateRoute
                    exact
                    path="/users/view/comptable/:id"
                    component={ViewComptable}
                    roles={[Roles.Admin]}/>
                <PrivateRoute
                    exact
                    path="/users/edit/comptable/:id"
                    component={EditComptable}
                    roles={[Roles.Admin]}/>
                <PrivateRoute
                    exact
                    path="/users/stvu/comptables/active"
                    component={ListComptableByType}
                    roles={[Roles.Admin]}/>
                <PrivateRoute
                    exact
                    path="/users/stvu/comptables/desactive"
                    component={ListComptableByType}
                    roles={[Roles.Admin]}/>
                <PrivateRoute
                    exact
                    path="/users/stvu/comptables/all"
                    component={ListComptableByType}
                    roles={[Roles.Admin]}/>
                <PrivateRoute
                    exact
                    path="/users/stvu/admins/all"
                    component={ListAdminByType}
                    roles={[Roles.Admin]}/>
                <PrivateRoute
                    exact
                    path="/users/stvu/admins/active"
                    component={ListAdminByType}
                    roles={[Roles.Admin]}/>
                <PrivateRoute
                    exact
                    path="/users/stvu/admins/desactive"
                    component={ListAdminByType}
                    roles={[Roles.Admin]}/>
                <PrivateRoute
                    exact
                    path="/users/stvu/societes/all"
                    component={ListSocieteByType}
                    roles={[Roles.Admin]}/>
                <PrivateRoute
                    exact
                    path="/users/stvu/societes/active"
                    component={ListSocieteByType}
                    roles={[Roles.Admin]}/>
                <PrivateRoute
                    exact
                    path="/users/stvu/societes/desactive"
                    component={ListSocieteByType}
                    roles={[Roles.Admin]}/>
                <PrivateRoute
                    exact
                    path="/users/stvu/societes/add"
                    component={AddSociete}
                    roles={[Roles.Admin]}/>
                <PrivateRoute
                    exact
                    path="/users/view/societe/:id"
                    component={ViewSociete}
                    roles={[Roles.Admin]}/>
                <PrivateRoute
                    exact
                    path="/users/edit/societe/:id"
                    component={EditSociete}
                    roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute exact path="/users/stau" component={SelectToAddUser}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>{" "}
                {/*stau stands for : Select to add user*/}
                {/* finGestionUserRoutes */}
                <PrivateRoute path="/bancaire" component={Bancaire}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute
                    path="/creationoperation/:id"
                    component={PageAddOperationStatement}
                    roles={[Roles.Admin, Roles.SOCIETY]}/>
                <PrivateRoute path="/menureleve" component={Releve}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute path="/historiquereleve/:id" component={ListeReleves}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute path="/detailsreleve/:id" component={DetailsReleve}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute
                    path="/detailsreleveinvalide/:id"
                    component={DetailsReleveInvalide}
                    roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>

                <PrivateRoute path="/modification/:id" component={EditStatement}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>

                <PrivateRoute
                    path="/detailsrelevenonarchive/:id"
                    component={DetailsReleveNonArchive}
                    roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute path="/creationreleve" component={CreationReleve}
                              roles={[Roles.Admin, Roles.SOCIETY]}/>
                <PrivateRoute
                    path="/detailsoperation/:id"
                    component={DetailsOperation}
                    roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>

                <PrivateRoute path="/editoperation/:id" component={EditOperation}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute path="/menurelevenon" component={MenuReleveNon}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                {/* Rapprochement bancaire */}
                <PrivateRoute path="/gestionReleves/rapprochementBancaire/:id" component={BankReconciliation}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute path="/gestionReleves/rapprochementBancaire/listeOperations" component={ListOfOperations}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute path="/gestionReleves/rapprochementBancaire/listeFactures" component={ListOfInvoices}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute path="/operationsmerger/:id" component={OperationsMerger}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>

                <PrivateRoute
                    path="/gestionReleves/rapprochementBancaire"
                    component={BankReconciliation}
                    roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute
                    path="/gestionReleves/rapprochementBancaire/listeOperations"
                    component={ListOfOperations}
                    roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute
                    path="/gestionReleves/rapprochementBancaire/listeFactures"
                    component={ListOfInvoices}
                    roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute path="/releveinvalide" component={ListeRelevesInvalide}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute
                    path="/relevevalide"
                    component={ListeRelevesValide}
                    roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                <PrivateRoute
                    path="/relevenonarchive/:id"
                    component={ListeRelevesNonArchive}
                    roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                {/* gestionClientFournisseur aDmin society */}
                <PrivateRoute
                    path="/client-fournisseur"
                    component={MenuClientFournisseur}
                    roles={[Roles.Admin, Roles.SOCIETY]}/>
                <PrivateRoute
                    path="/clientFournisseur/modifier/:id"
                    component={ModifierClient}
                    roles={[Roles.Admin, Roles.SOCIETY]}/>
                <PrivateRoute
                    path="/clientFournisseur/liste"
                    component={ListerClients}
                    roles={[Roles.Admin, Roles.SOCIETY]}/>
                <PrivateRoute path="/clientFournisseur/creer" component={AddClient}
                              roles={[Roles.Admin, Roles.SOCIETY]}/>
                <PrivateRoute
                    path="/clientFournisseur/delete/:id"
                    component={SupprimerClient}
                    roles={[Roles.Admin, Roles.SOCIETY]}/>
                <PrivateRoute
                    path="/clientFournisseur/detail/:id"
                    component={DetailsClient}
                    roles={[Roles.Admin, Roles.SOCIETY]}/>
                {/* finGestionClientFournisseur */}
                {/* GestionProduit Admin , Society */}
                <PrivateRoute exact path="/produits" component={ListeProduits}
                              roles={[Roles.Admin, Roles.SOCIETY]}/>
                <PrivateRoute exact path="/produits/detail/:id" component={DetailsProduit}
                              roles={[Roles.Admin, Roles.SOCIETY]}/>
                <PrivateRoute exact path="/produits/update/:id" component={UpdateProduit}
                              roles={[Roles.Admin, Roles.SOCIETY]}/>
                <PrivateRoute exact path="/produits/create" component={AddProduit}
                              roles={[Roles.Admin, Roles.SOCIETY]}/>
                {/* Gestion Referentiels all */}
                <PrivateRoute path="/ref" component={Referentiels}
                              roles={[Roles.Admin, Roles.ACCOUNTANT, Roles.SOCIETY]}/>
                {/* <Route component={NotFound} /> */}
                <PrivateRoute component={NotFound}/>
            </Switch>
        );
    }
}
