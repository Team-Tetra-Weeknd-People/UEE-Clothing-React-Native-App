import axios from "axios";
import * as url from "./constants/url.jsx";

export const getMaterialQAComplaints = () => {
  return axios.get(url.MATERIAL_QA_COMPLAINTS_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getMaterialQAComplaint = (id) => {
  return axios.get(url.MATERIAL_QA_COMPLAINTS_ID_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createMaterialQAComplaint = (data) => {
  return axios.post(url.MATERIAL_QA_COMPLAINTS_URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateMaterialQAComplaint = (id, data) => {
  return axios.put(url.MATERIAL_QA_COMPLAINTS_ID_URL(id), data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteMaterialQAComplaint = (id) => {
  return axios.delete(url.MATERIAL_QA_COMPLAINTS_ID_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getMaterialQAComplaintByMaterialOrder = (id) => {
  return axios.get(url.MATERIAL_QA_COMPLAINTS_ORDER_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getMaterialQAComplaintByQA = (id) => {
  return axios.get(url.MATERIAL_QA_COMPLAINTS_QA_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default {
  getMaterialQAComplaints,
  getMaterialQAComplaint,
  createMaterialQAComplaint,
  updateMaterialQAComplaint,
  deleteMaterialQAComplaint,
  getMaterialQAComplaintByMaterialOrder,
  getMaterialQAComplaintByQA,
};
