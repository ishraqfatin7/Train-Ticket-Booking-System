import axios from "axios";
import { API_BASE_URL, API_LOGIN } from "../utils/constants";

export const login = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}${API_LOGIN}`, credentials);
  console.log(response);
  const { _id } = response.data;
  sessionStorage.setItem("authToken", _id);
  return response.data;
};

export const logout = () => {
  axios.post(`${API_BASE_URL}/auth/logout`);
  sessionStorage.removeItem("authToken");
};
export const register = async (credentials) => {
  const response = await axios.post(
    `${API_BASE_URL}${API_REGISTER}`,
    credentials
  );
  return response.data;
};
