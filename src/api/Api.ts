import { axiosClient } from "./config/axiosClient";

export const Api = {
  getData: async () => {
    try {
      const response = await axiosClient.get(`posts`);
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
