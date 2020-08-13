const UserService = {
  setRole(role) {
    localStorage.setItem("userRole", role);
  },

  getRole() {
    return localStorage.getItem("userRole");
  },

  setUserId(id) {
    localStorage.setItem("userId", id);
  },

  getUserId() {
    return localStorage.getItem("userId");
  },

  setRoleId(id) {
    localStorage.setItem("roleId", id);
  },

  getRoleId() {
    return localStorage.getItem("roleId");
  },
};

export default UserService;
