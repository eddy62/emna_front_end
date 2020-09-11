import ApiBackEnd from "./../config/ApiBackEnd";
import UserService from "./UserService";
import Axios from "axios";

const AxiosCenter = {
  authenticate(values) {
    return ApiBackEnd({
      method: "post",
      url: "/authenticate",
      data: values,
    });
  },

  getCurrentUser() {
    return ApiBackEnd({
      method: "get",
      url: "/account",
    });
  },


  finishPasswordReset(values) {
    return ApiBackEnd({
      method: "post",
      url: `/account/reset-password/finish`,
      data: values,
    });
  },


  //gestion clientFournisseur
  getAllClientFournisseurBySociete(id) {
    return ApiBackEnd({
      method: "get",
      url: `/client-fournisseurs/societe/${id}`,
    });
  },

  getAllSocietesByComptable(id) {
    return ApiBackEnd({
      method: "get",
      url: `/societes/comptable/${id}`,
    });
  },

  getAllSocietes() {
    return ApiBackEnd({
      method: "get",
      url: `/societes`,
    });
  },
  getSocieteByUser(id) {
    return ApiBackEnd({
      method: "get",
      url: `/societes/user/${id}`,
    });
  },

  getComptableByUser(id) {
    return ApiBackEnd({
      method: "get",
      url: `/comptables/user/${id}`,
    });
  },

  getClientFournisseur(id) {
    return ApiBackEnd({
      method: "get",
      url: `/client-fournisseurs/wrapper/${id}`,
    });
  },
  createClientFournisseur(values) {
    return ApiBackEnd({
      method: "post",
      url: `/client-fournisseurs/new`,
      data: values,
    });
  },

  updateClientFournisseur(values) {
    return ApiBackEnd({
      method: "PUT",
      url: `/client-fournisseurs/wrapper`,
      data: values,
    });
  },
  deleteClientFournisseur(clientId, userId) {
    return ApiBackEnd({
      method: "delete",
      url: `/client-fournisseurs/${clientId}/user/${userId}`,
    });
  },
  getClientFournisseurByNom(nom) {
    return ApiBackEnd({
      method: "get",
      url: `/client-fournisseurs/nom/${nom}`,
    });
  },
  //fin clientFournisseur

  //Gestion Social
  getAllWrapperEmployesBySociety(id) {
    return ApiBackEnd({
      method: "get",
      url: `/wrapperemployes/society/${id}`,
    });
  },

  getAllTypesAbsence() {
    return ApiBackEnd({
      method: "GET",
      url: "/type-absences",
    });
  },

  createAbsence(values) {
    return ApiBackEnd({
      method: "POST",
      url: "/absences",
      data: values,
    });
  },

  getAllTypePrimes() {
    return ApiBackEnd({
      method: "GET",
      url: "/type-primes",
    });
  },

  createPrime(values) {
    return ApiBackEnd({
      method: "POST",
      url: "/primes",
      data: values,
    });
  },

  createHeureSupplementaire(values) {
    return ApiBackEnd({
      method: "POST",
      url: `/heures-supplementaires`,
      data: values,
    })
  },

  createAvanceRappelSalaire(values) {
    return ApiBackEnd({
      method: "POST",
      url: '/avance-rappel-salaires',
      data: values,
    })
  },

  createNoteDeFrais(values) {
    return ApiBackEnd({
      method: "POST",
      url: '/note-de-frais',
      data: values
    })
  },

  getWrapperEmploye(id) {
    return ApiBackEnd({
      method: "get",
      url: `/wrapperemployes/${id}`,
    });
  },

  createWrapperEmploye(values) {
    return ApiBackEnd({
      method: "post",
      url: `/wrapperemployes`,
      data: values,
    });
  },

  updateWrapperEmploye(values) {
    return ApiBackEnd({
      method: "put",
      url: `/wrapperemployes`,
      data: values,
    });
  },

  deleteWrapperEmploye(id) {
    return ApiBackEnd({
      method: "delete",
      url: `/wrapperemployes/${id}`,
    });
  },

  getAllWrapperEmployesBySocietyAndTypeContrat(id, type) {
    return ApiBackEnd({
      method: "get",
      url: `/wrapperemployes/society/${id}/typecontrat/${type}`,
    });
  },

  getAllWrapperEmployesBySocietyAndSatutEmploye(id, codestatut) {
    return ApiBackEnd({
      method: "GET",
      url: `/wrapperemployes/society/${id}/statutemploye/${codestatut}`,
    });
  },

  getAllTypeContrats() {
    return ApiBackEnd({
      method: "GET",
      url: `/type-contrats`,
    });
  },

  getAllStatutEmployes() {
    return ApiBackEnd({
      method: "GET",
      url: `/statut-employes`,
    });
  },

  archiveWrapperEmploye(values) {
    return ApiBackEnd({
      method: "PUT",
      url: `/wrapperemploye/archive`,
      data: values,
    });
  },

  getOneWrapperVariablesDePaie(idEmploye, annee, mois) {
    return ApiBackEnd({
      method: "GET",
      url: `/wrappervariablespaie/employe/${idEmploye}/annee/${annee}/mois/${mois}`,
    });
  },
  
  //fin Gestion Social

  getReleve() {
    return ApiBackEnd({
      method: "get",
      url: "/releves",
    });
  },
  getReleveByEtatAndSociety(idEtat, idSociete) {
    return ApiBackEnd({
      method: "get",
      url: `/releve/etat/${idEtat}/societe/${idSociete}`,
    });
  },
  getReleveByEtat(id) {
    return ApiBackEnd({
      method: "get",
      url: `/releve/etat/${id}`,
    });
  },

  getReleveBySocieteId(id) {
    return ApiBackEnd({
      method: "get",
      url: `/releve/societe/${id}`,
    });
  },

  getReleveById(id) {
    return ApiBackEnd({
      method: "get",
      url: `/releves/${id}`,
    });
  },

  getReleveSoldeById(id) {
    return ApiBackEnd({
      method: "get",
      url: `/releves/${id}/solde`,
    });
  },

  getOperationById(id) {
    return ApiBackEnd({
      method: "get",
      url: `/operations/${id}`,
    });
  },

  getOperationByReleveId(id) {
    return ApiBackEnd({
      method: "get",
      url: `/operations/releve/${id}`,
    });
  },
  postOperation(values) {
    return ApiBackEnd({
      method: "post",
      url: "/operations",
      data: values,
    });
  },
  
  updateOperation(values) {
    return ApiBackEnd({
      method: "put",
      url: `/operations`,
      data: values,
    });
  },

  deleteOperation(id) {
    return ApiBackEnd({
      method: "delete",
      url: `/operations/${id}`,
    });
  },

  postReleve(values) {
    return ApiBackEnd({
      method: "post",
      url: "/releves",
      data: values,
    });
  },
  //Gestion Utilisateur, Comptable et Société.

  //Gestion User
  addUser(values) {
    return ApiBackEnd({
      method: "post",
      url: "/users/add",
      data: values,
    });
  },

  editUser(values) {
    return ApiBackEnd({
      method: "put",
      url: "/users/edit",
      data: values,
    });
  },

  deleteReleve(id) {
    return ApiBackEnd({
      method: "delete",
      url: `/releves/${id}`,
    });
  },

  validateReleve(id) {
    return ApiBackEnd({
      method: "put",
      url: `/releve/${id}`,
    });
  },

  getUser(id) {
    return ApiBackEnd({
      method: "get",
      url: "/users/" + id,
    });
  },

  getAllUsers() {
    return ApiBackEnd({
      method: "get",
      url: "/users/all",
    });
  },

  deleteUser(id) {
    return ApiBackEnd({
      method: "delete",
      url: "/users/" + id,
    });
  },
  //Fin Gestion User

  //Gestion Comptable
  addComptable(values) {
    return ApiBackEnd({
      method: "post",
      url: "/wrappercomptable/add",
      data: values,
    });
  },

  getComptable(id) {
    return ApiBackEnd({
      method: "get",
      url: "/wrappercomptable/" + id,
    });
  },

  getComptableByUserId(id) {
    return ApiBackEnd({
      method: "get",
      url: "/comptables/user/" + id,
    });
  },

  editComptable(values) {
    return ApiBackEnd({
      method: "put",
      url: "/wrappercomptable/edit",
      data: values,
    });
  },
  //Fin Gestion Comptable

  //Gestion Produits
  getProduit(id) {
    return ApiBackEnd({
      method: "get",
      url: `/produits/societe/${id}`,
    });
  },
  getProduitById(id) {
    return ApiBackEnd({
      method: "get",
      url: `/produits/${id}`,
    });
  },
  createProduit(values) {
    return ApiBackEnd({
      method: "post",
      url: "/produits",
      data: values,
    });
  },
  deleteProduit(produitId, userId) {
    return ApiBackEnd({
      method: "delete",
      url: `/produits/${produitId}/user/${userId}`,
    });
  },

  updateProduit(values) {
    return ApiBackEnd({
      method: "PUT",
      url: `/produits/update`,
      data: values,
    });
  },

  //Gestion societe
  addSociete(values) {
    return ApiBackEnd({
      method: "post",
      url: "/wrappersociete/add",
      data: values,
    });
  },

  getSociete(id) {
    return ApiBackEnd({
      method: "get",
      url: "/wrappersociete/" + id,
    });
  },

  getSocietyByUserId(id) {
    return ApiBackEnd({
      method: "get",
      url: "/societes/user/" + id,
    });
  },

  editSociete(values) {
    return ApiBackEnd({
      method: "put",
      url: "/wrappersociete/edit",
      data: values,
    });
  },

  getWrapperSociete(id) {
    return ApiBackEnd({
      method: "get",
      url: `/wrappersociete/${id}`,
    });
  },
  //Fin gestion societe
  requestPasswordReset(values) {
    return ApiBackEnd({
      method: "post",
      url: `/account/reset-password/init`,
      data: values,
    });
  },

  //comptable
  getAllComptables() {
    return ApiBackEnd({
      method: "get",
      url: "/comptables/all",
    });
  },
  //fin comptable
  uploadFacture(facture, files) {
    let formData = new FormData();
    formData.append("numfact", facture.numfact);
    formData.append("message", facture.message);
    formData.append("date", facture.date);
    formData.append("dateEcheance", facture.echeance);
    formData.append("prixHT", facture.prixHT);
    formData.append("prixTTC", facture.prixTTC);
    formData.append("tva", facture.tva);
    formData.append("moyenDePaiement", facture.moyenDePaiement);
    formData.append("societeId", UserService.getSocietyId());
    formData.append("client", facture.client);
    formData.append("numRue", facture.numAdresse);
    formData.append("nomRue", facture.nomRueAdresse);
    formData.append("codePostal", facture.codePostal);
    formData.append("ville", facture.ville);
    formData.append("pays", facture.pays);
    for (let i = 0; i < files.length; i++) {
      formData.append("listeFiles", files.item(i));
    }

    return ApiBackEnd({
      method: "POST",
      url: "/facture/new",
      mode: "no-cors",
      data: formData,
    });
  },

  uploadDepense(facture, files) {
    let formData = new FormData();
    formData.append("message", facture.message);
    formData.append("date", facture.date);
    formData.append("prixTTC", facture.prixTTC);
    formData.append("moyenDePaiement", facture.moyenDePaiement);
    formData.append("societeId", UserService.getSocietyId());
    formData.append("client", facture.client);
    for (let i = 0; i < files.length; i++) {
      formData.append("listeFiles", files.item(i));
    }

    return ApiBackEnd({
      method: "POST",
      url: "/depense/new",
      mode: "no-cors",
      data: formData,
    });
  },

  getLastNumFactBySociete(id) {
    return ApiBackEnd({
      method: "GET",
      url: `/facture/lastnumfact/${id}`,
    });
  },

  getInfosForCreationFacture(id){
    return Axios.all([
      this.getLastNumFactBySociete(id),
      this.getAllClientFournisseurBySociete(id)
    ])
  },

  deleteFacture(id) {
    return ApiBackEnd({
      method: "DELETE",
      url: `/factures/${id}`,
    });
  },

  getFactureBySociete(id) {
    return ApiBackEnd({
      method: "GET",
      url: `facturesvente/societe/${id}`,
    });
  },

  getDepenseBySociete(id) {
    return ApiBackEnd({
      method: "GET",
      url: `depense/societe/${id}`,
    });
  },

  getInvoicesByStatement(id) {
    return ApiBackEnd({
      method: "GET",
      url: `/factures/relevé/${id}`
    })
  },

  createLigneProduit(values) {
    return ApiBackEnd({
      method: "post",
      url: "/ligne-produits",
      data: values,
    });
  },
};

export default AxiosCenter;

/*

AxiosCenter.getCurrentUser().then(response => {
    response ........
}).catch(error => {
    //error.........
})



*/
