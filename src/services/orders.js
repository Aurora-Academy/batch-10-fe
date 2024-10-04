import { axiosInstance } from "../utils/axiosInstance";
import { URLS } from "../constants";
import { getToken } from "../utils/session";

const headers = {
  access_token: getToken(),
};

const list = ({ limit, page, number, status }) => {
  return axiosInstance.get(
    `${URLS.ORDERS}?page=${page}&limit=${limit}&number=${number}&status=${status}`,
    { headers: { ...headers } }
  );
};

const create = (payload) => {
  return axiosInstance.post(URLS.ORDERS, payload, {
    headers: { ...headers },
  });
};

const getOrderByNum = (num) => {
  return axiosInstance.get(`${URLS.ORDERS}/${num}`, {
    headers: { ...headers },
  });
};

const removeOrder = (num) => {
  return axiosInstance.delete(`${URLS.ORDERS}/${num}`, {
    headers: { ...headers },
  });
};

const OrderServices = {
  create,
  list,
  getOrderByNum,
  removeOrder,
};

export default OrderServices;
