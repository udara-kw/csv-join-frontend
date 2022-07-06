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

export async function viewAllUsers() {
  // eslint-disable-next-line no-useless-concat
  const url = `${config.BASEURL}` + "/viewAllUsers";
  const configs = { headers: { Authorization: `Bearer ${sessionStorage.getItem("userToken")}` } };
  return http.get(url, configs);
}

export async function registerNewUser(username, email, password, secret) {
  // eslint-disable-next-line no-useless-concat
  const url = `${config.BASEURL}` + "/addUser";
  const configs = { headers: { Authorization: `Bearer ${sessionStorage.getItem("userToken")}` } };
  const data = {
    name: username,
    email,
    password,
    role: "User",
    secret,
  };
  return http.post(url, data, configs);
}

export async function changePassword(oldPassword, newPassword) {
  // eslint-disable-next-line no-useless-concat
  const url = `${config.BASEURL}` + "/changePassword";
  const configs = { headers: { Authorization: `Bearer ${sessionStorage.getItem("userToken")}` } };
  const data = {
    username: sessionStorage.getItem("username"),
    oldPassword,
    newPassword,
  };
  return http.post(url, data, configs);
}

export async function deleteExistingUser(username) {
  // eslint-disable-next-line no-useless-concat
  const url = `${config.BASEURL}` + `/deleteUser/${username}`;
  const configs = { headers: { Authorization: `Bearer ${sessionStorage.getItem("userToken")}` } };
  return http.delete(url, configs);
}

export async function getCSVData() {
  // eslint-disable-next-line no-useless-concat
  const url = `${config.BASEURL}` + "/csv/viewAll/" + `${sessionStorage.getItem("username")}`;
  const configs = { headers: { Authorization: `Bearer ${sessionStorage.getItem("userToken")}` } };
  return http.get(url, configs);
}

export async function getCSVFile() {
  // return await http.get(`${config["BASEURL"]}`+'/csv-data');
  return null;
}

export async function uploadCSVFile(files, tags) {
  // eslint-disable-next-line no-useless-concat
  const url = `${config.BASEURL}` + "/csv/uploadFile/";
  const configs = { headers: { Authorization: `Bearer ${sessionStorage.getItem("userToken")}` } };
  return http.post(
    url,
    {
      files,
      tags,
      username: `${sessionStorage.getItem("username")}`,
    },
    configs
  );
}

export async function downloadCSVFiles(filenames) {
  // eslint-disable-next-line no-useless-concat
  const url = `${config.BASEURL}` + "/csv/downloadFiles/";
  const configs = { headers: { Authorization: `Bearer ${sessionStorage.getItem("userToken")}` } };
  const downloadedFiles = [];
  for (let i = 0; i < filenames.length; i += 1) {
    const filename = filenames[i];
    // eslint-disable-next-line no-await-in-loop
    const res = await http.post(
      url,
      {
        filename,
        username: `${sessionStorage.getItem("username")}`,
      },
      configs
    );
    downloadedFiles.push({ filename, content: res.data });
  }
  return downloadedFiles;
}
