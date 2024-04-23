import axios from "axios";

const API = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
});

const api = axios.create({
  baseURL: "http://127.0.0.1:8080/api",
});

//auth
export const UserSignUp = async (data) => await api.post("/user/signup", data);
export const UserSignIn = async (data) => await api.post("/user/signin", data);

//products
export const getAllProducts = async (filter) =>
  await API.get(`filter.php?c=${filter}`, filter);

export const getProductDetails = async (id) => await API.get(`lookup.php?i=${id}`);

//Cart
export const getCart = async (token) =>
  await api.get(`/user/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToCart = async (token, data) =>
  await api.post(`/user/cart/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteFromCart = async (token, data) =>
  await api.patch(`/user/cart/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

//favorites

export const getFavourite = async (token) =>
  await api.get(`/user/favorite`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToFavourite = async (token, data) =>
  await api.post(`/user/favorite/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteFromFavourite = async (token, data) =>
  await api.patch(`/user/favorite/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

//Orders
export const placeOrder = async (token, data) =>
  await api.post(`/user/order/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOrders = async (token) =>
  await api.get(`/user/order/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
