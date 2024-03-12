import axios from "axios";


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ONBOARDING PROFILE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
export const uploadOnboardingPorfile = async (selectedFile: any) => {
    const formData = new FormData();
    formData.append("files", selectedFile)
    return await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/onboarding-profile`,
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