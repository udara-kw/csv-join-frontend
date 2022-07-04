import axios from "axios";
// eslint-disable-next-line import/no-cycle
// import { getJwt } from "./index";

// axios.defaults.headers.common["x-auth-token"] = getJwt();
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
