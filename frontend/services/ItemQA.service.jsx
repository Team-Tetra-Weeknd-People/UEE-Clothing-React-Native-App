import axios from 'axios';
import * as url from './constants/url.jsx';

export const getItemQAs = () => {
  return axios.get(url.ITEM_QA_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getItemQA = id => {
  return axios.get(url.ITEM_QA_GETONE_URL(id), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createItemQA = data => {
  return axios.post(url.ITEM_QA_URL, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateItemQA = (id, data) => {
  return axios.put(url.ITEM_QA_ID_URL(id), data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteItemQA = id => {
  return axios.delete(url.ITEM_QA_ID_URL(id), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getItemQAByItem = id => {
  return axios.get(url.ITEM_QA_ITEM_URL(id), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default {
  getItemQAs,
  getItemQA,
  createItemQA,
  updateItemQA,
  deleteItemQA,
  getItemQAByItem,
};
