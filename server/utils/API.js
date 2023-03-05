import axios from "axios";

export default {
  // Gets user by username
  getUserByUsername: function (username) {
    return axios.get(`/api/users/${username}`)
  },
  // Gets user by uid
  getUserById: function (uid) {
    return axios.get(`/api/users/${uid}`)
  },
  // Gets user with given uid
  loginUser: function (userData) {
    return axios.post(`/api/login`, userData);
  },
  // Add a new user to the database  
  newUser: function (userData) {
    return axios.post('/api/users', userData);
  },
  // Add a new image
  newImage: function (imgData) {
    return axios.post('/api/addImage', imgData);
  },
  // Get all user images attached to a board
  getImages: function (bid) {
    return axios.get(`/api/${bid}/images`)
  },
  // Delete an image
  deleteImg: function (iid) {
    return axios.delete(`/api/images/${iid}`)
  },
};