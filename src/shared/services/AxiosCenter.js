import ApiBackEnd from "./../config/ApiBackEnd";
import { MDBCardTitle } from "mdbreact";

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
    formData.append("societeId", 1);
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

  deleteFacture(id) {
    return ApiBackEnd({
      method: "DELETE",
      url: `/factures/${id}`,
    });
  },

  getFactureBySociete(id) {
    return ApiBackEnd({
      method: "GET",
      url: `factures/societe/${id}`,
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
