// eslint-disable-next-line import/no-cycle
import jwtDecode from "jwt-decode";
// eslint-disable-next-line import/no-cycle
import http from "./httpService";
//
const config = require("../config.json");

// eslint-disable-next-line import/prefer-default-export

export async function login(email, password) {
  // eslint-disable-next-line no-console
  console.log(email, password);
  // eslint-disable-next-line no-useless-concat
  const { data } = await http.post(`${config.BASEURL}` + "/login", {
    user: {
      name: email,
      password,
    },
  });
  sessionStorage.setItem("userToken", data.access_token);
  sessionStorage.setItem("username", data.name);
  if (data.access_token) {
    return data.access_token;
  }
  return null;
}
export function logout() {
  sessionStorage.removeItem("userToken");
}
// eslint-disable-next-line consistent-return
export function getUserRole() {
  const token = sessionStorage.getItem("userToken");
  if (token) {
    return jwtDecode(token).role;
  }
  return false;
}

export function getJwt() {
  sessionStorage.getItem("userToken");
}

export async function getCSVData() {
  // eslint-disable-next-line no-useless-concat
  const url = `${config.BASEURL}` + "/csv/viewAll/" + `${sessionStorage.getItem("username")}`;
  const configs = { headers: { Authorization: `Bearer ${sessionStorage.getItem("userToken")}` } };
  return http.get(url, configs);
}

export async function getCSVfile() {
  // return await http.get(`${config["BASEURL"]}`+'/csv-data');
  return null;
}
