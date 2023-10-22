import axios from "axios";
import * as url from "./constants/url.jsx";

export const getItems = () => {
  return axios.get(url.ITEMS_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getItem = (id) => {
  return axios.get(url.ITEM_GET_ONE_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createItem = (data) => {
  return axios.post(url.ITEMS_URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateItem = (id, data) => {
  return axios.put(url.ITEMS_ID_URL(id), data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteItem = (id) => {
  return axios.delete(url.ITEMS_ID_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getItemByManufacturer = (id) => {
  return axios.get(url.ITEM_GET_BY_MANUFACTURER_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getItemByMaterial = (id) => {
  return axios.get(url.ITEM_GET_BY_MATERIAL_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getItemByManufacturer,
  getItemByMaterial,
};
