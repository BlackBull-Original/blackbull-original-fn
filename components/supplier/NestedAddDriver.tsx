import React, { useRef, useState } from "react";
import Progressbar from "../Progressbar";
import Image from "next/image";
import Maininputfield from "../Maininputfield";
import DateWithoutDropdown from "../DateWithoutDropdown";
import DropDownMap from "../DropDownMap";
import FileUpload from "../FileUpload";
import Checkbox from "../Checkbox";
import Button from "../Button";
import { uploadSupplierDriverOnboardingDocuments } from "@/network-request/supplier/driver";
import { formatDate } from "@/utils";
import Maindatefield from "../Maindatefield";

const NestedAddDriver = (props: any) => {
  const [selectedData, setSelectedData] = useState();
  const {
    addDriver,
    setAddDriver,
    error,
    setError,
    selectedProfile,
    setSelectedProfile,
    selectedUploadRegoDocument,
    setSelectedUploadRegoDocument,
    urls,
    setUrls,
    modifiedUrls,
    addMoreExperience,
    setAddMoreExperience,
  } = props;
  console.log("AddDriver state", addDriver);
  console.log("Error State", error);
  const regexOfPhoneNumber = /^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$/;
  const regexOfEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.+([a-zA-Z0-9-]+)2*$/;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = React.useState("");
  // const [selectedProfile, setSelectedProfile] = React.useState("");
  // const [selectedUploadRegoDocument, setSelectedUploadRegoDocument] =
  //   React.useState("");
  const [documentRender, setDocumentRender] = React.useState("");
  // const [urls, setUrls] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<
    { id: number; file: File; currentDate: Date | null }[]
  >([]);

  const [uploadStatus, setUploadStatus] = useState<{ [id: number]: boolean }>(
    {}
  );
  const [showUploadMessage, setShowUploadMessage] = useState(false);

  const [documentDataCollection, setDocumentDataCollection] = useState<any>([]);

  // ******************************** ADD More Experince ********************************
  // const [addMoreExperience, setAddMoreExperience] = React.useState<Array<any>>(
  //   []
  // );

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
    setAddMoreExperience(
      addMoreExperience.filter((_: any, i: any) => i !== index)
    );
  };
  console.log({ addMoreExperience });

  const handleExperienceChange = (value: any, fieldName: any, index: any) => {
    const data = [...addMoreExperience];
    data[index][fieldName] = value.target.value;
    setAddMoreExperience(data);
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

  // const modifiedUrls = urls.reduce((acc: any, url, index) => {
  //   acc[index + 1] = url;
  //   return acc;
  // }, []);

  const handleUploadClick: any = () => {
    if (fileInputRef.current) {
      fileInputRef?.current?.click();
    }
  };

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

  const handleUploadFileWithId = async (id: number, combinedObject: any) => {
    try {
      const project = combinedObject[id];
      if (id && project?.id) {
        const file = [project?.file];
        console.log("file", file);
        const uploadDocumentResponses = await Promise.all(
          Object.values(file)?.map((file) =>
            uploadSupplierDriverOnboardingDocuments(file)
          )
        );
        const newUrls = uploadDocumentResponses
          ?.map((response) => response?.response)
          .filter(Boolean);
        setUrls((prevUrls: any) => {
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

  const handleViewDocuments = (id: number) => {
    console.log("CHECK", id, modifiedUrls);
    const index = id - 1; // Adjust index to start from 0
    if (index >= 0 && index < modifiedUrls.length) {
      const url = modifiedUrls[index];
      window.open(url, "_blank");
    } else {
      console.error("URL not found for id:", id);
    }
  };

  return (
    <div>
      <div className=" w-full p-4 rounded-md font-bold text-[#16161D] text-[24px]">
        <h2 className="text-black">Add Driver</h2>
      </div>
      <div className=" mt-4 bg-white p-4 mr-4 rounded-md mb-20">
        <Progressbar />
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
        <h2 className="text-black text-[18px] font-semibold p-4 ">
          Personal Information
        </h2>
        <div className="grid grid-cols-3 gap-4 p-4">
          <Maininputfield
            label="First Name"
            value={addDriver?.firstName}
            className="w-full"
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                firstName: e.target.value,
              });
              if (e.target.value.length > 0) {
                setError({ ...error, firstNameError: "" });
              }
            }}
            errorMessage={error.firstNameError}
          />
          <Maininputfield
            label="Middle Name"
            value={addDriver?.middleName}
            className="w-full"
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                middleName: e.target.value,
              });
              if (e.target.value.length > 0) {
                setError({ ...error, middleNameError: "" });
              }
            }}
            errorMessage={error.middleNameError}
          />
          <Maininputfield
            label="Last Name"
            value={addDriver?.lastName}
            className="w-full"
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                lastName: e.target.value,
              });
              if (e.target.value.length > 0) {
                setError({ ...error, lastNameError: "" });
              }
            }}
            errorMessage={error.lastNameError}
          />

          <Maindatefield
            label="DOB"
            value={addDriver?.dateOfBirth}
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                dateOfBirth: e.target.value,
              });
              if (e.target.value.length > 0) {
                setError({ ...error, dateOfBirthError: "" });
              }
            }}
            errorMessage={error.dateOfBirthError}
          />
          <Maininputfield
            label="Email"
            value={addDriver?.email}
            className="w-full"
            onChange={(e: any) => {
              const inputValue = e.target.value;
              if (!regexOfEmail.test(inputValue)) {
                setError({
                  ...error,
                  emailError: "Please enter a valid email address",
                });
              } else {
                setError({ ...error, emailError: "" });
              }
              setAddDriver({
                ...addDriver,
                email: e.target.value,
              });
            }}
            errorMessage={error.emailError}
          />
          <Maininputfield
            label="Mobile"
            value={addDriver?.mobile}
            className="w-full"
            onChange={(e: any) => {
              const phoneNumber = e.target.value;
              // Check if the entered value is a valid 10-digit phone number
              if (!regexOfPhoneNumber.test(phoneNumber)) {
                setError({
                  ...error,
                  mobileError: "Please enter a valid 10-digit phone number",
                });
              } else {
                setError({ ...error, mobileError: "" });
              }
              setAddDriver({
                ...addDriver,
                mobile: e.target.value,
              });
            }}
            errorMessage={error.mobileError}
          />
          <Maininputfield
            label="Nationality"
            value={addDriver?.nationality}
            className="w-full"
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                nationality: e.target.value,
              });
              if (e.target.value.length > 0) {
                setError({ ...error, nationalityError: "" });
              }
            }}
            errorMessage={error.nationalityError}
          />
        </div>
        <h2 className="text-black font-semibold p-4 text-[18px]">
          Address Information
        </h2>
        <h3 className="text-black font-semibold text-sm pl-4">
          Current Address
        </h3>
        <div className="grid grid-cols-3 gap-4 p-4">
          <Maininputfield
            label="House Number"
            value={addDriver?.currentAddress?.houseNumber}
            className="w-full"
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                currentAddress: {
                  ...addDriver.currentAddress,
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
          />
          <Maininputfield
            label="Street"
            value={addDriver?.currentAddress?.street}
            className="w-full"
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                currentAddress: {
                  ...addDriver.currentAddress,
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
          />
          <Maininputfield
            label="Suburb"
            value={addDriver?.currentAddress?.suburb}
            className="w-full"
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                currentAddress: {
                  ...addDriver.currentAddress,
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
            errorMessage={error.currentAddressError?.suburb}
          />
          <div>
            <DropDownMap
              label="State"
              mapOption={stateCollection}
              selectedData={selectedData}
              setSelectedData={setSelectedData}
              value={addDriver?.currentAddress?.state}
              onChange={(e: any) => {
                setAddDriver({
                  ...addDriver,
                  currentAddress: {
                    ...addDriver.currentAddress,
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
              errorMessage={error.currentAddressError?.state}
            />{" "}
            {addDriver?.currentAddress?.state === "Other" && (
              <div className="mt-3">
                <Maininputfield label="Other" className="w-full" />
              </div>
            )}
          </div>

          <Maininputfield
            label="Country"
            // mapOption={countryCollection}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
            value={addDriver?.currentAddress?.country}
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                currentAddress: {
                  ...addDriver.currentAddress,
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
            value={addDriver?.currentAddress?.pincode}
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                currentAddress: {
                  ...addDriver.currentAddress,
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
        </div>
        {/* <Checkbox
          className="!pl-4"
          content="Same as above"
          color="text-blueGrey-900"
        /> */}
        <h3 className="text-black font-semibold text-sm pl-4">
          Permanent Address
        </h3>
        <div className="grid grid-cols-3 gap-4 p-4">
          <Maininputfield
            label="House Number"
            value={addDriver?.permanentAddress?.houseNumber}
            className="w-full"
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                permanentAddress: {
                  ...addDriver.permanentAddress,
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
            errorMessage={error.permanentAddressError?.houseNumber}
          />
          <Maininputfield
            label="Street"
            className="w-full"
            value={addDriver?.permanentAddress?.street}
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                permanentAddress: {
                  ...addDriver.permanentAddress,
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
            errorMessage={error.permanentAddressError?.street}
          />
          <Maininputfield
            label="Suburb"
            className="w-full"
            value={addDriver?.permanentAddress?.suburb}
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                permanentAddress: {
                  ...addDriver.permanentAddress,
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
            errorMessage={error.permanentAddressError?.suburb}
          />
          <div>
            <DropDownMap
              label="State"
              mapOption={stateCollection}
              selectedData={selectedData}
              setSelectedData={setSelectedData}
              value={addDriver?.permanentAddress?.state}
              onChange={(e: any) => {
                setAddDriver({
                  ...addDriver,
                  permanentAddress: {
                    ...addDriver.permanentAddress,
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
            {addDriver?.permanentAddress?.state === "Other" && (
              <div className="mt-3">
                <Maininputfield label="Other" className="w-full" />
              </div>
            )}
          </div>

          <Maininputfield
            label="Country"
            // mapOption={countryCollection}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
            value={addDriver?.permanentAddress?.country}
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                permanentAddress: {
                  ...addDriver.permanentAddress,
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
            value={addDriver?.permanentAddress?.pincode}
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                permanentAddress: {
                  ...addDriver.permanentAddress,
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
        <h2 className="text-black font-semibold p-4 text-[18px]">
          Emergency Contact Information
        </h2>
        <div className="grid grid-cols-3 gap-4 p-4">
          <Maininputfield
            label="Contact Name"
            value={addDriver?.emergencyContactInformation?.contactName}
            className="w-full"
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                emergencyContactInformation: {
                  ...addDriver.emergencyContactInformation,
                  contactName: e.target.value,
                },
              });
              if (e.target.value.length > 0) {
                setError({
                  ...error,
                  emergencyContactInformationError: {
                    ...error.permanentAddressError,
                    contactName: "",
                  },
                });
              }
            }}
            errorMessage={error.emergencyContactInformationError?.contactName}
          />
          <Maininputfield
            label="Contact Number"
            value={addDriver?.emergencyContactInformation?.contactNumber}
            className="w-full"
            onChange={(e: any) => {
              const phoneNumber = e.target.value;
              // Check if the entered value is a valid 10-digit phone number
              if (!regexOfPhoneNumber.test(phoneNumber)) {
                setError({
                  ...error,
                  emergencyContactInformationError: {
                    ...error.emergencyContactInformationError,
                    contactNumber: "Please enter a valid 10-digit phone number",
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
              setAddDriver({
                ...addDriver,
                emergencyContactInformation: {
                  ...addDriver.emergencyContactInformation,
                  contactNumber: e.target.value,
                },
              });
            }}
            errorMessage={error.emergencyContactInformationError?.contactNumber}
          />
          <Maininputfield
            label="Relationship"
            value={addDriver?.emergencyContactInformation?.relationship}
            className="w-full"
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                emergencyContactInformation: {
                  ...addDriver.emergencyContactInformation,
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
            errorMessage={error.emergencyContactInformationError?.relationship}
          />
        </div>
        <h2 className="text-black font-semibold p-4 text-[18px]">
          Employment History
        </h2>

        {addMoreExperience?.map((item: any, index: number) => {
          return (
            <div className="pl-4" key={index}>
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
                    // onChange={(e: any) => {
                    //   setDriverDetails({
                    //     ...driverDetails,
                    //     employmentHistory: {
                    //       ...driverDetails.employmentHistory,
                    //       previousEmployer: e.target.value,
                    //     },
                    //   });
                    //   if (e.target.value.length > 0) {
                    //     setError({
                    //       ...error,
                    //       employmentHistoryError: {
                    //         ...error.employmentHistoryError,
                    //         previousEmployer: "",
                    //       },
                    //     });
                    //   }
                    // }}
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
                    errorMessage={error.employmentHistoryError?.reasonOfLeaving}
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
                      errorMessage={error.employmentHistoryError?.companyName}
                    />
                    <Maininputfield
                      label="Reference (Contact Name)"
                      id="referenceContactName"
                      name="referenceContactName"
                      value={item?.referenceContactName}
                      onChange={(e: any) =>
                        handleExperienceChange(e, "referenceContactName", index)
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
        {/* <h3 className="text-black font-semibold text-sm pl-4 text-blueGrey-900">
          Experience
        </h3>
        <div className="grid grid-cols-3 gap-4 p-4">
          <Maininputfield
            label="Pervious Employer"
            value={addDriver?.employmentHistory?.previousEmployer}
            className="w-full"
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                employmentHistory: {
                  ...addDriver.employmentHistory,
                  previousEmployer: e.target.value,
                },
              });
            }}
          />
          <Maininputfield
            label="Years Of Experience"
            value={addDriver?.employmentHistory?.yearsOfExperience}
            className="w-full"
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                employmentHistory: {
                  ...addDriver.employmentHistory,
                  yearsOfExperience: e.target.value,
                },
              });
            }}
          />
          <Maininputfield
            label="Reason for leaving"
            value={addDriver?.employmentHistory?.reasonOfLeaving}
            className="w-full"
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                employmentHistory: {
                  ...addDriver.employmentHistory,
                  reasonOfLeaving: e.target.value,
                },
              });
            }}
          />
        </div>
        <h3 className="text-black font-semibold text-sm pl-4 text-blueGrey-900">
          Reference Information
        </h3>
        <div className="grid grid-cols-3 gap-4 p-4">
          <Maininputfield
            label="Company Name"
            className="w-full"
            value={addDriver?.employmentHistory?.companyName}
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                employmentHistory: {
                  ...addDriver.employmentHistory,
                  companyName: e.target.value,
                },
              });
            }}
          />
          <Maininputfield
            label="Reference (Contact Name)"
            value={addDriver?.employmentHistory?.referenceContactName}
            className="w-full"
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                employmentHistory: {
                  ...addDriver.employmentHistory,
                  referenceContactName: e.target.value,
                },
              });
            }}
          />
          <Maininputfield
            label="Reference (Email ID)"
            value={addDriver?.employmentHistory?.referenceEmailId}
            className="w-full"
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                employmentHistory: {
                  ...addDriver.employmentHistory,
                  referenceEmailId: e.target.value,
                },
              });
            }}
          />
          <Maininputfield
            label="Reference (Contact Number)"
            value={addDriver?.employmentHistory?.referenceContactNumber}
            className="w-full"
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                employmentHistory: {
                  ...addDriver.employmentHistory,
                  referenceContactNumber: e.target.value,
                },
              });
            }}
          />
        </div>
        <div className="flex justify-end py-2 px-4">
          <Button
            text="Add More Experiences"
            className="!w-fit bg-[#2B36D9] !px-4"
          />
        </div> */}
        <h2 className="text-black font-semibold p-4 mt-6">License Details</h2>
        <div className="grid grid-cols-3 gap-4 p-4">
          <Maininputfield
            label="Licence Number"
            className="w-full"
            value={addDriver?.licenseDetails?.licenseNumber}
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                licenseDetails: {
                  ...addDriver.licenseDetails,
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
            errorMessage={error.licenseDetailsError?.licenseNumber}
          />
          <Maininputfield
            label="Licence Card Number"
            className="w-full"
            value={addDriver?.licenseDetails?.licenseCardNumber}
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                licenseDetails: {
                  ...addDriver.licenseDetails,
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
          />
          <div>
            <DropDownMap
              label="Licence Type"
              selectedData={addDriver}
              setSelectedData={setSelectedData}
              mapOption={licenceTypes}
              value={addDriver?.licenseDetails?.licenseType}
              onChange={(e: any) => {
                setAddDriver({
                  ...addDriver,
                  licenseDetails: {
                    ...addDriver.licenseDetails,
                    licenseType: e.target.value,
                  },
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    licenseDetailsError: {
                      ...error.licenseDetailsError,
                      licenseType: "",
                    },
                  });
                }
              }}
              errorMessage={error.licenseDetailsError?.licenseType}
            />
            {addDriver?.licenseDetails?.licenseType === "Other" && (
              <div className="mt-3">
                <Maininputfield label="Other" className="w-full" />
              </div>
            )}
          </div>
          <div>
            <DropDownMap
              label="State of Issue"
              selectedData={stateCollection}
              setSelectedData={setSelectedData}
              mapOption={stateCollection}
              value={addDriver?.licenseDetails?.state}
              onChange={(e: any) => {
                setAddDriver({
                  ...addDriver,
                  licenseDetails: {
                    ...addDriver.licenseDetails,
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
            {addDriver?.licenseDetails?.state === "Other" && (
              <div className="mt-3">
                <Maininputfield label="Other" className="w-full" />
              </div>
            )}
          </div>

          <Maindatefield
            label="Date Of Issue"
            value={addDriver?.licenseDetails?.dateOfIssue}
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                licenseDetails: {
                  ...addDriver.licenseDetails,
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
            label="Expiry Date"
            value={addDriver?.licenseDetails?.expiryDate}
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                licenseDetails: {
                  ...addDriver.licenseDetails,
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
            value={addDriver?.licenseDetails?.daysLeftForRenewal}
            className="w-full"
            onChange={(e: any) => {
              setAddDriver({
                ...addDriver,
                licenseDetails: {
                  ...addDriver.licenseDetails,
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
            errorMessage={error.licenseDetailsError?.daysLeftForRenewal}
          />
          <FileUpload
            file="Upload Rego Document"
            id="supplierDriverRegoFile"
            name="supplierDriverRegoDocument"
            onChange={handleDocumentUpload}
            fileName={selectedUploadRegoDocument?.file?.name || ""}
          />
        </div>
        {/* <h2 className="text-black font-semibold p-4 mt-4">
          Employment History
        </h2> */}
        {/* <div className="grid grid-cols-3 gap-4 p-4">
          <Maininputfield
            label="Pervious Employer"
            value={"Dominic Jensen"}
            className="w-full"
          />
          <Maininputfield
            label="Years Of Experience"
            value={"2.5yrs"}
            className="w-full"
          />
          <Maininputfield
            label="Reason for leaving"
            value={"NA"}
            className="w-full"
          />
        </div> */}
        <h2 className="text-black font-semibold p-4 mt-4">
          Special Driving Licence
        </h2>
        <div>
          <div className="grid grid-cols-3 gap-4 p-4">
            <DropDownMap
              label="Special Driving Licence"
              selectedData={addDriver}
              setSelectedData={setAddDriver}
              mapOption={drivingLicenceCollection}
              value={addDriver?.specialDrivingLicense}
              onChange={(e: any) => {
                setAddDriver({
                  ...addDriver,
                  specialDrivingLicense: e.target.value,
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    specialDrivingLicenseError: "",
                  });
                }
              }}
              errorMessage={error.specialDrivingLicenseError}
            />
          </div>
          {addDriver?.specialDrivingLicense === "Other" && (
            <div className=" grid grid-cols-3 gap-4 ml-4 mt-1">
              <Maininputfield label="Other" className="w-full" />
            </div>
          )}
        </div>

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
                            selectedFiles.find((file) => file.id === data?.id)
                              ?.file.name
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
                      {selectedFiles.find((file) => file.id === data?.id) ? (
                        <div>
                          <p>
                            {selectedFiles.find((file) => file.id === data?.id)
                              ?.currentDate
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
                    <Image src={"/edit.svg"} alt="svg" width={24} height={24} />
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
    </div>
  );
};

export default NestedAddDriver;

// const documentCollectionData = [
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

const drivingLicenceCollection = [
  {
    value: "Dangerous Goods",
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
