import axios from "axios";
import * as url from "./constants/url.jsx";

export const getManufacturers = () => {
  return axios.get(url.MANUFACTURER_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getManufacturer = (id) => {
  return axios.get(url.MANUFACTURER_ID_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createManufacturer = (data) => {
  return axios.post(url.MANUFACTURER_URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateManufacturer = (id, data) => {
  return axios.put(url.MANUFACTURER_ID_URL(id), data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteManufacturer = (id) => {
  return axios.delete(url.MANUFACTURER_ID_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const loginManufacturer = (data) => {
  return axios.post(url.MANUFACTURER_LOGIN_URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const handleLevelManufacturer = (id, data) => {
  return axios.post(url.MANUFACTURER_HANDLE_LEVEL_URL(id), data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default {
  getManufacturers,
  getManufacturer,
  createManufacturer,
  updateManufacturer,
  deleteManufacturer,
  loginManufacturer,
  handleLevelManufacturer,
};
