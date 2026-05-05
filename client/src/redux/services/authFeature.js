import axios from "axios";
import { BACKEND_URL } from "../../utils/url";

export const AUTH_URL = `${BACKEND_URL}/users/`;

// -------- REGISTER --------
const register = async (userData) => {
  const response = await axios.post(AUTH_URL + "register", userData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// -------- LOGIN --------
const login = async (userData) => {
  const response = await axios.post(AUTH_URL + "login", userData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // ✅ if using cookies
  });
  return response.data;
};

// -------- LOGOUT --------
const logout = async () => {
  const response = await axios.get(AUTH_URL + "logout", {
    withCredentials: true, // ✅ if using cookies
  });
  return response.data.message;
};

// -------- STATUS --------
const getLogInStatus = async () => {
  const response = await axios.get(AUTH_URL + "loggedin", {
    withCredentials: true, // ✅ if using cookies
  });
  return response.data; // ✅ should be true or false
};

//----------------user profile -----------------

const getUserProfile = async () => {
  const response = await axios.get(AUTH_URL + "getuser", {
    withCredentials: true, // ✅ if using cookies
  });
  return response.data; // ✅ should be true or false
};

const loginUserAsSeller = async (userData) => {
  const response = await axios.post(AUTH_URL + "seller", userData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response.data;
};


const getUserIncome = async () => {
  const response = await axios.get(AUTH_URL + "sell-ammount", {
    withCredentials: true, // ✅ if using cookies
  });
  return response.data; // ✅ should be true or false
};

const getIncome = async () => {
  const response = await axios.get(AUTH_URL + "estimate-income", {
    withCredentials: true, // ✅ if using cookies
  });
  return response.data; // ✅ should be true or false
};

const getAllUser = async () => {
  const response = await axios.get(AUTH_URL + "users", {
    withCredentials: true, // ✅ if using cookies
  });
  return response.data; // ✅ should be true or false
};

const authService = {
  register,
  login,
  logout,
  getLogInStatus,
  getUserProfile,
  loginUserAsSeller, 
  getUserIncome,
  getIncome,
  getAllUser
};

export default authService;
