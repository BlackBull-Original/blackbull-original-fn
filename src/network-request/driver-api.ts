import axios from "./axios";
import { DriverDetails } from "./types";
// export const addDriver = async (payload: any) =>
//   axios
//     .post("/d1/add-driver", { payload })
//     .then((response: any) => response.data)
//     .catch((error: any) => {
//       throw error;
//     });

export const addDriver = (payload: DriverDetails, authToken: string) => {
    const axiosConfig = {
      method: "post",
      url: "/d1/add-driver",
      data: payload,
      headers: {
        Authorization: `Basic ${authToken}`,
        // Add other headers if needed
      },
    };
  
    console.log({ axiosConfig });
  
    return axios.request(axiosConfig);
  };
  