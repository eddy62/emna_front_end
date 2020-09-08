import Cookies from "universal-cookie";
const cookies = new Cookies();

const UserService = {
  setRole(role) {
    cookies.set("userRole", role, { path: "/" });
  },

  getRole() {
    return cookies.get("userRole");
  },

  setUserId(id) {
    cookies.set("userId", id, { path: "/" });
  },

  getUserId() {
    return cookies.get("userId");
  },

  setSocietyId(id) {
    cookies.set("societyId", id, { path: "/" });
  },

  getSocietyId() {
    return cookies.get("societyId");
  },

  isAdmin() {
    return this.getRole() === "ROLE_ADMIN"
  },

  isSociety() {
    return this.getRole() === "ROLE_SOCIETY";
  },

  isAccountant() {
    return this.getRole() === "ROLE_ACCOUNTANT";
  }
};

export default UserService;
