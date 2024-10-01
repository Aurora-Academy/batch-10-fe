import { axiosInstance } from "../utils/axiosInstance";
import { URLS } from "../constants";
import { getToken } from "../utils/session";

const headers = {
  access_token: getToken(),
};

const list = ({ limit, page, name, status }) => {
  return axiosInstance.get(
    `${URLS.ROOMS}?page=${page}&limit=${limit}&name=${name}&status=${status}`,
    { headers: { ...headers } }
  );
};

const create = (payload) => {
  return axiosInstance.post(URLS.ROOMS, payload, {
    headers: { ...headers, "Content-Type": "multipart/form-data" },
  });
};

const getRoomById = (id) => {
  return axiosInstance.get(`${URLS.ROOMS}/${id}`, { headers: { ...headers } });
};

const updateRoom = (id, payload) => {
  return axiosInstance.put(`${URLS.ROOMS}/${id}`, payload, {
    headers: { ...headers },
  });
};

const updateRoomStatus = (id, payload) => {
  return axiosInstance.patch(`${URLS.ROOMS}/${id}`, payload, {
    headers: { ...headers },
  });
};

const removeRoom = (name) => {
  return axiosInstance.delete(`${URLS.ROOMS}/${name}`, {
    headers: { ...headers },
  });
};

const RoomServices = {
  list,
  create,
  getRoomById,
  updateRoom,
  updateRoomStatus,
  removeRoom,
};

export default RoomServices;
