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

  getClientFournisseur(id) {
    return ApiBackEnd({
      method: 'get',
      url: `/client-fournisseurs/societe/${id}`,
    })

  },

  createClientFournisseur(values) {
    return ApiBackEnd({
      method: 'post',
      url: `/client-fournisseurs/new`,
      data: values,

    })
  },


  getOperation() {
    return ApiBackEnd({
      method: "get",
      url: "/operations",
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
      data: values
    });
  },

  editUser(values) {
    return ApiBackEnd({
      method: "put",
      url: "/users/edit",
      data: values
    });
  },

  getUser(values) {
    return ApiBackEnd({
      method: "get",
      url: "/users/"+values,
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
      url: "/users/"+values,
    });
  },
  //Fin Gestion User


  //Gestion Comptable
  addComptable(values) {
    return ApiBackEnd({
      method: "post",
      url: "/comptables/add",
      data: values
    });
  },

  getComptable(values) {
    return ApiBackEnd({
      method: "get",
      url: "/comptables/"+values,
    });
  },

  getComptableId(values) {
    return ApiBackEnd({
      method: "get",
      url: "/comptables/refuser/"+values,
    });
  },

  editComptable(values) {
    return ApiBackEnd({
      method: "put",
      url:   "/comptables/edit",
      data: values
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
