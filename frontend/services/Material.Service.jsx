import axios from "axios";
import * as url from "./constants/url.jsx";

export const getMaterials = () => {
  return axios.get(url.MATERIAL_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getMaterial = (id) => {
  return axios.get(url.MATERIAL_ID_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createMaterial = (data) => {
  return axios.post(url.MATERIAL_URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateMaterial = (id, data) => {
  return axios.put(url.MATERIAL_ID_URL(id), data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteMaterial = (id) => {
  return axios.delete(url.MATERIAL_ID_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getMaterialBySupplier = (id) => {
  return axios.get(url.MATERIAL_GET_BY_SUPPLIER_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default {
  getMaterials,
  getMaterial,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterialBySupplier,
};
