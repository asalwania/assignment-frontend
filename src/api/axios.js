import axios from "axios";

const baseUrl = "http://localhost:8080";
const client = axios.create({ baseUrl });

// request wrapper for auth header
const request = ({ ...options }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  client.defaults.headers.common.Authorization = token;

  const onSuccess = (response) => response;
  const onError = (error) => error;

  return client(options).then(onSuccess).catch(onError);
};

// apis
export const login = async ({ email, password }) => {
  try {
    const user = await axios.post(`${baseUrl}/api/user/login`, {
      email,
      password,
    });

    return user;
  } catch (error) {
    return error;
  }
};

export const logout = async ({ email, sessionId }) => {
  try {
    const session = await axios.post(`${baseUrl}/api/user/logout`, {
      email,
      sessionId,
    });

    return session;
  } catch (error) {
    return error;
  }
};

export const addUser = async (userData) => {
  try {
    const user = request({
      url: `${baseUrl}/api/user`,
      method: "post",
      data: userData,
    });
    return user;
  } catch (error) {
    return error;
  }
};

export const getUsers = async () => {
  try {
    const users = request({ url: `${baseUrl}/api/user` });
    return users;
  } catch (error) {
    return error;
  }
};

export const createProduct = async (productData) => {
  try {
    const product = request({
      url: `${baseUrl}/api/user/add-product`,
      method: "post",
      data: productData,
    });
    return product;
  } catch (error) {
    return error;
  }
};

export const getAllProducts = async () => {
  try {
    const products = request({ url: `${baseUrl}/api/user/products` });
    return products;
  } catch (error) {
    return error;
  }
};

export const getProdutsById = async ({ userId }) => {
  try {
    const products = request({ url: `${baseUrl}/api/user/products/${userId}` });
    return products;
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = request({
      url: `${baseUrl}/api/user/product`,
      method: "delete",
      data: productId,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateProduct = async (productData) => {
  try {
    const response = request({
      url: `${baseUrl}/api/user/product`,
      method: "put",
      data: productData,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getProdutsBySession = async ({ sessionId }) => {
  try {
    const products = request({
      url: `${baseUrl}/api/user/products/${sessionId}`,
    });
    return products;
  } catch (error) {
    return error;
  }
};

export const getAllSessions = async ({ userId }) => {
  try {
    const sessions = request({ url: `${baseUrl}/api/user/sessions/${userId}` });
    return sessions;
  } catch (error) {
    return error;
  }
};
