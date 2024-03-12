import axios from "axios";
import { Register } from "./types";

export const loginUser = async (email: string, password: string) =>
  axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/login`, { email, password })
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });

export const createUser = (payload: Register) => {
  const axiosConfig = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_API_URL}/add-user`,
    data: payload,
  };

  console.log({ axiosConfig });

  return axios.request(axiosConfig);
};

export const logoutUser = async () =>
  axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/logout`)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
