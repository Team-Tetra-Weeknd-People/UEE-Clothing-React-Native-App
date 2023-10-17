import axios from 'axios';
import * as url from './constants/url.jsx';

export const getSellers = () => {
  return axios.get(url.SELLER_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getSeller = id => {
  return axios.get(url.SELLER_ID_URL(id), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createSeller = data => {
  return axios.post(url.SELLER_URL, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateSeller = (id, data) => {
  return axios.put(url.SELLER_ID_URL(id), data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteSeller = id => {
  return axios.delete(url.SELLER_ID_URL(id), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const loginSeller = data => {
  return axios.post(url.SELLER_LOGIN_URL, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default {
  getSellers,
  getSeller,
  createSeller,
  updateSeller,
  deleteSeller,
  loginSeller,
};
