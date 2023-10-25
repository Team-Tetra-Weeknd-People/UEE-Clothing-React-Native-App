const BASE_URL = "https://uee-mobile-backend.onrender.com/api";

export const WAKE_UP_URL = `https://uee-mobile-backend.onrender.com/`;

export const ITEMS_URL = `${BASE_URL}/items`;
export const ITEMS_ID_URL = `${BASE_URL}/items/`;
export const ITEM_GET_ONE_URL = (id) => `${BASE_URL}/items/getOne/${id}`;
export const ITEM_GET_BY_MANUFACTURER_URL = (id) =>
  `${BASE_URL}/items/getByManufacturer/${id}`;
export const ITEM_GET_BY_MATERIAL_URL = (id) =>
  `${BASE_URL}/items/getByMaterial/${id}`;

export const ITEM_ORDER_URL = `${BASE_URL}/itemOrders`;
export const ITEM_ORDER_ID_URL = (id) => `${BASE_URL}/itemOrders/${id}`;
export const ITEM_ORDER_GETONE_URL = (id) =>
  `${BASE_URL}/itemOrders/getOne/${id}`;
export const ITEM_ORDER_MANUFACTURER_URL = (id) =>
  `${BASE_URL}/itemOrders/manufacturerID/${id}`;
export const ITEM_ORDER_SELLER_URL = (id) =>
  `${BASE_URL}/itemOrders/sellerID/${id}`;
export const ITEM_ORDER_STATUS_URL = (status) =>
  `${BASE_URL}/itemOrders/status/${status}`;
export const ITEM_ORDER_MANUFACTURER_STATUS_URL = (status, id) =>
  `${BASE_URL}/itemOrders/manufacturerID/${id}/status/${status}`;

export const ITEM_QA_URL = `${BASE_URL}/itemQAs`;
export const ITEM_QA_ID_URL = (id) => `${BASE_URL}/itemQAs/${id}`;
export const ITEM_QA_GETONE_URL = (id) => `${BASE_URL}/itemQAs/getOne/${id}`;
export const ITEM_QA_ITEM_URL = (id) => `${BASE_URL}/itemQAs/itemID/${id}`;

export const ITEM_QA_COMPLAINTS_URL = `${BASE_URL}/itemComplaints`;
export const ITEM_QA_COMPLAINTS_ID_URL = (id) =>
  `${BASE_URL}/itemComplaints/${id}`;
export const ITEM_QA_COMPLAINTS_GETONE_URL = (id) =>
  `${BASE_URL}/itemComplaints/getOne${id}`;
export const ITEM_QA_COMPLAINTS_ORDER_URL = (id) =>
  `${BASE_URL}/itemComplaints/itemOrderID/${id}`;
export const ITEM_QA_COMPLAINTS_QA_URL = (id) =>
  `${BASE_URL}/itemComplaints/QAid/${id}`;

export const MATERIAL_URL = `${BASE_URL}/materials`;
export const MATERIAL_ID_URL = (id) => `${BASE_URL}/materials/${id}`;
export const MATERIAL_GET_ONE_URL = (id) =>
  `${BASE_URL}/materials/getOne/${id}`;
export const MATERIAL_GET_BY_SUPPLIER_URL = (id) =>
  `${BASE_URL}/materials/supplier/${id}`;

export const MATERIAL_ORDER_URL = `${BASE_URL}/materialOrders`;
export const MATERIAL_ORDER_ID_URL = (id) => `${BASE_URL}/materialOrders/${id}`;
export const MATERIAL_ORDER_GETONE_URL = (id) =>
  `${BASE_URL}/materialOrders/getOne/${id}`;
export const MATERIAL_ORDER_SUPPLIER_URL = (id) =>
  `${BASE_URL}/materialOrders/supplierID/${id}`;
export const MATERIAL_ORDER_STATUS_URL = (status) =>
  `${BASE_URL}/materialOrders/status/${status}`;
export const MATERIAL_ORDER_SUPPLIER_STATUS_URL = (status, id) =>
  `${BASE_URL}/materialOrders/supplierID/${id}/status/${status}`;
export const MATERIAL_ORDER_BY_MANUFACTURER_URL = (id) =>
  `${BASE_URL}/materialOrders/manufacturerID/${id}`;

export const MATERIAL_QA_URL = `${BASE_URL}/materialQAs`;
export const MATERIAL_QA_ID_URL = (id) => `${BASE_URL}/materialQAs/${id}`;
export const MATERIAL_QA_GETONE_URL = (id) =>
  `${BASE_URL}/materialQAs/getOne/${id}`;
export const MATERIAL_QA_ITEM_URL = (id) =>
  `${BASE_URL}/materialQAs/materialID/${id}`;

export const MATERIAL_QA_COMPLAINTS_URL = `${BASE_URL}/materialComplaints`;
export const MATERIAL_QA_COMPLAINTS_ID_URL = `${BASE_URL}/materialComplaints/`;
export const MATERIAL_QA_COMPLAINTS_GETONE_URL = (id) =>
  `${BASE_URL}/materialComplaints/getOne/${id}`;
export const MATERIAL_QA_COMPLAINTS_ORDER_URL = (id) =>
  `${BASE_URL}/materialComplaints/materialOrderID/${id}`;
export const MATERIAL_QA_COMPLAINTS_QA_URL = (id) =>
  `${BASE_URL}/materialComplaints/QAid/${id}`;

export const PROCESS_MANAGER_URL = `${BASE_URL}/processManagers`;
export const PROCESS_MANAGER_ID_URL = (id) =>
  `${BASE_URL}/processManagers/${id}`;
export const PROCESS_MANAGER_LOGIN_URL = `${BASE_URL}/processManagers/login`;

export const SELLER_URL = `${BASE_URL}/sellers`;
export const SELLER_ID_URL = (id) => `${BASE_URL}/sellers/${id}`;
export const SELLER_LOGIN_URL = `${BASE_URL}/sellers/login`;
export const SELLER_HANDLE_LEVEL_URL = `${BASE_URL}/sellers/handleLevel`;

export const SUPPLIER_URL = `${BASE_URL}/suppliers`;
export const SUPPLIER_ID_URL = (id) => `${BASE_URL}/suppliers/${id}`;
export const SUPPLIER_LOGIN_URL = `${BASE_URL}/suppliers/login`;
export const SUPPLIER_HANDLE_LEVEL_URL = `${BASE_URL}/suppliers/handleLevel`;

export const MANUFACTURER_URL = `${BASE_URL}/manufacturers`;
export const MANUFACTURER_ID_URL = (id) => `${BASE_URL}/manufacturers/${id}`;
export const MANUFACTURER_LOGIN_URL = `${BASE_URL}/manufacturers/login`;
export const MANUFACTURER_HANDLE_LEVEL_URL = `${BASE_URL}/manufacturers/handleLevel`;
