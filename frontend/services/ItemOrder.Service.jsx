import axios from 'axios';
import * as url from './constants/url.jsx';

export const getItemOrders = () => {
  return axios.get(url.ITEM_ORDER_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getItemOrder = id => {
  return axios.get(url.ITEM_ORDER_GETONE_URL(id), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createItemOrder = data => {
  return axios.post(url.ITEM_ORDER_URL, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateItemOrder = (id, data) => {
  return axios.put(url.ITEM_ORDER_ID_URL(id), data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteItemOrder = id => {
  return axios.delete(url.ITEM_ORDER_ID_URL(id), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getItemOrderByManufacturer = id => {
  return axios.get(url.ITEM_ORDER_MANUFACTURER_URL(id), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
export const getItemOrderBySeller = id => {
  return axios.get(url.ITEM_ORDER_SELLER_URL(id), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
export const getItemOrderByStatus = status => {
  return axios.get(url.ITEM_ORDER_STATUS_URL(status), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getItemOrderByManufacturerAndStatus = (status, id) => {
  return axios.get(url.ITEM_ORDER_MANUFACTURER_STATUS_URL(status, id), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default {
  getItemOrders,
  getItemOrder,
  createItemOrder,
  updateItemOrder,
  deleteItemOrder,
  getItemOrderByManufacturer,
  getItemOrderByStatus,
  getItemOrderByManufacturerAndStatus,
  getItemOrderBySeller
};
