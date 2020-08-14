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

  setSocietyId(id) {
    localStorage.setItem("societyId", id);
  },

  getSocietyId() {
    return localStorage.getItem("societyId");
  },
};

export default UserService;
