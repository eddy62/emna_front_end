import ApiBackEnd from "./../config/ApiBackEnd";

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

  getAllClientFournisseurBySociete(id) {
    return ApiBackEnd({
      method: "get",
      url: `/client-fournisseurs/societe/${id}`,
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
  deleteClientFournisseur(id) {
    return ApiBackEnd({
      method: "delete",
      url: `/client-fournisseurs/${id}`,
    });
  },
  getClientFournisseurByNom(nom) {
    return ApiBackEnd({
      method: "get",
      url: `/client-fournisseurs/nom/${nom}`,
    });
  },

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
      url: `/wrapperemployes/society/${id}`,
    });
  },

  //fin Gestion Social

  getReleve() {
    return ApiBackEnd({
      method: "get",
      url: "/releves",
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

  //gestion Societe
  getWrapperSociete(id) {
    return ApiBackEnd({
      method: "get",
      url: `/wrappersociete/${id}`,
    });
  },
  //Fin Gestion Société

  getOperation() {
    return ApiBackEnd({
      method: "get",
      url: "/operations",
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

  getUser(values) {
    return ApiBackEnd({
      method: "get",
      url: "/users/" + values,
    });
  },

  getAllUsers(values) {
    return ApiBackEnd({
      method: "get",
      url: "/users/all",
    });
  },

  deleteUser(values) {
    return ApiBackEnd({
      method: "delete",
      url: "/users/" + values,
    });
  },
  //Fin Gestion User

  //Gestion Comptable
  addComptable(values) {
    return ApiBackEnd({
      method: "post",
      url: "/comptables/add",
      data: values,
    });
  },

  getComptable(values) {
    return ApiBackEnd({
      method: "get",
      url: "/comptables/" + values,
    });
  },

  getComptableId(values) {
    return ApiBackEnd({
      method: "get",
      url: "/comptables/refuser/" + values,
    });
  },

  editComptable(values) {
    return ApiBackEnd({
      method: "put",
      url: "/comptables/edit",
      data: values,
    });
  },
  //Fin Gestion Comptable

  //Fin Gestion Utilisatuer, Comptable et Société.
};

export default AxiosCenter;

/*

AxiosCenter.getCurrentUser().then(response => {
    response ........
}).catch(error => {
    //error.........
})



*/
