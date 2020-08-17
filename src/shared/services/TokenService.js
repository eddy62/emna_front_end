import Cookies from "universal-cookie";
const cookies = new Cookies();
const TokenService = {
  connexion(token) {
    // localStorage.setItem("authToken", token);
    cookies.set("authToken", token, { path: "/" });
  },

  getToken() {
    return cookies.get("authToken");
  },

  deconnexion() {
    cookies.remove("authToken");
  },

  isAuthenticated() {
    return cookies.get("authToken") ? true : false;
  },
};

export default TokenService;
