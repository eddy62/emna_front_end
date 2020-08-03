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
  deleteClientFournisseur(id) {
    return ApiBackEnd({
      method: 'delete',
      url: `/client-fournisseurs/${id}`,
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
};



export default AxiosCenter;

/*

AxiosCenter.getCurrentUser().then(response => {
    response ........
}).catch(error => {
    //error.........
})



*/
