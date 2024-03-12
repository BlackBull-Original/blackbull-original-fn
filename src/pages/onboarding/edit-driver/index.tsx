import { useEffect, useState } from "react";
import DropDownMap from "../../../../components/DropDownMap";

import Maindatefield from "../../../../components/Maindatefield";
import Maininputfield from "../../../../components/Maininputfield";
import Progressbar from "../../../../components/Progressbar";

import Image from "next/image";
import Checkbox from "../../../../components/Checkbox";
import Button from "../../../../components/Button";
import DateWithoutDropdown from "../../../../components/DateWithoutDropdown";
import FileUpload from "../../../../components/FileUpload";
import ImageUpload from "../../../../components/imageUpload/ImageUpload";
import { addDriver, editDriver, getDriver } from "@/network-request/driver/driverApi";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const EditDriver = () => {
  const [selectedData, setSelectedData] = useState("");
  const token = getCookie("token");
  const router = useRouter();
  const id = router.query.id;

  const [driverDetails, setDriverDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    mobile: "",
    nationality: "",

    currentAddress: {
      houseNumber: undefined,
      street: "",
      suburb: "",
      state: "",
      country: "",
      pincode: "",
    },
    permanentAddress: {
      houseNumber: undefined,
      street: "",
      suburb: "",
      state: "",
      country: "",
      pincode: "",
    },

    emergencyContactInformation: {
      contactName: "",
      contactNumber: "",
      relationship: "",
    },

    licenseDetails: {
      licenseNumber: "",
      licenseCardNumber: "",
      licenceType: "",
      state: "",
      dateOfIssue: "",
      expiryDate: "",
      daysLeftForRenewal: "",
    },
    employmentHistory: {
      previousEmployer: "",
      yearsOfExperience: "",
      reasonOfLeaving: "",

      companyName: "",
      referenceContactName: "",
      referenceEmailId: "",
      referenceContactNumber: "",
    },
    specialDrivingLicence: {
      specialDrivingLicence: "",
    },
    onboardingDocuments: {
      documentType: "ggweg",
      attachFiles: "gwegweg",
      uploadedDocuments: "ewgwegw",
      dateOfUpload: "gwegwg",
    },
    visaStatus: {
      type: "Work",
      uploadDate: "2023-01-15",
    },
    driverLicenseFront: {
      type: "Front",
      uploadDate: "2023-02-01",
    },
    driverLicenseBack: {
      type: "Back",
      uploadDate: "2023-02-05",
    },
    licenseHistory: {
      type: "History",
      uploadDate: "2023-03-01",
    },
    policeVerification: {
      type: "Verification",
      uploadDate: "2023-03-15",
    },
    passportFront: {
      type: "Front",
      uploadDate: "2023-04-01",
    },
    passportBack: {
      type: "Back",
      uploadDate: "2023-04-05",
    },
    healthInsurance: {
      type: "Insurance",
      uploadDate: "2023-05-01",
    },
    driverCertificate: {
      type: "Certificate",
      uploadDate: "2023-05-15",
    },
    fitness: {
      type: "Fitness",
      uploadDate: "2023-06-01",
    },
    drugTest: {
      type: "Drug Test",
      uploadDate: "2023-06-15",
    },
  });



const getDriverAndSettoState= async ()=>{

  const response = await getDriver(token as string, id as string);
 
  if (response?.status == 200) {
    const data = response?.data;

    setDriverDetails({
      ...driverDetails,
      firstName: data?.data?.firstName,
      middleName: data?.data?.middleName,
      lastName: data?.data?.lastName,
      dateOfBirth: data?.data?.dateOfBirth,
      email: data?.data?.email, 
      mobile: data?.data?.mobile,
      currentAddress: {
        houseNumber: data?.data?.currentAddress?.houseNumber,
        street: data?.data?.currentAddress?.street,
        suburb: data?.data?.currentAddress?.suburb,
        state: data?.data?.currentAddress?.state,
        country: data?.data?.currentAddress?.country,
        pincode: data?.data?.currentAddress?.pincode,
      }, 
      permanentAddress:{
        houseNumber: data?.data?.permanentAddress?.houseNumber,
        street: data?.data?.permanentAddress?.street,
        suburb: data?.data?.permanentAddress?.suburb,
        state: data?.data?.permanentAddress?.state,
        country: data?.data?.permanentAddress?.country,
        pincode: data?.data?.permanentAddress?.pincode,
      },  
      emergencyContactInformation:{
        contactName: data?.data?.emergencyContactInformation?.contactName,
        contactNumber: data?.data?.emergencyContactInformation?.contactNumber,
        relationship: data?.data?.emergencyContactInformation?.relationship,
      },
      employmentHistory:{
        previousEmployer: data?.data?.employmentHistory?.[0]?.previousEmployer,
        yearsOfExperience: data?.data?.employmentHistory?.[0]?.yearsOfExperience,
        reasonOfLeaving: data?.data?.employmentHistory?.[0]?.reasonOfLeaving,

        companyName: data?.data?.employmentHistory?.[0]?.companyName,
        referenceContactName: data?.data?.employmentHistory?.[0]?.referenceContactName,
        referenceEmailId: data?.data?.employmentHistory?.[0]?.referenceEmailId,
        referenceContactNumber: data?.data?.employmentHistory?.[0]?.referenceContactNumber,
      },  
      licenseDetails:{
        licenseNumber: data?.data?.licenseDetails?.licenseNumber,
        licenseCardNumber: data?.data?.licenseDetails?.licenseCardNumber,
        licenceType: data?.data?.licenseDetails?.licenceType,
        state: data?.data?.licenseDetails?.state,
        dateOfIssue: data?.data?.licenseDetails?.dateOfIssue,
        expiryDate: data?.data?.licenseDetails?.expiryDate,
        daysLeftForRenewal: data?.data?.licenseDetails?.daysLeftForRenewal,
      },
      
      
      
    })
    
   
    
  } 
}


useEffect(()=>{
  getDriverAndSettoState()
}, [])


  const handleSubmit = async () => {

    const response = await editDriver(token as string, id as string, driverDetails);
    if (response?.status == 200) {
      console.log(response, "response");
      router.push("/onboarding/driver-list");
      alert("Driver updated successfully");
    } else {
      alert("Something went wrong");
    }
    
  };

  return (
    <>
      <div className="flex bg-[#E9EFFF]">
        <div className="ml-[316px] w-full mt-4">
          <div className="bg-white mr-4 flex justify-between items-center rounded-md">
            <h2 className=" w-full p-4 rounded-md font-bold">Edit Driver</h2>
            <div className="h-8 w-8 flex justify-center cursor-pointer text-2xl items-center bg-blueGrey-100 rounded-full mr-4">
              <span className="mt-[-2px] ml-[2px] text-[#292D32] rotate-45">
                +
              </span>
            </div>
          </div>
          <div className="bg-white mr-4 px-4 rounded-md mt-4 p-4">
            <div className="relative w-fit">
              <Image
                src="/driverImage.svg"
                alt="driver"
                width={100}
                height={100}
              />
              <span className="w-6 h-6 rounded-full bg-accent3 block text-black flex justify-center items-end text-xl absolute right-2 bottom-2">
                +
              </span>
            </div>
            <div>
              <h3 className=" w-full my-4 rounded-md font-semibold text-black">
                Vehicle Information
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <Maininputfield
                  label="First Name"
                  value={driverDetails?.firstName}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full"
                />
                <Maininputfield
                  label="Middle Name"
                  value={driverDetails?.middleName}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      middleName: e.target.value,
                    })
                  }
                  className="w-full"
                />
                <Maininputfield
                  label="Last Name"
                  value={driverDetails?.lastName}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      lastName: e.target.value,
                    })
                  }
                  className="w-full"
                />

                <Maindatefield
                  label="DOB"
                  value={driverDetails?.dateOfBirth}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      dateOfBirth: e.target.value,
                    })
                  }
                  className="w-full"
                  va
                />

                <Maininputfield
                  label="Email"
                  value={driverDetails?.email}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      email: e.target.value,
                    })
                  }
                  className="w-full"
                />
                <Maininputfield
                  label="Mobile"
                  value={driverDetails?.mobile}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      mobile: e.target.value,
                    })
                  }
                  className="w-full"
                />

                {/* <Maininputfield
                  label="Nationality"
                  value={driverDetails?.nationality}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      nationality: e.target.value,
                    })
                  }
                  className="w-full"
                /> */}

                {/* <FileUpload /> */}
              </div>
            </div>

            <div className="mb-4 mt-8">
              <h3 className=" w-full mb-4 rounded-md font-semibold text-black">
                Address Information
              </h3>
              <h4 className="text-sm font-semibold mb-4 text-black">
                Current Address
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <Maininputfield
                  label="House Number"
                  value={driverDetails?.currentAddress?.houseNumber}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      currentAddress: {
                        ...driverDetails?.currentAddress,
                        houseNumber: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />
                <Maininputfield
                  label="Street"
                  value={driverDetails?.currentAddress?.street}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      currentAddress: {
                        ...driverDetails?.currentAddress,
                        street: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />
                <Maininputfield
                  label="Suburb"
                  value={driverDetails?.currentAddress?.suburb}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      currentAddress: {
                        ...driverDetails?.currentAddress,
                        suburb: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />
                <DropDownMap
                  label="State"
                  mapOption={stateCollection}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      currentAddress: {
                        ...driverDetails.currentAddress,
                        state: e.target.value,
                      },
                    })
                  }
                  value={driverDetails?.currentAddress?.state}
                />
                <DropDownMap
                  label="Country"
                  mapOption={countryCollection}
                  value={driverDetails?.currentAddress?.country}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      currentAddress: {
                        ...driverDetails.currentAddress,
                        country: e.target.value,
                      },
                    })
                  }
                />
                <Maininputfield
                  label="Post Code"
                  value={driverDetails?.currentAddress?.pincode}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      currentAddress: {
                        ...driverDetails.currentAddress,
                        pincode: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />
                {/* <DropDownMap
                  label="Vehicle Type"
                  mapOption={vehicleTypeColleciton}
                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                /> */}

                {/* <FileUpload /> */}
              </div>
            </div>
            {/* <Checkbox content="Same as above" /> */}

            <div className="mb-4 mt-8">
              <h4 className="text-sm font-semibold mb-4 text-blueGrey-900">
                {" "}
                Permanent Address
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <Maininputfield
                  label="House Number"
                  value={driverDetails?.permanentAddress?.houseNumber}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      permanentAddress: {
                        ...driverDetails.permanentAddress,
                        houseNumber: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />
                <Maininputfield
                  label="Street"
                  value={driverDetails?.permanentAddress?.street}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      permanentAddress: {
                        ...driverDetails.permanentAddress,
                        street: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />
                <Maininputfield
                  label="Suburb"
                  value={driverDetails?.permanentAddress?.suburb}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      permanentAddress: {
                        ...driverDetails.permanentAddress,
                        suburb: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />
                <DropDownMap
                  label="State"
                  mapOption={stateCollection}
                  // selectedData={selectedData}
                  // setSelectedData={setSelectedData}
                  value={driverDetails?.permanentAddress?.state}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      permanentAddress: {
                        ...driverDetails.permanentAddress,
                        state: e.target.value,
                      },
                    })
                  }
                />
                <DropDownMap
                  label="Country"
                  mapOption={countryCollection}
                  // selectedData={selectedData}
                  // setSelectedData={setSelectedData}
                  value={driverDetails?.permanentAddress?.country}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      permanentAddress: {
                        ...driverDetails.permanentAddress,
                        country: e.target.value,
                      },
                    })
                  }
                />
                <Maininputfield
                  label="Post Code"
                  value={driverDetails?.permanentAddress?.pincode}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      permanentAddress: {
                        ...driverDetails.permanentAddress,
                        pincode: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />
              </div>
            </div>

            <div className="mb-4 mt-8">
              <h3 className="w-full mb-4 rounded-md font-semibold text-black">
                {" "}
                Emergency Contact Information
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <Maininputfield
                  label="Contact Name"
                  value={driverDetails?.emergencyContactInformation?.contactName}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      emergencyContactInformation: {
                        ...driverDetails.emergencyContactInformation,
                        contactName: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />
                <Maininputfield
                  label="Contact Number"
                  value={
                    driverDetails?.emergencyContactInformation?.contactNumber
                  }
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      emergencyContactInformation: {
                        ...driverDetails.emergencyContactInformation,
                        contactNumber: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />
                <Maininputfield
                  label="Relationship"
                  value={driverDetails?.emergencyContactInformation?.relationship}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      emergencyContactInformation: {
                        ...driverDetails.emergencyContactInformation,
                        relationship: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />
              </div>
            </div>
            <div className="mb-4 mt-8">
              <h3 className="w-full mb-4 rounded-md font-semibold text-black">
                {" "}
                Employment History
              </h3>
              <h4 className="text-sm font-semibold mb-4 text-black">
                Experience
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <Maininputfield
                  label="Pervious Employer"
                  value={driverDetails?.employmentHistory?.previousEmployer}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      employmentHistory: {
                        ...driverDetails.employmentHistory,
                        previousEmployer: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />
                <Maininputfield
                  label="Years Of Experience"
                  value={driverDetails?.employmentHistory?.yearsOfExperience}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      employmentHistory: {
                        ...driverDetails.employmentHistory,
                        yearsOfExperience: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />
                <Maininputfield
                  label="Reason for leaving"
                  value={driverDetails?.employmentHistory?.reasonOfLeaving}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      employmentHistory: {
                        ...driverDetails.employmentHistory,
                        reasonOfLeaving: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />
              </div>

              {/* commenting out for temporary as backend is not accepting referance informtion objext*/}
              <div className="mb-4 mt-8">
                <h4 className="text-sm font-semibold mb-4 text-blueGrey-900">
                  Reference Information
                </h4>

                <div className="grid grid-cols-3 gap-4">
                  <Maininputfield
                    label="Company Name"
                    value={driverDetails?.employmentHistory?.companyName}
                    onChange={(e: any) =>
                      setDriverDetails({
                        ...driverDetails,
                        employmentHistory: {
                          ...driverDetails.employmentHistory,
                          companyName: e.target.value,
                        },
                      })
                    }
                    className="w-full"
                  />
                  <Maininputfield
                    label="Reference (Contact Name)"
                    value={driverDetails?.employmentHistory?.referenceContactName}
                    onChange={(e: any) =>
                      setDriverDetails({
                        ...driverDetails,
                        employmentHistory: {
                          ...driverDetails.employmentHistory,
                          referenceContactName: e.target.value,
                        },
                      })
                    }
                    className="w-full"
                  />
                  <Maininputfield
                    label="Reference (Email ID)"
                    value={driverDetails?.employmentHistory?.referenceEmailId}
                    onChange={(e: any) =>
                      setDriverDetails({
                        ...driverDetails,
                        employmentHistory: {
                          ...driverDetails.employmentHistory,
                          referenceEmailId: e.target.value,
                        },
                      })
                    }
                    className="w-full"
                  />
                  <Maininputfield
                    label="Reference (Contact Number)"
                    value={
                      driverDetails?.employmentHistory?.referenceContactNumber
                    }
                    onChange={(e: any) =>
                      setDriverDetails({
                        ...driverDetails,
                        employmentHistory: {
                          ...driverDetails.employmentHistory,
                          referenceContactNumber: e.target.value,
                        },
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            {/* <div className="mb-8 mt-8 flex justify-end">
              <Button
                text="Add More Experiences"
                className="bg-accent3 px-4 !w-fit"
              />
            </div> */}
            <div className="mb-4 mt-8">
              <h3 className="w-full mb-4 rounded-md font-semibold text-black">
                {" "}
                License Details
              </h3>

              <div className="grid grid-cols-3 gap-4">
                <Maininputfield
                  label="Licence Number"
                  value={driverDetails?.licenseDetails?.licenseNumber}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      licenseDetails: {
                        ...driverDetails.licenseDetails,
                        licenseNumber: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />
                <Maininputfield
                  label="Licence Card Number"
                  value={driverDetails?.licenseDetails?.licenseCardNumber}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      licenseDetails: {
                        ...driverDetails.licenseDetails,
                        licenseCardNumber: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />
                <DropDownMap
                  label="Licence Type"
                  mapOption={licenceTypes}
                  // selectedData={selectedData}
                  // setSelectedData={setSelectedData}
                  value={driverDetails?.licenseDetails?.licenceType}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      licenseDetails: {
                        ...driverDetails.licenseDetails,
                        licenceType: e.target.value,
                      },
                    })
                  }
                />
                <DropDownMap
                  label="State of Issue"
                  mapOption={stateCollection}
                  // selectedData={selectedData}
                  // setSelectedData={setSelectedData}
                  value={driverDetails?.licenseDetails?.state}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      licenseDetails: {
                        ...driverDetails.licenseDetails,
                        state: e.target.value,
                      },
                    })
                  }
                />
                <DateWithoutDropdown
                  label="Date Of Issue "
                  value={driverDetails?.licenseDetails?.dateOfIssue}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      licenseDetails: {
                        ...driverDetails.licenseDetails,
                        dateOfIssue: e.target.value,
                      },
                    })
                  }
                />

                <DateWithoutDropdown
                  label="Expiry Date "
                  value={driverDetails?.licenseDetails?.expiryDate}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      licenseDetails: {
                        ...driverDetails.licenseDetails,
                        expiryDate: e.target.value,
                      },
                    })
                  }
                />

                <Maininputfield
                  label="Days left for renewal"
                  value={driverDetails?.licenseDetails?.daysLeftForRenewal}
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      licenseDetails: {
                        ...driverDetails.licenseDetails,
                        daysLeftForRenewal: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />
                {/* <FileUpload file="Choose License Document " /> */}
              </div>
            </div>

            {/* <div className="mb-4 mt-8">
              <h3 className="w-full mb-4 rounded-md font-semibold text-black">
                {" "}
                Employment History
              </h3>

              <div className="grid grid-cols-3 gap-4">
                <Maininputfield
                  label="Pervious Employer"
                  value={driverDetails.employmentHistory.perviousEmployer}
                  onChange={(e:any)=>setDriverDetails({...driverDetails, employmentHistory: {...driverDetails.employmentHistory, perviousEmployer: e.target.value}})}
                  className="w-full"
                />
                <Maininputfield
                  label="Years Of Experience"
                  value={driverDetails.employmentHistory.yearsOfExperience}
                  onChange={(e:any)=>setDriverDetails({...driverDetails, employmentHistory: {...driverDetails.employmentHistory, yearsOfExperience: e.target.value}})}  
                  className="w-full"
                />

                <Maininputfield
                  label="Reason for leaving"
                  value={driverDetails.employmentHistory.reasonForLeaving}
                  onChange={(e:any)=>setDriverDetails({...driverDetails, employmentHistory: {...driverDetails.employmentHistory, reasonForLeaving: e.target.value}})}
                  className="w-full"
                />
              </div>
            </div> */}

            <div className="mb-4 mt-8">
              <h3 className="w-full mb-4 rounded-md font-semibold text-black">
                {" "}
                Special Driving Licence
              </h3>

              <div className="grid grid-cols-3 gap-4">
                <DropDownMap
                  label="Special Driving Licence"
                  // selectedData={selectedData}
                  // setSelectedData={setSelectedData}
                  value={
                    driverDetails?.specialDrivingLicence?.specialDrivingLicence
                  }
                  onChange={(e: any) =>
                    setDriverDetails({
                      ...driverDetails,
                      specialDrivingLicence: {
                        ...driverDetails.specialDrivingLicence,
                        specialDrivingLicence: e.target.value,
                      },
                    })
                  }
                  mapOption={drivingLicenceCollection}
                />
              </div>
            </div>
          </div>
          {/* <div className="bg-white mr-4 px-4 rounded-md mt-4 p-4">
            <div className="mb-4 mt-8">
              <h3 className="w-full mb-4 rounded-md font-semibold">
                {" "}
                Onboarding Documents
              </h3>

              <div className="grid grid-cols-5 bg-table-header p-4 rounded-md text-center mb-2 ">
                {documentCollectionHeading?.map((value, index) => {
                  return (
                    <>
                      <h4 key={index} className="font-semibold text-sm">
                        {value.heading}
                      </h4>
                    </>
                  );
                })}
              </div>
              <div className="grid grid-cols-5 p-4 rounded-md text-center items-center">
                {documentCollectionData.map((value, index) => {
                  return (
                    <>
                      <div className="mb-6">{value.documentType}</div>
                      <div className="text-center ">
                        <Button
                          text="Upload"
                          className="!w-fit m-auto bg-accent3 px-6 rounded-md mb-6 py-[4px]"
                        />
                      </div>
                      <div className="mb-6">{value.uploadedDocument}</div>
                      <div className="mb-6">{value.uploadDate}</div>
                      <div className="mb-6 flex gap-2 justify-center">
                        <Image
                          src={"/edit.svg"}
                          alt="svg"
                          width={24}
                          height={24}
                        />
                        <Image
                          src={"/trash.svg"}
                          alt="svg"
                          width={24}
                          height={24}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div> */}
          <div className="mb-20 mr-4">
            <ImageUpload handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};
export default EditDriver;
const stateCollection = [
  {
    value: "Victoria",
  },
  {
    value: "items1",
  },
  {
    value: "items2",
  },
  {
    value: "items3",
  },
  {
    value: "items4",
  },
  {
    value: "items5",
  },
];
const countryCollection = [
  {
    value: "Australia",
  },
  {
    value: "item1",
  },
  {
    value: "item2",
  },
  {
    value: "item3",
  },
  {
    value: "item1",
  },
  {
    value: "item1",
  },
];
const licenceTypes = [
  {
    value: "HR (Heavy Rigid Licence)",
  },
  {
    value: "item1",
  },
  {
    value: "item2",
  },
];
const drivingLicenceCollection = [
  {
    value: "Dangerous Goods",
  },

  {
    value: "item1",
  },
  {
    value: "item2",
  },
];
const documentCollectionHeading = [
  {
    heading: "Document type",
  },
  {
    heading: "Attach files",
  },
  {
    heading: "Uploaded Documents",
  },
  {
    heading: "Date of upload",
  },
];
const documentCollectionData = [
  {
    documentType: "Visa Status",
    uploadedDocument: "visa-status.pdf",
    uploadDate: "20/12/2023",
  },
  {
    documentType: "Driver License (Front) ",
    uploadedDocument: "-",
    uploadDate: "-",
  },
  {
    documentType: "Driver License (Back) ",
    uploadedDocument: "-",
    uploadDate: "-",
  },
  {
    documentType: "License History",
    uploadedDocument: "-",
    uploadDate: "-",
  },
  {
    documentType: "Police Verification",
    uploadedDocument: "police-verification.pdf",
    uploadDate: "20/12/2023",
  },
  {
    documentType: "Passport (Front)",
    uploadedDocument: "-",
    uploadDate: "-",
  },
  {
    documentType: "Passport (Back)",
    uploadedDocument: "-",
    uploadDate: "-",
  },
  {
    documentType: "Health Insurance",
    uploadedDocument: "-",
    uploadDate: "-",
  },
  {
    documentType: "Driver Certificate",
    uploadedDocument: "-",
    uploadDate: "-",
  },
  {
    documentType: "Fitness",
    uploadedDocument: "-",
    uploadDate: "-",
  },
  {
    documentType: "Drug Test",
    uploadedDocument: "-",
    uploadDate: "-",
  },
];
