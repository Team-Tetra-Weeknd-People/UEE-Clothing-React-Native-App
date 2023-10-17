import axios from 'axios';
import * as url from './constants/url.jsx';

export const getMaterialQAs = () => {
  return axios.get(url.MATERIAL_QA_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getMaterialQA = id => {
  return axios.get(url.MATERIAL_QA_ID_URL(id), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createMaterialQA = data => {
  return axios.post(url.MATERIAL_QA_URL, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateMaterialQA = (id, data) => {
  return axios.put(url.MATERIAL_QA_ID_URL(id), data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteMaterialQA = id => {
  return axios.delete(url.MATERIAL_QA_ID_URL(id), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getMaterialQAByID = id => {
  return axios.get(url.MATERIAL_QA_ITEM_URL(id), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default {
  getMaterialQAs,
  getMaterialQA,
  createMaterialQA,
  updateMaterialQA,
  deleteMaterialQA,
  getMaterialQAByID,
};
