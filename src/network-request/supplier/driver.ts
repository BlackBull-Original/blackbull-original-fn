import axios from "axios";

// const supplierDriverBaseUrl = "http://localhost:1800/api/s1/d1";

export const addSupplierDriver = async (data: any, token: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/s1/d1/supplier-driver`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${token}`
            }
        })
        return response
    } catch (error: any) {
        console.log({ error })
        return error;
    }
}

export const uploadSupplierDriverProfile = async (selectedFile: any) => {
    const formData = new FormData();
    formData.append("files", selectedFile)
    return await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/s1/d1/supplier-driver-profile`,
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

export const uploadSupplierDriverlicenseDocuments = async (selectedFile: any) => {
    const formData = new FormData();
    formData.append("files", selectedFile)
    return await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/s1/d1/supplier-driver-license-documents`,
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

export const uploadSupplierDriverOnboardingDocuments = async (selectedFile: any) => {
    const formData = new FormData();
    formData.append("files", selectedFile)
    return await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/s1/d1/supplier-driver-onboarding-documents`,
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