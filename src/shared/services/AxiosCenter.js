import ApiBackEnd from "./../config/ApiBackEnd";
import TokenService from "./TokenService";

const AxiosCenter = {
  authenticate(values) {
    ApiBackEnd({
      method: "post",
      url: "/authenticate",
      data: values,
    })
      .then((response) => {
        TokenService.connexion(response.data);
      })
      .catch((error) => console.log("User non reconnu TODO"));
  },

  getCurrentUser() {
    return ApiBackEnd({
      method: "get",
      url: "/account",
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
