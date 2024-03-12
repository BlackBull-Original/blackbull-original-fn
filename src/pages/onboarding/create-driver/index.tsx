import { useEffect, useRef, useState } from "react";
import DropDownMap from "../../../../components/DropDownMap";
import Maindatefield from "../../../../components/Maindatefield";
import Maininputfield from "../../../../components/Maininputfield";
import Progressbar from "../../../../components/Progressbar";
import Image from "next/image";
import Button from "../../../../components/Button";
import FileUpload from "../../../../components/FileUpload";
import ImageUpload from "../../../../components/imageUpload/ImageUpload";
import {
  addDriver,
  uploadDriverLicenseDocuments,
  uploadDriverProfile,
  uploadSingleSingleDriverOnboardingDocuments,
} from "@/network-request/driver/driverApi";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { formatDate, formattedDate } from "@/utils";
// import { correctDriverStateName } from "../utility/utilityMethod";

const correctDriverStateName = (stateName: string): string => {
  const nameMapping: { [key: string]: string } = {
    firstName: "First Name",
    middleName: "Middle Name",
    lastName: "Last Name",
    dateOfBirth: "Date of Birth",
    email: "Email",
    mobile: "Mobile",
    nationality: "Nationality",
    currentAddress: "Current Address",
    permanentAddress: "Permanent Address",
    emergencyContactInformation: "Emergency Contact Information",
    licenseDetails: "License Details",
    employmentHistory: "Employment History",
    specialDrivingLicence: "Special Driving Licence",
    onboardingDocuments: "Onboarding Documents",
    visaStatus: "Visa Status",
    driverLicenseFront: "Driver License Front",
    driverLicenseBack: "Driver License Back",
    licenseHistory: "License History",
    policeVerification: "Police Verification",
    passportFront: "Passport Front",
    passportBack: "Passport Back",
    healthInsurance: "Health Insurance",
    driverCertificate: "Driver Certificate",
    fitness: "Fitness",
    drugTest: "Drug Test",
    houseNumber: "House Number",
    street: "Street",
    suburb: "Suburb",
    state: "State",
    country: "Country",
    pincode: "Pincode",
    contactName: "Contact Name",
    contactNumber: "Contact Number",
    relationship: "Relationship",
    licenseNumber: "License Number",
    licenseCardNumber: "License Card Number",
    licenceType: "Licence Type",
    dateOfIssue: "Date Of Issue",
    expiryDate: "Expiry Date",
    daysLeftForRenewal: "Days Left For Renewal",
    previousEmployer: "Pervious Employer",
    yearsOfExperience: "Years Of Experience",
    reasonOfLeaving: "Reason For Leaving",
    companyName: "Company Name",
    referenceContactName: "Reference Contact Name",
    referenceEmailId: "Reference Email Id",
    referenceContactNumber: "Reference Contact Number",
  };

  return nameMapping[stateName] || stateName;
};

const CreateDriver = () => {
  const token = getCookie("token");
  const router = useRouter();

  const [driverDetails, setDriverDetails] = useState<any>({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    avatar: "",
    email: "",
    mobile: "",
    nationality: "",

    currentAddress: {
      houseNumber: "",
      street: "",
      suburb: "",
      state: "",
      country: "Australia",
      pincode: "",
    },
    permanentAddress: {
      houseNumber: "",
      street: "",
      suburb: "",
      state: "",
      country: "Australia",
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
      documents: "",
    },
    employmentHistory: [],
    specialDrivingLicence: {
      specialDrivingLicence: "",
    },
    onboardingDocuments: [],
  });

  const [error, setError] = useState<any>({
    firstNameError: "",
    middleNameError: "",
    lastNameError: "",
    dateOfBirthError: "",
    emailError: "",
    mobileError: "",
    nationalityError: "",

    currentAddressError: {
      houseNumber: undefined,
      street: "",
      suburb: "",
      state: "",
      country: "",
      pincode: "",
    },

    permanentAddressError: {
      houseNumber: undefined,
      street: "",
      suburb: "",
      state: "",
      country: "",
      pincode: "",
    },

    emergencyContactInformationError: {
      contactName: "",
      contactNumber: "",
      relationship: "",
    },

    licenseDetailsError: {
      licenseNumber: "",
      licenseCardNumber: "",
      licenceType: "",
      state: "",
      dateOfIssue: "",
      expiryDate: "",
      daysLeftForRenewal: "",
    },
    specialDrivingLicenceError: {
      specialDrivingLicence: "",
    },
  });

  const [documentDataCollection, setDocumentDataCollection] = useState<any>([]);

  const [uploadStatus, setUploadStatus] = useState<{ [id: number]: boolean }>(
    {}
  );
  const [urls, setUrls] = useState<string[]>([]);
  const [showUploadMessage, setShowUploadMessage] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState<
    { id: number; file: File; currentDate: Date | null }[]
  >([]);

  const [addMoreExperience, setAddMoreExperience] = React.useState<Array<any>>(
    []
  );

  const [progress, setProgress] = useState(0);
  const [progressOfState, setProgressOfState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    mobile: "",
    nationality: "",
    currentAddressHouseNumber: "",
    currentAddressStreet: "",
    currentAddressSuburb: "",
    currentAddressState: "",
    currentAddressCountry: "Australia",
    currentAddressPincode: "",
    permanentAddressHouseNumber: "",
    permanentAddressStreet: "",
    permanentAddressSuburb: "",
    permanentAddressState: "",
    permanentAddressCountry: "Australia",
    permanentAddressPincode: "",
    emergencyContactInformationContactName: "",
    emergencyContactInformationContactNumber: "",
    emergencyContactInformationRelationship: "",
    licenseDetailsLicenseNumber: "",
    licenseDetailsLicenseCardNumber: "",
    licenseDetailsLicenceType: "",
    licenseDetailsState: "",
    licenseDetailsDateOfIssue: "",
    licenseDetailsExpiryDate: "",
    licenseDetailsDaysLeftForRenewal: "",
    employmentHistoryPreviousEmployer: "",
    employmentHistoryYearsOfExperience: "",
    employmentHistoryReasonOfLeaving: "",
    employmentHistoryCompanyName: "",
    employmentHistoryReferenceContactName: "",
    employmentHistoryReferenceEmailId: "",
    employmentHistoryReferenceContactNumber: "",
    specialDrivingLicence: "",
  });

  useEffect(() => {
    setProgressOfState({
      ...progressOfState,
      firstName: driverDetails?.firstName,
      middleName: driverDetails?.middleName,
      lastName: driverDetails?.lastName,
      dateOfBirth: driverDetails?.dateOfBirth,
      email: driverDetails?.email,
      mobile: driverDetails?.mobile,
      nationality: driverDetails?.nationality,
      currentAddressHouseNumber: driverDetails?.currentAddress?.houseNumber,
      currentAddressStreet: driverDetails?.currentAddress?.street,
      currentAddressSuburb: driverDetails?.currentAddress?.suburb,
      currentAddressState: driverDetails?.currentAddress?.state,
      currentAddressCountry: driverDetails?.currentAddress?.country,
      currentAddressPincode: driverDetails?.currentAddress?.pincode,
      permanentAddressHouseNumber: driverDetails?.permanentAddress?.houseNumber,
      permanentAddressStreet: driverDetails?.permanentAddress?.street,
      permanentAddressSuburb: driverDetails?.permanentAddress?.suburb,
      permanentAddressState: driverDetails?.permanentAddress?.state,
      permanentAddressCountry: driverDetails?.permanentAddress?.country,
      permanentAddressPincode: driverDetails?.permanentAddress?.pincode,
      emergencyContactInformationContactName:
        driverDetails?.emergencyContactInformation?.contactName,
      emergencyContactInformationContactNumber:
        driverDetails?.emergencyContactInformation?.contactNumber,
      emergencyContactInformationRelationship:
        driverDetails?.emergencyContactInformation?.relationship,
      licenseDetailsLicenseNumber: driverDetails.licenseDetails.licenseNumber,
      licenseDetailsLicenseCardNumber:
        driverDetails.licenseDetails.licenseCardNumber,
      licenseDetailsLicenceType: driverDetails.licenseDetails.licenceType,
      licenseDetailsState: driverDetails.licenseDetails.state,
      licenseDetailsDateOfIssue: driverDetails.licenseDetails.dateOfIssue,
      licenseDetailsExpiryDate: driverDetails.licenseDetails.expiryDate,
      licenseDetailsDaysLeftForRenewal:
        driverDetails.licenseDetails.daysLeftForRenewal,
      employmentHistoryPreviousEmployer: addMoreExperience[0]?.previousEmployer,
      employmentHistoryYearsOfExperience:
        addMoreExperience[0]?.yearsOfExperience,
      employmentHistoryReasonOfLeaving: addMoreExperience[0]?.reasonOfLeaving,
      employmentHistoryCompanyName: addMoreExperience[0]?.companyName,
      employmentHistoryReferenceContactName:
        addMoreExperience[0]?.referenceContactName,
      employmentHistoryReferenceEmailId: addMoreExperience[0]?.referenceEmailId,
      employmentHistoryReferenceContactNumber:
        addMoreExperience[0]?.referenceContactNumber,
      specialDrivingLicence:
        driverDetails.specialDrivingLicence.specialDrivingLicence,
    });
  }, [driverDetails, addMoreExperience]);

  useEffect(() => {
    const calculateProgress = () => {
      // Count filled inputs (excluding the 'documents' array)
      const filledInputs = Object.values(progressOfState).filter(
        (value) => value !== ""
      ).length;

      // Count total inputs (excluding the 'documents' array)
      const totalInputs = Object.keys(progressOfState).length;
      const newProgress = (filledInputs / totalInputs) * 100;
      setProgress(Math.ceil(newProgress));
    };

    calculateProgress();
  }, [progressOfState]);

  console.log("progressOfState", progressOfState);
  console.log("progress", progress);
  const combinedObject = selectedFiles.reduce(
    (accumulator: any, currentItem: any) => {
      accumulator[currentItem.id] = {
        id: currentItem.id,
        file: currentItem.file,
        currentDate: currentItem.currentDate,
      };
      return accumulator;
    },
    {}
  );

  const handleFileChanges = (
    event: React.ChangeEvent<HTMLInputElement>,
    documentId: number
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    const documentExists = documentDataCollection.find(
      (doc: any) => doc.id === documentId
    );
    if (file && documentExists) {
      const newSelectedFiles = [...selectedFiles];
      const existingFileIndex = newSelectedFiles.findIndex(
        (file) => file.id === documentId
      );
      const currentDate = new Date();
      if (existingFileIndex !== -1) {
        newSelectedFiles[existingFileIndex] = {
          id: documentId,
          file,
          currentDate,
        };
      } else {
        newSelectedFiles.push({ id: documentId, file, currentDate });
      }
      setSelectedFiles(newSelectedFiles);
    }
  };

  const handleUploadFileWithId = async (id: number, combinedObject: any) => {
    try {
      const project = combinedObject[id];
      if (id && project?.id) {
        const file = [project?.file];
        const uploadDocumentResponses = await Promise.all(
          Object.values(file)?.map((file) =>
            uploadSingleSingleDriverOnboardingDocuments(file)
          )
        );
        const newUrls = uploadDocumentResponses
          ?.map((response) => response?.response)
          .filter(Boolean);
        setUrls((prevUrls) => {
          const updatedUrls = [...prevUrls];
          updatedUrls[id - 1] = newUrls[0]; // Update the URL at the correct index
          return updatedUrls;
        });
        setUploadStatus((prevStatus) => ({ ...prevStatus, [id]: true }));
        setTimeout(() => {
          setShowUploadMessage(true);
        }, 4000);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  const modifiedUrls = urls.reduce((acc: any, url, index) => {
    acc[index + 1] = url;
    return acc;
  }, []);

  const files = selectedFiles?.map((selectedFile) => selectedFile.file);

  const handleViewDocuments = (id: number) => {
    const index = id;
    if (index >= 1 && index < modifiedUrls.length) {
      const url = modifiedUrls[index];
      window.open(url, "_blank");
    } else {
      console.error("URL not found for id:", id);
    }
  };

  const handleAddRow = () => {
    const newRow = {
      id: documentDataCollection.length + 1,
      Vehicle: "",
      rego: "New Rego",
      uploadDate: "New Upload Date",
      UploadedDoc: "new-doc.pdf",
      status: "New Status",
      viewDoc: "view",
      flag: true,
    };

    setDocumentDataCollection([...documentDataCollection, newRow]);
    // You might also need to update other state variables accordingly for the new row.
  };

  const handleInputChange = (id: any, value: any) => {
    setDocumentDataCollection((prevCollection: any) => {
      const updatedCollection = prevCollection.map((item: any) =>
        item.id === id ? { ...item, Vehicle: value } : item
      );

      return updatedCollection;
    });
  };

  const handleInputBlur = (id: any) => {
    // setInputValue("");
    setDocumentDataCollection((prevCollection: any) => {
      const updatedCollection = prevCollection.map((item: any) =>
        item.id === id ? { ...item, flag: false } : item
      );

      return updatedCollection;
    });
  };

  const handleInputClick = (id: any) => {
    setDocumentDataCollection((prevCollection: any) => {
      const updatedCollection = prevCollection.map((item: any) =>
        item.id === id ? { ...item, flag: true } : item
      );

      return updatedCollection;
    });
  };

  const checkValidation = () => {
    const newErrors = { ...error };
    let hasErrors = false;
    Object.keys(driverDetails).forEach((key) => {
      if (
        key !== "avatar" &&
        key !== "onboardingDocuments" &&
        key !== "employmentHistory"
      ) {
        if (
          typeof driverDetails[key] === "object" &&
          driverDetails[key] !== null
        ) {
          Object.keys(driverDetails[key]).forEach((nestedKey) => {
            if (nestedKey !== "documents") {
              if (
                !driverDetails[key][nestedKey] ||
                driverDetails[key][nestedKey] === undefined
              ) {
                newErrors[key + "Error"][nestedKey] = `${correctDriverStateName(
                  nestedKey
                )} is required in ${correctDriverStateName(key)}`;
                hasErrors = true;
              } else {
                newErrors[nestedKey] = "";
              }
            }
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

          if (!driverDetails[key]) {
            newErrors[key + "Error"] = `${correctDriverStateName(
              key
            )} is required`;
            hasErrors = true;
          } else {
            newErrors[key + "Error"] = "";
          }
        }
      }
    });
    setError(newErrors);
    return hasErrors;
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = React.useState("");
  const [selectedProfile, setSelectedProfile] = React.useState("");

  const handleUploadClick: any = () => {
    if (fileInputRef.current) {
      fileInputRef?.current?.click();
    }
  };

  const [documentRender, setDocumentRender] = React.useState("");
  const [selectedUploadRegoDocument, setSelectedUploadRegoDocument] =
    React.useState("");

  const handleFileChange = (setSide: any, setPreview: any) => (event: any) => {
    const selectedFile = event.target.files && event.target.files[0];
    setSide({ file: selectedFile });
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader?.result! as any);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleProfileFileChange = handleFileChange(
    setSelectedProfile,
    setProfile
  );

  const handleDocumentUpload = handleFileChange(
    setSelectedUploadRegoDocument,
    setDocumentRender
  );

  const handleSubmit = async () => {
    const hasErrors = checkValidation();
    if (hasErrors) {
      toast("Please fix the validation errors before submitting.", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    // Uploading driver profile ...
    const [profileUrl] = await Promise.all([
      Promise.all(
        Object.values(selectedProfile)?.map((imageInfo) =>
          uploadDriverProfile(imageInfo)
        )
      ),
    ]);

    // Uploading driver license documents ...
    const [driverLicense] = await Promise.all([
      Promise.all(
        Object.values(selectedUploadRegoDocument)?.map((imageInfo) =>
          uploadDriverLicenseDocuments(imageInfo)
        )
      ),
    ]);

    const updatedEmploymentHistory = addMoreExperience?.map(
      (employment: any) => {
        return {
          ...employment,
          previousEmployer: employment?.previousEmployer,
          yearsOfExperience: employment?.yearsOfExperience,
          reasonOfLeaving: employment?.reasonOfLeaving,
          companyName: employment?.companyName,
          referenceContactName: employment?.referenceContactName,
          referenceEmailId: employment?.referenceEmailId,
          referenceContactNumber: employment?.referenceContactNumber,
        };
      }
    );

    const newDriverDetails = {
      ...driverDetails,
      avatar: profileUrl[0]?.response,
      licenseDetails: {
        ...driverDetails.licenseDetails,
        documents: driverLicense[0]?.response,
      },
      onboardingDocuments: urls?.map((url: any, index: number) => ({
        type: url,
        uploadDate: formattedDate,
      })),
      employmentHistory: updatedEmploymentHistory,
    };

    const response = await addDriver(newDriverDetails, token || "");
    const result = response?.data?.data;
    if (result) {
      toast("Driver has been successfully created..", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setTimeout(() => {
        router.push("/onboarding/driver-list");
      }, 3000);
    } else {
      toast("Something went wrong", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  const regexOfPhoneNumber = /^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$/;
  const regexOfEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.+([a-zA-Z0-9-]+)2*$/;

  // ============================================================= Add More Experience =============================================================

  React.useEffect(() => {
    if (addMoreExperience.length === 0) {
      setAddMoreExperience([
        {
          previousEmployer: "",
          yearsOfExperience: "",
          reasonOfLeaving: "",
          companyName: "",
          referenceContactName: "",
          referenceEmailId: "",
          referenceContactNumber: "",
        },
      ]);
    }
  }, []);

  const handleAddMoreExperience = () => {
    setAddMoreExperience([
      ...addMoreExperience,
      {
        previousEmployer: "",
        yearsOfExperience: "",
        reasonOfLeaving: "",
        companyName: "",
        referenceContactName: "",
        referenceEmailId: "",
        referenceContactNumber: "",
      },
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    setAddMoreExperience(addMoreExperience.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (value: any, fieldName: any, index: any) => {
    const data = [...addMoreExperience];
    data[index][fieldName] = value.target.value;
    setAddMoreExperience(data);
  };

  return (
    <>
      <div className="flex bg-[#F8F8F8]">
        <div>
          <Toaster />
        </div>
        <div className="ml-[316px] w-full mt-4">
          <div className="bg-white mr-4 flex justify-between items-center rounded-md">
            <h2 className=" w-full p-4 rounded-md font-bold text-[#16161D] text-[24px]">
              Add Driver
            </h2>
            <div className="h-8 w-8 flex justify-center cursor-pointer text-2xl items-center bg-blueGrey-100 rounded-full mr-4">
              <span className="mt-[-2px] ml-[2px] text-[#292D32] rotate-45">
                +
              </span>
            </div>
          </div>
          <div className="bg-white mr-4 px-4 rounded-md mt-4 p-4">
            <div className="mx-2">
              <Progressbar value={progress} />
            </div>
            <div className="relative w-fit">
              <span className="flex flex-row justify-center my-4">
                <span className="mb-4 text-center flex justify-center items-center">
                  <label htmlFor="profilelabel">
                    <div
                      className="w-[100px]  rounded-full h-[100px] cursor-pointer"
                      onChange={handleUploadClick}
                    >
                      {profile ? (
                        <div className="w-full h-full">
                          <Image
                            src={profile}
                            alt="driver"
                            width={100}
                            className="w-[100px] h-[100px] border rounded-full"
                            height={100}
                          />
                        </div>
                      ) : (
                        <>
                          <Image
                            src="/driverImage.svg"
                            alt="driver"
                            width={100}
                            height={100}
                            className="w-[100px] h-[100px]"
                          />
                          <span className="w-6 h-6 rounded-full bg-accent3 block text-white flex justify-center items-end text-xl absolute right-2 bottom-6">
                            +
                          </span>
                        </>
                      )}
                    </div>
                  </label>
                  <span className="text-sm">
                    {" "}
                    <input
                      id="profilelabel"
                      type="file"
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      onChange={(e) => handleProfileFileChange(e)}
                    />
                  </span>
                </span>
              </span>
            </div>
            <div>
              <h3 className=" w-full my-4 rounded-md font-semibold text-black">
                Vehicle Information
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <Maininputfield
                  label="First Name"
                  value={driverDetails.firstName}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      firstName: e.target.value,
                    });

                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        firstNameError: "",
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.firstNameError}
                />
                <Maininputfield
                  label="Middle Name"
                  value={driverDetails.middleName}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      middleName: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        middleNameError: "",
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.middleNameError}
                />
                <Maininputfield
                  label="Last Name"
                  value={driverDetails.lastName}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      lastName: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        lastNameError: "",
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.lastNameError}
                />

                <Maindatefield
                  label="DOB"
                  value={driverDetails.dateOfBirth}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      dateOfBirth: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        dateOfBirthError: "",
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.dateOfBirthError}
                />

                <Maininputfield
                  label="Email"
                  value={driverDetails.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    if (!regexOfEmail.test(inputValue)) {
                      setError({
                        ...error,
                        emailError: "Please enter a valid email address",
                      });
                    } else {
                      setError({
                        ...error,
                        emailError: "", // Clear the error when the input is valid
                      });
                    }
                    setDriverDetails({
                      ...driverDetails,
                      email: e.target.value,
                    });
                  }}
                  className="w-full"
                  errorMessage={error.emailError}
                />
                <Maininputfield
                  label="Mobile"
                  value={driverDetails.mobile}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    if (!regexOfPhoneNumber.test(inputValue)) {
                      setError({
                        ...error,
                        mobileError: "Please enter a valid phone number",
                      });
                    } else {
                      setError({
                        ...error,
                        mobileError: "", // Clear the error when the input is valid
                      });
                    }
                    setDriverDetails({
                      ...driverDetails,
                      mobile: e.target.value,
                    });
                  }}
                  className="w-full"
                  errorMessage={error.mobileError}
                />
                <Maininputfield
                  label="Nationality"
                  value={driverDetails?.nationality}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      nationality: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        nationalityError: "",
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.nationalityError}
                />

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
                  value={driverDetails.currentAddress.houseNumber}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      currentAddress: {
                        ...driverDetails.currentAddress,
                        houseNumber: e.target.value,
                      },
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        currentAddressError: {
                          ...error.currentAddressError,
                          houseNumber: "",
                        },
                      });
                    }
                  }}
                  errorMessage={error.currentAddressError?.houseNumber}
                  className="w-full"
                />
                <Maininputfield
                  label="Street"
                  value={driverDetails.currentAddress.street}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      currentAddress: {
                        ...driverDetails.currentAddress,
                        street: e.target.value,
                      },
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        currentAddressError: {
                          ...error.currentAddressError,
                          street: "",
                        },
                      });
                    }
                  }}
                  errorMessage={error.currentAddressError?.street}
                  className="w-full"
                />
                <Maininputfield
                  label="Suburb"
                  value={driverDetails.currentAddress.suburb}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      currentAddress: {
                        ...driverDetails.currentAddress,
                        suburb: e.target.value,
                      },
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        currentAddressError: {
                          ...error.currentAddressError,
                          suburb: "",
                        },
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.currentAddressError?.suburb}
                />
                <div>
                  <DropDownMap
                    label="State"
                    mapOption={stateCollection}
                    onChange={(e: any) => {
                      setDriverDetails({
                        ...driverDetails,
                        currentAddress: {
                          ...driverDetails.currentAddress,
                          state: e.target.value,
                        },
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          currentAddressError: {
                            ...error.currentAddressError,
                            state: "",
                          },
                        });
                      }
                    }}
                    value={driverDetails.currentAddress?.state}
                    errorMessage={error.currentAddressError?.state}
                  />
                  {driverDetails.currentAddress?.state === "Other" && (
                    <div className="mt-3">
                      <Maininputfield label="Other" className="w-full" />
                    </div>
                  )}
                </div>

                <Maininputfield
                  label="Country"
                  // mapOption={countryCollection}
                  value={driverDetails.currentAddress.country}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      currentAddress: {
                        ...driverDetails.currentAddress,
                        country: e.target.value,
                      },
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        currentAddressError: {
                          ...error.currentAddressError,
                          country: "",
                        },
                      });
                    }
                  }}
                  errorMessage={error.currentAddressError?.country}
                />
                <Maininputfield
                  label="Post Code"
                  value={driverDetails.currentAddress.pincode}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      currentAddress: {
                        ...driverDetails.currentAddress,
                        pincode: e.target.value,
                      },
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        currentAddressError: {
                          ...error.currentAddressError,
                          pincode: "",
                        },
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.currentAddressError?.pincode}
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
                  value={driverDetails.permanentAddress.houseNumber}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      permanentAddress: {
                        ...driverDetails.permanentAddress,
                        houseNumber: e.target.value,
                      },
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        permanentAddressError: {
                          ...error.permanentAddressError,
                          houseNumber: "",
                        },
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.permanentAddressError?.houseNumber}
                />
                <Maininputfield
                  label="Street"
                  value={driverDetails.permanentAddress.street}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      permanentAddress: {
                        ...driverDetails.permanentAddress,
                        street: e.target.value,
                      },
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        permanentAddressError: {
                          ...error.permanentAddressError,
                          street: "",
                        },
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.permanentAddressError?.street}
                />
                <Maininputfield
                  label="Suburb"
                  value={driverDetails.permanentAddress.suburb}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      permanentAddress: {
                        ...driverDetails.permanentAddress,
                        suburb: e.target.value,
                      },
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        permanentAddressError: {
                          ...error.permanentAddressError,
                          suburb: "",
                        },
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.permanentAddressError?.suburb}
                />
                <div>
                  <DropDownMap
                    label="State"
                    mapOption={stateCollection}
                    // selectedData={selectedData}
                    // setSelectedData={setSelectedData}
                    value={driverDetails.permanentAddress.state}
                    onChange={(e: any) => {
                      setDriverDetails({
                        ...driverDetails,
                        permanentAddress: {
                          ...driverDetails.permanentAddress,
                          state: e.target.value,
                        },
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          permanentAddressError: {
                            ...error.permanentAddressError,
                            state: "",
                          },
                        });
                      }
                    }}
                    errorMessage={error.permanentAddressError?.state}
                  />
                  {driverDetails.permanentAddress?.state === "Other" && (
                    <div className="mt-3">
                      <Maininputfield label="Other" className="w-full" />
                    </div>
                  )}
                </div>

                <Maininputfield
                  label="Country"
                  // mapOption={countryCollection}
                  // selectedData={selectedData}
                  // setSelectedData={setSelectedData}
                  value={driverDetails.permanentAddress.country}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      permanentAddress: {
                        ...driverDetails.permanentAddress,
                        country: e.target.value,
                      },
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        permanentAddressError: {
                          ...error.permanentAddressError,
                          country: "",
                        },
                      });
                    }
                  }}
                  errorMessage={error.permanentAddressError?.country}
                />
                <Maininputfield
                  label="Post Code"
                  value={driverDetails.permanentAddress.pincode}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      permanentAddress: {
                        ...driverDetails.permanentAddress,
                        pincode: e.target.value,
                      },
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        permanentAddressError: {
                          ...error.permanentAddressError,
                          pincode: "",
                        },
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.permanentAddressError?.pincode}
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
                  value={driverDetails.emergencyContactInformation.contactName}
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  //   const inputValue = e.target.value;

                  //   if (!regexOfPhoneNumber.test(inputValue)) {
                  //     setError({
                  //       ...error,
                  //       emergencyContactInformationError: {
                  //         ...error.emergencyContactInformationError,
                  //         contactName: "Please enter a valid phone number",
                  //       },
                  //     });
                  //   } else {
                  //     setError({
                  //       ...error,
                  //       emergencyContactInformationError: {
                  //         ...error.emergencyContactInformationError,
                  //         contactName: "",
                  //       },
                  //     });
                  //   }

                  //   setDriverDetails({
                  //     ...driverDetails,
                  //     emergencyContactInformation: {
                  //       ...driverDetails.emergencyContactInformation,
                  //       contactName: inputValue,
                  //     },
                  //   });
                  // }}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      emergencyContactInformation: {
                        ...driverDetails.emergencyContactInformation,
                        contactName: e.target.value,
                      },
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        emergencyContactInformationError: {
                          ...error.emergencyContactInformationError,
                          contactName: "",
                        },
                      });
                    }
                  }}
                  errorMessage={
                    error.emergencyContactInformationError?.contactName
                  }
                  className="w-full"
                />
                <Maininputfield
                  label="Contact Number"
                  value={
                    driverDetails.emergencyContactInformation.contactNumber
                  }
                  // onChange={(e: any) => {
                  //   setDriverDetails({
                  //     ...driverDetails,
                  //     emergencyContactInformation: {
                  //       ...driverDetails.emergencyContactInformation,
                  //       contactNumber: e.target.value,
                  //     },
                  //   });
                  //   if (e.target.value.length > 0) {
                  //     setError({
                  //       ...error,
                  //       emergencyContactInformationError: {
                  //         ...error.emergencyContactInformationError,
                  //         contactNumber: "",
                  //       },
                  //     });
                  //   }
                  // }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;

                    if (!regexOfPhoneNumber.test(inputValue)) {
                      setError({
                        ...error,
                        emergencyContactInformationError: {
                          ...error.emergencyContactInformationError,
                          contactNumber: "Please enter a valid phone number",
                        },
                      });
                    } else {
                      setError({
                        ...error,
                        emergencyContactInformationError: {
                          ...error.emergencyContactInformationError,
                          contactNumber: "",
                        },
                      });
                    }

                    setDriverDetails({
                      ...driverDetails,
                      emergencyContactInformation: {
                        ...driverDetails.emergencyContactInformation,
                        contactNumber: inputValue,
                      },
                    });
                  }}
                  className="w-full"
                  errorMessage={
                    error.emergencyContactInformationError?.contactNumber
                  }
                />
                <Maininputfield
                  label="Relationship"
                  value={driverDetails.emergencyContactInformation.relationship}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      emergencyContactInformation: {
                        ...driverDetails.emergencyContactInformation,
                        relationship: e.target.value,
                      },
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        emergencyContactInformationError: {
                          ...error.emergencyContactInformationError,
                          relationship: "",
                        },
                      });
                    }
                  }}
                  errorMessage={
                    error.emergencyContactInformationError?.relationship
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
            </div>

            {addMoreExperience?.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <div>
                    <h4 className="text-sm font-semibold mb-4 text-black">
                      Experience {index + 1}
                    </h4>

                    <div className="grid grid-cols-3 gap-4">
                      <Maininputfield
                        label="Pervious Employer"
                        id="previousEmployer"
                        name="previousEmployer"
                        value={item?.previousEmployer}
                        onChange={(e: any) =>
                          handleExperienceChange(e, "previousEmployer", index)
                        }
                        className="w-full"
                        errorMessage={
                          error.employmentHistoryError?.previousEmployer
                        }
                      />
                      <Maininputfield
                        label="Years Of Experience"
                        id="yearsOfExperience"
                        name="yearsOfExperience"
                        value={item?.yearsOfExperience}
                        onChange={(e: any) =>
                          handleExperienceChange(e, "yearsOfExperience", index)
                        }
                        // onChange={(e: any) => {
                        //   setDriverDetails({
                        //     ...driverDetails,
                        //     employmentHistory: {
                        //       ...driverDetails.employmentHistory,
                        //       yearsOfExperience: e.target.value,
                        //     },
                        //   });
                        //   if (e.target.value.length > 0) {
                        //     setError({
                        //       ...error,
                        //       employmentHistoryError: {
                        //         ...error.employmentHistoryError,
                        //         yearsOfExperience: "",
                        //       },
                        //     });
                        //   }
                        // }}
                        className="w-full"
                        errorMessage={
                          error.employmentHistoryError?.yearsOfExperience
                        }
                      />
                      <Maininputfield
                        label="Reason for leaving"
                        id="reasonOfLeaving"
                        name="reasonOfLeaving"
                        value={item?.reasonOfLeaving}
                        onChange={(e: any) =>
                          handleExperienceChange(e, "reasonOfLeaving", index)
                        }
                        // onChange={(e: any) => {
                        //   setDriverDetails({
                        //     ...driverDetails,
                        //     employmentHistory: {
                        //       ...driverDetails.employmentHistory,
                        //       reasonOfLeaving: e.target.value,
                        //     },
                        //   });
                        //   if (e.target.value.length > 0) {
                        //     setError({
                        //       ...error,
                        //       employmentHistoryError: {
                        //         ...error.employmentHistoryError,
                        //         reasonOfLeaving: "",
                        //       },
                        //     });
                        //   }
                        // }}
                        className="w-full"
                        errorMessage={
                          error.employmentHistoryError?.reasonOfLeaving
                        }
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
                          id="companyName"
                          name="companyName"
                          value={item?.companyName}
                          onChange={(e: any) =>
                            handleExperienceChange(e, "companyName", index)
                          }
                          // onChange={(e: any) => {
                          //   setDriverDetails({
                          //     ...driverDetails,
                          //     employmentHistory: {
                          //       ...driverDetails.employmentHistory,
                          //       companyName: e.target.value,
                          //     },
                          //   });
                          //   if (e.target.value.length > 0) {
                          //     setError({
                          //       ...error,
                          //       employmentHistoryError: {
                          //         ...error.employmentHistoryError,
                          //         companyName: "",
                          //       },
                          //     });
                          //   }
                          // }}
                          className="w-full"
                          errorMessage={
                            error.employmentHistoryError?.companyName
                          }
                        />
                        <Maininputfield
                          label="Reference (Contact Name)"
                          id="referenceContactName"
                          name="referenceContactName"
                          value={item?.referenceContactName}
                          onChange={(e: any) =>
                            handleExperienceChange(
                              e,
                              "referenceContactName",
                              index
                            )
                          }
                          // onChange={(e: any) => {
                          //   setDriverDetails({
                          //     ...driverDetails,
                          //     employmentHistory: {
                          //       ...driverDetails.employmentHistory,
                          //       referenceContactName: e.target.value,
                          //     },
                          //   });
                          //   if (e.target.value.length > 0) {
                          //     setError({
                          //       ...error,
                          //       employmentHistoryError: {
                          //         ...error.employmentHistoryError,
                          //         referenceContactName: "",
                          //       },
                          //     });
                          //   }
                          // }}
                          className="w-full"
                          errorMessage={
                            error.employmentHistoryError?.referenceContactName
                          }
                        />
                        <Maininputfield
                          label="Reference (Email ID)"
                          id="referenceEmailId"
                          name="referenceEmailId"
                          value={item?.referenceEmailId}
                          onChange={(e: any) =>
                            handleExperienceChange(e, "referenceEmailId", index)
                          }
                          // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          //   const inputValue = e.target.value;
                          //   if (!regexOfEmail.test(inputValue)) {
                          //     setError({
                          //       ...error,
                          //       employmentHistoryError: {
                          //         ...error.employmentHistoryError,
                          //         referenceEmailId:
                          //           "Please enter a valid email address",
                          //       },
                          //     });
                          //   } else {
                          //     setError({
                          //       ...error,
                          //       employmentHistoryError: {
                          //         ...error.employmentHistoryError,
                          //         referenceEmailId: "",
                          //       },
                          //     });
                          //   }
                          //   setDriverDetails({
                          //     ...driverDetails,
                          //     employmentHistory: {
                          //       ...driverDetails.employmentHistory,
                          //       referenceEmailId: e.target.value,
                          //     },
                          //   });
                          // }}
                          className="w-full"
                          errorMessage={
                            error.employmentHistoryError?.referenceEmailId
                          }
                        />
                        <Maininputfield
                          label="Reference (Contact Number)"
                          id="referenceContactNumber"
                          name="referenceContactNumber"
                          value={item?.referenceContactNumber}
                          onChange={(e: any) =>
                            handleExperienceChange(
                              e,
                              "referenceContactNumber",
                              index
                            )
                          }
                          // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          //   const inputValue = e.target.value;
                          //   if (!regexOfPhoneNumber.test(inputValue)) {
                          //     setError({
                          //       ...error,
                          //       employmentHistoryError: {
                          //         ...error.employmentHistoryError,
                          //         referenceContactNumber:
                          //           "Please enter a valid phone number",
                          //       },
                          //     });
                          //   } else {
                          //     setError({
                          //       ...error,
                          //       employmentHistoryError: {
                          //         ...error.employmentHistoryError,
                          //         referenceContactNumber: "",
                          //       },
                          //     });
                          //   }
                          //   setDriverDetails({
                          //     ...driverDetails,
                          //     employmentHistory: {
                          //       ...driverDetails.employmentHistory,
                          //       referenceContactNumber: e.target.value,
                          //     },
                          //   });
                          // }}
                          className="w-full"
                          errorMessage={
                            error.employmentHistoryError?.referenceContactNumber
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-8 mt-8 flex justify-end">
                    <Button
                      onClick={handleAddMoreExperience}
                      text="Add More Experiences"
                      className="bg-[#2B36D9] px-4 !w-fit"
                    />
                    {index > 0 && (
                      <span
                        onClick={() => handleRemoveExperience(index)}
                        className="ml-4 cursor-pointer"
                        style={{
                          color: "red",
                          marginTop: "10px",
                          marginRight: "10px",
                        }}
                      >
                        Remove
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="mb-4 mt-8">
              <h3 className="w-full mb-4 rounded-md font-semibold text-black">
                {" "}
                License Details
              </h3>

              <div className="grid grid-cols-3 gap-4">
                <Maininputfield
                  label="Licence Number"
                  value={driverDetails.licenseDetails.licenseNumber}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      licenseDetails: {
                        ...driverDetails.licenseDetails,
                        licenseNumber: e.target.value,
                      },
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        licenseDetailsError: {
                          ...error.licenseDetailsError,
                          licenseNumber: "",
                        },
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.licenseDetailsError?.licenseNumber}
                />
                <Maininputfield
                  label="Licence Card Number"
                  value={driverDetails.licenseDetails.licenseCardNumber}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      licenseDetails: {
                        ...driverDetails.licenseDetails,
                        licenseCardNumber: e.target.value,
                      },
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        licenseDetailsError: {
                          ...error.licenseDetailsError,
                          licenseCardNumber: "",
                        },
                      });
                    }
                  }}
                  errorMessage={error.licenseDetailsError?.licenseCardNumber}
                  className="w-full"
                />
                <div>
                  <DropDownMap
                    label="Licence Type"
                    mapOption={licenceTypes}
                    // selectedData={selectedData}
                    // setSelectedData={setSelectedData}
                    value={driverDetails.licenseDetails.licenceType}
                    onChange={(e: any) => {
                      setDriverDetails({
                        ...driverDetails,
                        licenseDetails: {
                          ...driverDetails.licenseDetails,
                          licenceType: e.target.value,
                        },
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          licenseDetailsError: {
                            ...error.licenseDetailsError,
                            licenceType: "",
                          },
                        });
                      }
                    }}
                    errorMessage={error.licenseDetailsError?.licenceType}
                  />
                  {driverDetails?.licenseDetails.licenceType === "Other" && (
                    <div className="mt-3">
                      <Maininputfield label="Other" className="w-full" />
                    </div>
                  )}
                </div>
                <div>
                  <DropDownMap
                    label="State of Issue"
                    mapOption={stateCollection}
                    // selectedData={selectedData}
                    // setSelectedData={setSelectedData}
                    value={driverDetails.licenseDetails.state}
                    onChange={(e: any) => {
                      setDriverDetails({
                        ...driverDetails,
                        licenseDetails: {
                          ...driverDetails.licenseDetails,
                          state: e.target.value,
                        },
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          licenseDetailsError: {
                            ...error.licenseDetailsError,
                            state: "",
                          },
                        });
                      }
                    }}
                    errorMessage={error.licenseDetailsError?.state}
                  />
                  {driverDetails?.licenseDetails?.state === "Other" && (
                    <div className="mt-3">
                      <Maininputfield label="Other" className="w-full" />
                    </div>
                  )}
                </div>

                <Maindatefield
                  label="Date Of Issue "
                  value={driverDetails.licenseDetails.dateOfIssue}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      licenseDetails: {
                        ...driverDetails.licenseDetails,
                        dateOfIssue: e.target.value,
                      },
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        licenseDetailsError: {
                          ...error.licenseDetailsError,
                          dateOfIssue: "",
                        },
                      });
                    }
                  }}
                  errorMessage={error.licenseDetailsError?.dateOfIssue}
                />

                <Maindatefield
                  label="Expiry Date "
                  value={driverDetails.licenseDetails.expiryDate}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      licenseDetails: {
                        ...driverDetails.licenseDetails,
                        expiryDate: e.target.value,
                      },
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        licenseDetailsError: {
                          ...error.licenseDetailsError,
                          expiryDate: "",
                        },
                      });
                    }
                  }}
                  errorMessage={error.licenseDetailsError?.expiryDate}
                />

                <Maininputfield
                  label="Days left for renewal"
                  value={driverDetails.licenseDetails.daysLeftForRenewal}
                  onChange={(e: any) => {
                    setDriverDetails({
                      ...driverDetails,
                      licenseDetails: {
                        ...driverDetails.licenseDetails,
                        daysLeftForRenewal: e.target.value,
                      },
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        licenseDetailsError: {
                          ...error.licenseDetailsError,
                          daysLeftForRenewal: "",
                        },
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.licenseDetailsError?.daysLeftForRenewal}
                />
                <FileUpload
                  file="Upload Rego Document"
                  onChange={handleDocumentUpload}
                  id="uploadDriverRegoFile"
                  name="uploadDriverRegoDocument"
                  //@ts-expect-error
                  fileName={selectedUploadRegoDocument?.file?.name || ""}
                />
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
                  value={driverDetails.employmentHistory.previousEmployer}
                  onChange={(e:any)=>setDriverDetails({...driverDetails, employmentHistory: {...driverDetails.employmentHistory, previousEmployer: e.target.value}})}
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
                  value={driverDetails.employmentHistory.reasonOfLeaving}
                  onChange={(e:any)=>setDriverDetails({...driverDetails, employmentHistory: {...driverDetails.employmentHistory, reasonOfLeaving: e.target.value}})}
                  className="w-full"
                />
              </div>
            </div> */}

            <div className="mb-4 mt-8">
              <h3 className="w-full mb-4 rounded-md font-semibold text-black">
                {" "}
                Special Driving Licence
              </h3>
              <div>
                <div className="grid grid-cols-3 gap-4">
                  <DropDownMap
                    label="Special Driving Licence"
                    // selectedData={selectedData}
                    // setSelectedData={setSelectedData}
                    value={
                      driverDetails.specialDrivingLicence.specialDrivingLicence
                    }
                    onChange={(e: any) => {
                      setDriverDetails({
                        ...driverDetails,
                        specialDrivingLicence: {
                          ...driverDetails.specialDrivingLicence,
                          specialDrivingLicence: e.target.value,
                        },
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          specialDrivingLicenceError: {
                            ...error.specialDrivingLicenceError,
                            specialDrivingLicence: "",
                          },
                        });
                      }
                    }}
                    mapOption={drivingLicenceCollection}
                    errorMessage={
                      error.specialDrivingLicenceError?.specialDrivingLicence
                    }
                  />
                </div>
                {driverDetails?.specialDrivingLicence?.specialDrivingLicence ===
                  "Other" && (
                  <div className="mt-3 grid grid-cols-3 gap-4">
                    <Maininputfield label="Other" className="w-full" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white mr-4 px-4 rounded-md mt-4 p-4">
            <div className="mb-4 mt-8">
              <div className="flex">
                <h3 className="w-full mb-4 rounded-md font-semibold text-black">
                  {" "}
                  Onboarding Documents
                </h3>
                <button
                  onClick={handleAddRow}
                  className="text-white mb-2 flex justify-center items-center font-thin bg-[#2B36D9] w-[48px] h-[48px] pb-2 rounded-full text-[40px]"
                >
                  +
                </button>
              </div>

              <div className="grid grid-cols-5 bg-table-header p-4 rounded-md text-black text-center mb-2 ">
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
              <div className="grid grid-cols-5 p-4 rounded-md text-black text-center items-center">
                {documentDataCollection?.map((data: any, index: any) => {
                  return (
                    <>
                      <div className="mb-6 align-middle">
                        {data.flag ? (
                          <input
                            className="border-b-2 text-center border-[#607D8B]"
                            placeholder="Document Name"
                            value={data.Vehicle}
                            onChange={(e) =>
                              handleInputChange(data.id, e.target.value)
                            }
                            onBlur={() => handleInputBlur(data.id)}
                          />
                        ) : (
                          <span
                            onClick={() => handleInputClick(data.id)}
                            className="cursor-pointer text-center"
                          >
                            {data.Vehicle}
                          </span>
                        )}
                      </div>
                      <div className="text-center">
                        <label className="cursor-pointer">
                          <React.Fragment>
                            <span className="!w-fit inline-block m-auto bg-[#2B36D9] py-2  text-sm px-6 rounded-full mb-6 font-semibold placeholder:py-[4px] text-white">
                              Upload
                            </span>
                          </React.Fragment>
                          <input
                            type="file"
                            className="hidden"
                            accept=".doc,.docx,.pdf"
                            onChange={(e) => handleFileChanges(e, data?.id)}
                          />
                        </label>
                      </div>
                      <div className="mb-6">
                        {selectedFiles.find((file) => file.id === data?.id)
                          ?.file ? (
                          <div>
                            <p>
                              {
                                selectedFiles.find(
                                  (file) => file.id === data?.id
                                )?.file.name
                              }
                            </p>
                          </div>
                        ) : (
                          <span
                            className="!w-fit m-auto  py-2 cursor-pointer  px-6 rounded-full mb-6 text-black"
                            // onClick={() =>
                            //   handleUploadFileWithId(data?.id, combinedObject)
                            // }
                          >
                            No file Uploaded
                          </span>
                        )}
                      </div>
                      <div className="mb-6">
                        <div>
                          {selectedFiles.find(
                            (file) => file.id === data?.id
                          ) ? (
                            <div>
                              <p>
                                {selectedFiles.find(
                                  (file) => file.id === data?.id
                                )?.currentDate
                                  ? formatDate(
                                      selectedFiles.find(
                                        (file) => file.id === data?.id
                                      )?.currentDate
                                    )
                                  : "No date available"}
                              </p>
                            </div>
                          ) : (
                            <p>No date available</p>
                          )}
                        </div>
                      </div>
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
          </div>
          <div className="mb-20 mr-4">
            <ImageUpload handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateDriver;
const stateCollection = [
  {
    value: "Victoria",
  },
  {
    value: "Australian Capital Territory",
  },
  {
    value: "New South Wales",
  },
  {
    value: "Northern Territory",
  },
  {
    value: "Queensland",
  },
  {
    value: "South Australia",
  },
  {
    value: "Tasmania",
  },
  {
    value: "Western Australia",
  },
  {
    value: "Other",
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
    value: "LR (Light Rigid Licence)",
  },
  {
    value: "MR (Medium Rigid Licence)",
  },
  {
    value: "HR (Heavy Rigid Licence)",
  },
  {
    value: "HR (Heavy Combination Licence)",
  },
  {
    value: "Other",
  },
];
const drivingLicenceCollection = [
  {
    value: "Special Driving Licence",
  },
  {
    value: "Dangerous Goods",
  },
  {
    value: "Other",
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
// const documentDataCollection = [
//   {
//     id: 1,
//     documentType: "Visa Status",
//     uploadedDocument: "visa-status.pdf",
//     uploadDate: "20/12/2023",
//   },
//   {
//     id: 2,
//     documentType: "Driver License (Front) ",
//     uploadedDocument: "-",
//     uploadDate: "-",
//   },
//   {
//     id: 3,
//     documentType: "Driver License (Back) ",
//     uploadedDocument: "-",
//     uploadDate: "-",
//   },
//   {
//     id: 4,
//     documentType: "License History",
//     uploadedDocument: "-",
//     uploadDate: "-",
//   },
//   {
//     id: 5,
//     documentType: "Police Verification",
//     uploadedDocument: "police-verification.pdf",
//     uploadDate: "20/12/2023",
//   },
//   {
//     id: 6,
//     documentType: "Passport (Front)",
//     uploadedDocument: "-",
//     uploadDate: "-",
//   },
//   {
//     id: 7,
//     documentType: "Passport (Back)",
//     uploadedDocument: "-",
//     uploadDate: "-",
//   },
//   {
//     id: 8,
//     documentType: "Health Insurance",
//     uploadedDocument: "-",
//     uploadDate: "-",
//   },
//   {
//     id: 9,
//     documentType: "Driver Certificate",
//     uploadedDocument: "-",
//     uploadDate: "-",
//   },
//   {
//     id: 10,
//     documentType: "Fitness",
//     uploadedDocument: "-",
//     uploadDate: "-",
//   },
//   {
//     id: 11,
//     documentType: "Drug Test",
//     uploadedDocument: "-",
//     uploadDate: "-",
//   },
// ];
