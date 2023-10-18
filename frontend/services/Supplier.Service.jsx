import axios from "axios";
import * as url from "./constants/url.jsx";

export const getSuppliers = () => {
  return axios.get(url.SUPPLIER_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getSupplier = (id) => {
  return axios.get(url.SUPPLIER_ID_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createSupplier = (data) => {
  return axios.post(url.SUPPLIER_URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateSupplier = (id, data) => {
  return axios.put(url.SUPPLIER_ID_URL(id), data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteSupplier = (id) => {
  return axios.delete(url.SUPPLIER_ID_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const loginSupplier = (data) => {
  return axios.post(url.SUPPLIER_LOGIN_URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default {
  getSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  loginSupplier,
};
