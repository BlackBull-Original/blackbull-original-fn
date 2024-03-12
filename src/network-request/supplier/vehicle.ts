import axios from "axios";

// const vehicleBaseUrl = "http://localhost:1800/api/s1/v1";

export const addVehicleIntoSupplier = async (data: any, token: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/s1/v1/supplier-vehicle`,
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
    return error;
  }
};


export const uploadSuppliervehicleDocuments = async (selectedFile: any) => {
  const formData = new FormData();
  formData.append("files", selectedFile)
  return await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/s1/v1/supplier-vehicle-documents`,
      formData,
      {
        withCredentials: false
      }
    ).
    then((response) => {
      console.log({ response })
      return response?.data
    }).catch((error) => {
      console.log({ error })
      return error
    })
}

export const uploadSupplierVehicleRegoDocuments = async (selectedFile: any) => {
  const formData = new FormData();
  formData.append("files", selectedFile)
  return await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/s1/v1/supplier-vehicle-rego-documents`,
      formData,
      {
        withCredentials: false
      }
    ).
    then((response) => {
      console.log({ response })
      return response?.data
    }).catch((error) => {
      console.log({ error })
      return error
    })
}