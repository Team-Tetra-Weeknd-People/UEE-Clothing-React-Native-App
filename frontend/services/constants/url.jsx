const BASE_URL = 'https://uee-mobile-backend.onrender.com/api';

export const ITEMS_URL = `${BASE_URL}/items`;
export const ITEMS_ID_URL = `${BASE_URL}/items/`;

export const ITEM_ORDER_URL = `${BASE_URL}/itemOrders`;
export const ITEM_ORDER_ID_URL = `${BASE_URL}/itemOrders/`;
export const ITEM_ORDER_GETONE_URL = id => `${BASE_URL}/itemOrders/getOne${id}`;
export const ITEM_ORDER_MANUFACTURER_URL = id =>
  `${BASE_URL}/itemOrders/manufacturerID/${id}`;
export const ITEM_ORDER_STATUS_URL = status =>
  `${BASE_URL}/itemOrders/status/${status}`;
export const ITEM_ORDER_MANUFACTURER_STATUS_URL = (status, id) =>
  `${BASE_URL}/itemOrders/manufacturerID/${id}/status/${status}`;

export const ITEM_QA_URL = `${BASE_URL}/itemQAs`;
export const ITEM_QA_ID_URL = `${BASE_URL}/itemQAs/`;
export const ITEM_QA_GETONE_URL = id => `${BASE_URL}/itemQAs/getOne${id}`;
export const ITEM_QA_ITEM_URL = id => `${BASE_URL}/itemQAs/itemID/${id}`;

export const ITEM_QA_COMPLAINTS_URL = `${BASE_URL}/itemQAComplaints`;
export const ITEM_QA_COMPLAINTS_ID_URL = `${BASE_URL}/itemQAComplaints/`;
export const ITEM_QA_COMPLAINTS_GETONE_URL = id =>
  `${BASE_URL}/itemQAComplaints/getOne${id}`;
export const ITEM_QA_COMPLAINTS_ORDER_URL = id =>
  `${BASE_URL}/itemQAComplaints/itemOrderID/${id}`;

export const MATERIAL_URL = `${BASE_URL}/materials`;
export const MATERIAL_ID_URL = `${BASE_URL}/materials/`;

export const MATERIAL_ORDER_URL = `${BASE_URL}/materialOrders`;
export const MATERIAL_ORDER_ID_URL = `${BASE_URL}/materialOrders/`;
export const MATERIAL_ORDER_GETONE_URL = id =>
  `${BASE_URL}/materialOrders/getOne/${id}`;
export const MATERIAL_ORDER_SUPPLIER_URL = id =>
  `${BASE_URL}/materialOrders/supplierID/${id}`;
export const MATERIAL_ORDER_STATUS_URL = status =>
  `${BASE_URL}/materialOrders/status/${status}`;
export const MATERIAL_ORDER_SUPPLIER_STATUS_URL = (status, id) =>
  `${BASE_URL}/materialOrders/supplierID/${id}/status/${status}`;

export const MATERIAL_QA_URL = `${BASE_URL}/materialQAs`;
export const MATERIAL_QA_ID_URL = `${BASE_URL}/materialQAs/`;
export const MATERIAL_QA_GETONE_URL = id =>
  `${BASE_URL}/materialQAs/getOne/${id}`;
export const MATERIAL_QA_ITEM_URL = id =>
  `${BASE_URL}/materialQAs/materialID/${id}`;

export const MATERIAL_QA_COMPLAINTS_URL = `${BASE_URL}/materialQAComplaints`;
export const MATERIAL_QA_COMPLAINTS_ID_URL = `${BASE_URL}/materialQAComplaints/`;
export const MATERIAL_QA_COMPLAINTS_GETONE_URL = id =>
  `${BASE_URL}/materialQAComplaints/getOne/${id}`;
export const MATERIAL_QA_COMPLAINTS_ORDER_URL = id =>
  `${BASE_URL}/materialQAComplaints/materialOrderID/${id}`;

export const PROCESS_MANAGER_URL = `${BASE_URL}/processManagers`;
export const PROCESS_MANAGER_ID_URL = `${BASE_URL}/processManagers/`;
export const PROCESS_MANAGER_LOGIN_URL = `${BASE_URL}/processManagers/login`;

export const SELLER_URL = `${BASE_URL}/sellers`;
export const SELLER_ID_URL = `${BASE_URL}/sellers/`;
export const SELLER_LOGIN_URL = `${BASE_URL}/sellers/login`;

export const SUPPLIER_URL = `${BASE_URL}/suppliers`;
export const SUPPLIER_ID_URL = `${BASE_URL}/suppliers/`;
export const SUPPLIER_LOGIN_URL = `${BASE_URL}/suppliers/login`;

export const MANUFACTURER_URL = `${BASE_URL}/manufacturers`;
export const MANUFACTURER_ID_URL = `${BASE_URL}/manufacturers/`;
export const MANUFACTURER_LOGIN_URL = `${BASE_URL}/manufacturers/login`;
