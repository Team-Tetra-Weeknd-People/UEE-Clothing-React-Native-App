import axios from 'axios';
import * as url from './constants/url.jsx';

export const getProcessManagers = () => {
  return axios.get(url.PROCESS_MANAGER_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getProcessManager = id => {
  return axios.get(url.PROCESS_MANAGER_ID_URL(id), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createProcessManager = data => {
  return axios.post(url.PROCESS_MANAGER_URL, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateProcessManager = (id, data) => {
  return axios.put(url.PROCESS_MANAGER_ID_URL(id), data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteProcessManager = id => {
  return axios.delete(url.PROCESS_MANAGER_ID_URL(id), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const loginProcessManager = data => {
  return axios.post(url.PROCESS_MANAGER_LOGIN_URL, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default {
  getProcessManagers,
  getProcessManager,
  createProcessManager,
  updateProcessManager,
  deleteProcessManager,
  loginProcessManager,
};
