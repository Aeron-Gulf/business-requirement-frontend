import axios from "axios";

const API_URL = "http://localhost:5000/";

class Service {
  register(formData) {
    return axios.post(API_URL + "signup", formData);
  };

  getUser() {
    return axios.get(API_URL + "getusers");
  };
}

export default new Service();