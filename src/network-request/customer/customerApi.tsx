import axios from "axios"

// const customerBaseUrl = "http://localhost:1800/api/c1"


export const addCustomer = async (data: any, token: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/c1/add-customer`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${token}`
            }
        })
        return response
    } catch (error) {
        console.log('error', error)
        return error
    }
}

export const uploadCustomerProfile = async (selectedFile: any) => {
    const formData = new FormData();
    formData.append("files", selectedFile)
    return await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/c1/customer-profile`,
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

export const uploadCustomerContractDocuments = async (selectedFile: any) => {
    const formData = new FormData();
    formData.append("files", selectedFile)
    return await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/c1/customer-contractual-documents`,
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

export const getAllCustomer = async (token: string) => {
    try {
      console.log(process.env.NEXT_PUBLIC_API_URL)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/c1/customers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  // Bulk Upload

export const uploadCustomerBulkDocuments = async (
    token: any,
    selectedFile: any
  ) => {
    // Create FormData object
    const formData = new FormData();
    formData.append("files", selectedFile);
  
    try {
      // Send formData in the POST request
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/c1/importCustomers`,
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