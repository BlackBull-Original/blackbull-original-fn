import axios from "axios";

// const DRIVER_BASE_URL = 'http://localhost:1800/api/d1'
// export const getAlldriversList = async()=>{
//     const response = await axios.get('http://localhost:1800/api/d1/add-driver')
// }

export const addDriver = async (data: any, token: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/d1/add-driver`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
      }
    );
    console.log({ response });
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export const getAllDrives = async (token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/d1/drivers`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getDriver = async (token: string, id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/d1//driver/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export const editDriver = async (token: string, id: string, data: any) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/d1/driver/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteDriver = async (token: string, id: string) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/d1/driver/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export const uploadSingleSingleDriverOnboardingDocuments = async (
  selectedFile: any
) => {
  const formData = new FormData();
  formData.append("files", selectedFile);
  return await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/d1/driver-onboarding-documents`,
      formData,
      {
        withCredentials: false,
      }
    )
    .then((response) => {
      console.log({ response });
      return response?.data;
    })
    .catch((error) => {
      console.log({ error });
      return error;
    });
};

export const uploadDriverProfile = async (selectedFile: any) => {
  const formData = new FormData();
  formData.append("files", selectedFile);
  return await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/d1/driver-profile`, formData, {
      withCredentials: false,
    })
    .then((response) => {
      console.log({ response });
      return response?.data;
    })
    .catch((error) => {
      console.log({ error });
      return error;
    });
};

export const uploadDriverLicenseDocuments = async (selectedFile: any) => {
  const formData = new FormData();
  formData.append("files", selectedFile);
  return await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/d1/driver-license-documents`,
      formData,
      {
        withCredentials: false,
      }
    )
    .then((response) => {
      console.log({ response });
      return response?.data;
    })
    .catch((error) => {
      console.log({ error });
      return error;
    });
};

// Bulk Upload

export const uploadDriverBulkDocuments = async (
  token: any,
  selectedFile: any
) => {
  // Create FormData object
  const formData = new FormData();
  formData.append("files", selectedFile);

  try {
    // Send formData in the POST request
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/d1/importDrivers`,
      formData,
      {
        withCredentials: false,
        headers: {
          "Content-Type": "multipart/form-data", // Use multipart/form-data for FormData
          Authorization: `Basic ${token}`,
        },
      }
    );

    console.log({ response });
    return response.data;
  } catch (error) {
    console.log({ error });
    return error;
  }
};
