import axios from "axios";
import * as url from "./constants/url.jsx";

export const getMaterialOrders = () => {
  return axios.get(url.MATERIAL_ORDER_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getMaterialOrder = (id) => {
  return axios.get(url.MATERIAL_ORDER_ID_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createMaterialOrder = (data) => {
  return axios.post(url.MATERIAL_ORDER_URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateMaterialOrder = (id, data) => {
  return axios.put(url.MATERIAL_ORDER_ID_URL(id), data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteMaterialOrder = (id) => {
  return axios.delete(url.MATERIAL_ORDER_ID_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getMaterialOrderBySupplier = (id) => {
  return axios.get(url.MATERIAL_ORDER_SUPPLIER_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getMaterialOrderByStatus = (status) => {
  return axios.get(url.MATERIAL_ORDER_STATUS_URL(status), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getMaterialOrderBySupplierAndStatus = (status, id) => {
  return axios.get(url.MATERIAL_ORDER_SUPPLIER_STATUS_URL(status, id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getMaterialOrderByManufacturer = (id) => {
  return axios.get(url.MATERIAL_ORDER_BY_MANUFACTURER_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default {
  getMaterialOrders,
  getMaterialOrder,
  createMaterialOrder,
  updateMaterialOrder,
  deleteMaterialOrder,
  getMaterialOrderBySupplier,
  getMaterialOrderByStatus,
  getMaterialOrderBySupplierAndStatus,
  getMaterialOrderByManufacturer,
};
