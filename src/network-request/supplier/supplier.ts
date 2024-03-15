import axios from "axios";

// const supplierBaseUrl = "http://localhost:1800/api/s1";

export const addSupplierIntoSupplier = async (data: any, token: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/s1/add-supplier`,
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

// Uploading profile ..
export const uploadSupplierProfile = async (selectedFile: any) => {
  const formData = new FormData();
  formData.append("files", selectedFile);
  return await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/s1/supplier-profile`, formData, {
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

export const getAllSupplier = async (token: string) => {
  try {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/s1/suppliers`,
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

// ==================================================== Insurance Documents =====================================================
// export const uploadSupplierProductLiabilityDocuments = async (selectedFile: any) => {
//   const formData = new FormData();
//   formData.append("files", selectedFile)
//   return await axios
//     .post(`${process.env.NEXT_PUBLIC_API_URL}/s1/supplier-product-liability`,
//       formData,
//       {
//         withCredentials: false
//       }
//     ).
//     then((response) => {
//       console.log({ response })
//       return response?.data
//     }).catch((error) => {
//       console.log({ error })
//       return error
//     })
// }

// export const uploadSupplierPublicLiabilityDocuments = async (selectedFile: any) => {
//   const formData = new FormData();
//   formData.append("files", selectedFile)
//   return await axios
//     .post(`${process.env.NEXT_PUBLIC_API_URL}/s1/supplier-public-liability`,
//       formData,
//       {
//         withCredentials: false
//       }
//     ).
//     then((response) => {
//       console.log({ response })
//       return response?.data
//     }).catch((error) => {
//       console.log({ error })
//       return error
//     })
// }

// export const uploadSupplierWorkCoverDocuments = async (selectedFile: any) => {
//   const formData = new FormData();
//   formData.append("files", selectedFile)
//   return await axios
//     .post(`${process.env.NEXT_PUBLIC_API_URL}/s1/supplier-work-cover`,
//       formData,
//       {
//         withCredentials: false
//       }
//     ).
//     then((response) => {
//       console.log({ response })
//       return response?.data
//     }).catch((error) => {
//       console.log({ error })
//       return error
//     })
// }

// export const uploadSupplierMarineDocuments = async (selectedFile: any) => {
//   const formData = new FormData();
//   formData.append("files", selectedFile)
//   return await axios
//     .post(`${process.env.NEXT_PUBLIC_API_URL}/s1/supplier-marine`,
//       formData,
//       {
//         withCredentials: false
//       }
//     ).
//     then((response) => {
//       console.log({ response })
//       return response?.data
//     }).catch((error) => {
//       console.log({ error })
//       return error
//     })
// }

// export const uploadSupplierMarineAlcoholDocuments = async (selectedFile: any) => {
//   const formData = new FormData();
//   formData.append("files", selectedFile)
//   return await axios
//     .post(`${process.env.NEXT_PUBLIC_API_URL}/s1/supplier-marine-alcohol`,
//       formData,
//       {
//         withCredentials: false
//       }
//     ).
//     then((response) => {
//       console.log({ response })
//       return response?.data
//     }).catch((error) => {
//       console.log({ error })
//       return error
//     })
// }

// export const uploadSupplierCocDocuments = async (selectedFile: any) => {
//   const formData = new FormData();
//   formData.append("files", selectedFile)
//   return await axios
//     .post(`${process.env.NEXT_PUBLIC_API_URL}/s1/supplier-coc`,
//       formData,
//       {
//         withCredentials: false
//       }
//     ).
//     then((response) => {
//       console.log({ response })
//       return response?.data
//     }).catch((error) => {
//       console.log({ error })
//       return error
//     })
// }

const uploadDocument = async (endpoint: string, selectedFile: string) => {
  try {
    const formData = new FormData();
    formData.append("files", selectedFile);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/s1/${endpoint}`,
      formData,
      {
        withCredentials: false,
      }
    );
    console.log({ response });
    return response?.data;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

export const uploadSupplierAccreditationDocuments = async (
  selectedFile: string
) => {
  return uploadDocument("supplier-accreditation-douments", selectedFile);
};

export const uploadSupplierProductLiabilityDocuments = async (
  selectedFile: string
) => {
  return uploadDocument("supplier-product-liability", selectedFile);
};

export const uploadSupplierPublicLiabilityDocuments = async (
  selectedFile: string
) => {
  return uploadDocument("supplier-public-liability", selectedFile);
};

export const uploadSupplierWorkCoverDocuments = async (
  selectedFile: string
) => {
  return uploadDocument("supplier-work-cover", selectedFile);
};

export const uploadSupplierMarineDocuments = async (selectedFile: string) => {
  return uploadDocument("supplier-marine", selectedFile);
};

export const uploadSupplierMarineAlcoholDocuments = async (
  selectedFile: string
) => {
  return uploadDocument("supplier-marine-alcohol", selectedFile);
};

export const uploadSupplierCocDocuments = async (selectedFile: string) => {
  return uploadDocument("supplier-coc", selectedFile);
};

// ==================================================== Compliance Documents =====================================================
export const uploadSupplierComplianceDocuments = async (selectedFile: any) => {
  const formData = new FormData();
  formData.append("files", selectedFile);
  return await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/s1/supplier-compliance-documents`,
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

export const uploadSupplierBulkDocuments = async (
  token: any,
  selectedFile: any
) => {
  // Create FormData object
  const formData = new FormData();
  formData.append("files", selectedFile);

  try {
    // Send formData in the POST request
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/s1/importSuppliers`,
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
