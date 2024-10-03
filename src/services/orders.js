import { axiosInstance } from "../utils/axiosInstance";
import { URLS } from "../constants";
import { getToken } from "../utils/session";

const headers = {
  access_token: getToken(),
};

const create = (payload) => {
  return axiosInstance.post(URLS.ORDERS, payload, {
    headers: { ...headers },
  });
};

const OrderServices = {
  create,
};

export default OrderServices;
