import Cookies from "universal-cookie";
import {Roles} from "../constants/Roles";

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
    return this.getRole() === Roles.Admin
  },

  isSociety() {
    return this.getRole() === Roles.SOCIETY;
  },

  isAccountant() {
    return this.getRole() === Roles.ACCOUNTANT;
  }
};

export default UserService;
