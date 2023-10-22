import axios from "axios";
import * as url from "./constants/url.jsx";

export const getItemComplaints = () => {
  return axios.get(url.ITEM_QA_COMPLAINTS_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getItemComplaint = (id) => {
  return axios.get(url.ITEM_QA_COMPLAINTS_GETONE_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createItemComplaint = (data) => {
  return axios.post(url.ITEM_QA_COMPLAINTS_URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateItemComplaint = (id, data) => {
  return axios.put(url.ITEM_QA_COMPLAINTS_ID_URL(id), data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteItemComplaint = (id) => {
  return axios.delete(url.ITEM_QA_COMPLAINTS_ID_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getItemComplaintByItemOrder = (id) => {
  return axios.get(url.ITEM_QA_COMPLAINTS_ORDER_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getItemComplaintByQA = (id) => {
  return axios.get(url.ITEM_QA_COMPLAINTS_QA_URL(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default {
  getItemComplaints,
  getItemComplaint,
  createItemComplaint,
  updateItemComplaint,
  deleteItemComplaint,
  getItemComplaintByItemOrder,
  getItemComplaintByQA,
};
