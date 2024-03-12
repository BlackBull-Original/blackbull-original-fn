import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import DateWithoutDropdown from "../../../../components/DateWithoutDropdown";
import DropDownMap from "../../../../components/DropDownMap";
import FileUpload from "../../../../components/FileUpload";

import Maindatefield from "../../../../components/Maindatefield";
import Maininputfield from "../../../../components/Maininputfield";
import Mainselectfield from "../../../../components/Mainselectfield";
import Progressbar from "../../../../components/Progressbar";
import Sidebar from "../../../../components/Sidebar";
import StatusChip from "../../../../components/StatusChip";
// import { correctVehicleStateName } from "../utility/utilityMethod";
import {
  addVehicle,
  uploadSingleSingleVehicleDocuments,
  uploadVehicleRegoDocuemnts,
} from "@/network-request/vehicle/vehicleApi";

import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { formatDate, formattedDate } from "@/utils";
import useLoading from "../../../../hooks/useLoading";
import SpinnerView from "../../../../constants/spinner";

const correctVehicleStateName = (stateName: string): string => {
  const nameMapping: { [key: string]: string } = {
    registrationNumber: "Registration Number",
    registrationExpiry: "Registration Expiry",
    vinNumber: "VIN Number",
    vehicleManufacturer: "Vehicle Manufacturer",
    vehicleModel: "Vehicle Model",
    vehicleType: "Vehicle Type",
    typeOfTrailer: "Type Of Trailer",
    stateOfRegistration: "State Of Registration",
    engineNumber: "Engine Number",
    compliancePlate: "Compliance Plate",
    ownershipStatus: "Ownership Status",
    registrationStatus: "Registration Status",
    insuranceCompanyName: "Insurance Company Name",
    policyNumber: "Policy Number",
    vehicleInsuranceStartDate: "Vehicle Insurance Start Date",
    renewalDate: "Renewal Date",
    dateValidUntil: "DateValid Until",
    daysLeft: "Days Left",
    insuranceCoverage: "Insurance Coverage",
    insuranceStatus: "Insurance Status",
    situation: "Situation",
    truckOdometer: "Truck Odometer",
    rentedCompanyName: "Rented Company Name",
    vehicleNumber: "Vehicle Number",
    trailerNumber: "Trailer Number",
    dateOfHire: "Date Of Hire",
    contractValidTill: "Contract Valid Till",
    term: "Term",
    weeklyRent: "Weekly Rent",
    tax: "Tax",
    paymentMethod: "Payment Method",
    bankName: "Bank Name",
    accountNumber: "Account Number",
    accountName: "Account Name",
    vehicleDocumentStatus: "Vehicle Document Status",
  };

  return nameMapping[stateName] || stateName;
};

const CreateVehicle = () => {
  const token = getCookie("token");
  const router = useRouter();

  const [vehicleDetails, setVehicleDetails] = useState<any>({
    registrationNumber: "",
    registrationExpiry: "",
    vinNumber: "",
    vehicleNumber: "",
    vehicleManufacturer: "",
    vehicleModel: "",
    vehicleType: "",
    typeOfTrailer: "",
    trailerNumber: "",
    stateOfRegistration: "",
    engineNumber: "",
    compliancePlate: "",
    ownershipStatus: "",
    registrationStatus: "",
    insuranceCompanyName: "",
    policyNumber: "",
    vehicleInsuranceStartDate: "",
    renewalDate: "",
    dateValidUntil: "",
    daysLeft: "",
    insuranceCoverage: "",
    insuranceStatus: "",
    situation: "",
    truckOdometer: "",
    vehicleUploadDocument: "",
    documents: [],
    rentedCompanyName: "",
    dateOfHire: "",
    contractValidTill: "",
    term: "",
    weeklyRent: "",
    tax: "",
    paymentMethod: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    vehicleDocumentStatus: "Complete",
  });

  const [error, setError] = useState<any>({
    registrationNumberError: "",
    registrationExpiryError: "",
    vinNumberError: "",
    vehicleNumberError: "",
    vehicleManufacturerError: "",
    vehicleModelError: "",
    vehicleTypeError: "",
    typeOfTrailerError: "",
    trailerNumberError: "",
    stateOfRegistrationError: "",
    engineNumberError: "",
    compliancePlateError: "",
    ownershipStatusError: "",
    registrationStatusError: "",
    insuranceCompanyNameError: "",
    policyNumberError: "",
    vehicleInsuranceStartDateError: "",
    renewalDateError: "",
    dateValidUntilError: "",
    daysLeftError: "",
    insuranceCoverageError: "",
    insuranceStatusError: "",
    situationError: "",
    truckOdometerError: "",
    rentedCompanyNameError: "",
    dateOfHireError: "",
    contractValidTillError: "",
    termError: "",
    weeklyRentError: "",
    taxError: "",
    paymentMethodError: "",
    bankNameError: "",
    accountNumberError: "",
    accountNameError: "",
    vehicleDocumentStatusError: "Complete",
  });

  const [documentDataCollection, setDocumentDataCollection] = useState<any>([]);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    // Calculate the progress based on the filled form inputs
    const calculateProgress = () => {
      const {
        rentedCompanyName,
        dateOfHire,
        contractValidTill,
        term,
        weeklyRent,
        tax,
        paymentMethod,
        bankName,
        accountNumber,
        accountName,
        vehicleDocumentStatus,
        vehicleUploadDocument,
        documents,
        ...rest
      } = vehicleDetails;

      // Count filled inputs (excluding the 'documents' array)
      const filledInputs = Object.values(rest).filter(
        (value) => value !== ""
      ).length;

      // Count total inputs (excluding the 'documents' array)
      const totalInputs = Object.keys(rest).length;
      const newProgress = (filledInputs / totalInputs) * 100;
      setProgress(Math.ceil(newProgress));
    };

    calculateProgress();
  }, [vehicleDetails]);

  console.log("vehicleDetails", vehicleDetails);
  console.log("progress", progress);
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

  const checkValidation = () => {
    const newErrors = { ...error };
    let hasErrors = false;
    Object.keys(vehicleDetails).forEach((key) => {
      if (
        typeof vehicleDetails[key] === "object" &&
        vehicleDetails[key] !== null
      ) {
        // Handle nested objects with a different logic
        Object.keys(vehicleDetails[key]).forEach((nestedKey) => {
          const nestedKeyPath = `${key}Error.${nestedKey}`;
          if (
            !vehicleDetails[key][nestedKey] ||
            vehicleDetails[key][nestedKey] === undefined
          ) {
            newErrors[key + "Error"][
              nestedKey
            ] = `${nestedKey} is required in ${key}`;
            hasErrors = true;
          } else {
            newErrors[nestedKeyPath] = "";
          }
        });
      } else {
        // Handle non-nested fields
        // Auto scroll up for better user experience
        window.scrollTo({
          top: 0,
          behavior: "smooth", // for smooth scrolling
        });

        if (
          key !== "rentedCompanyName" &&
          key !== "dateOfHire" &&
          key !== "contractValidTill" &&
          key !== "term" &&
          key !== "weeklyRent" &&
          key !== "tax" &&
          key !== "paymentMethod" &&
          key !== "bankName" &&
          key !== "accountNumber" &&
          key !== "accountName" &&
          key !== "vehicleUploadDocument"
        ) {
          if (!vehicleDetails[key]) {
            newErrors[key + "Error"] = `${correctVehicleStateName(
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
    // Return the error status
    return hasErrors;
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
    setSelectedUploadRegoDocument,
    setDocumentRender
  );

  // const [selectedFiles, setSelectedFiles] = useState<
  //   { id: number; file: File; currentDate: Date | null }[]
  // >([]);

  // const [selectedFileContent, setSelectedFileContent] = useState<string | null>(
  //   null
  // );
  // const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  // const handleFileChanges = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   documentId: number
  // ) => {
  //   const file = event.target.files ? event.target.files[0] : null;
  //   const documentExists = documentDataCollection.find(
  //     (doc: any) => doc.id === documentId
  //   );
  //   if (file && documentExists) {
  //     const newSelectedFiles = [...selectedFiles];
  //     const existingFileIndex = newSelectedFiles.findIndex(
  //       (file) => file.id === documentId
  //     );
  //     const currentDate = new Date();
  //     if (existingFileIndex !== -1) {
  //       newSelectedFiles[existingFileIndex] = {
  //         id: documentId,
  //         file,
  //         currentDate,
  //       };
  //     } else {
  //       newSelectedFiles.push({ id: documentId, file, currentDate });
  //     }
  //     setSelectedFiles(newSelectedFiles);
  //   }
  // };

  const [selectedFiles, setSelectedFiles] = useState<
    {
      id: number;
      file: File;
      currentDate: Date | null;
      content: string | null;
    }[]
  >([]);

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
          content: null, // Initialize content as null
        };
      } else {
        newSelectedFiles.push({
          id: documentId,
          file,
          currentDate,
          content: null,
        });
      }

      setSelectedFiles(newSelectedFiles);

      // Read and set the PDF file content
      readPDFFile(file, (result: any) => {
        // Update selectedFiles with the new content
        const updatedFiles = newSelectedFiles.map((file) =>
          file.id === documentId ? { ...file, content: result } : file
        );
        setSelectedFiles(updatedFiles);
      });
    }
  };

  const readPDFFile = (file: any, callback: any) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      callback(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleOpenPreview = (documentId: number) => {
    // Open a new tab for the selected document ID
    const selectedFile = selectedFiles.find((file) => file.id === documentId);

    if (selectedFile?.content) {
      const newTab: any = window.open();
      newTab.document.write(
        `<embed src="${selectedFile.content}" width="100%" height="100%"/>`
      );
    }
  };

  // ======================================== Handle status chip color on vehicle documents list ========================================
  const [selectedStatusValues, setSelectedStatusValues] = useState<any[]>([]);
  const handleStatusChipColor = (value: any, index: number) => {
    setSelectedStatusValues((prevState) => {
      const updatedValues = [...prevState];
      updatedValues[index] = value;
      return updatedValues;
    });
  };

  // ======================================== Meeting on 23-Feb-2024 ========================================
  // Changes array to objects by using accumulator ...
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

  const [uploadStatus, setUploadStatus] = useState<{ [id: number]: boolean }>(
    {}
  );
  const [urls, setUrls] = useState<string[]>([]);
  const [showUploadMessage, setShowUploadMessage] = useState(false);

  const handleUploadFileWithId = async (id: number, combinedObject: any) => {
    try {
      const project = combinedObject[id];
      if (id && project?.id) {
        const file = [project?.file];
        const uploadDocumentResponses = await Promise.all(
          Object.values(file)?.map((file) =>
            uploadSingleSingleVehicleDocuments(file)
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
    acc[index] = url;
    return acc;
  }, []);

  // const handleViewDocuments = (id: number) => {
  //     const index = id;
  //     if (index >= 1 && index < modifiedUrls.length) {
  //       const url = modifiedUrls[index];
  //       window.open(url, "_blank");
  //     } else {
  //       console.error("URL not found for id:", id);
  //     }
  //   };
  const handleViewDocuments = (id: number) => {
    const index = id - 1; // Adjust index to start from 0
    if (index >= 0 && index < modifiedUrls.length) {
      const url = modifiedUrls[index];
      window.open(url, "_blank");
    } else {
      console.error("URL not found for id:", id);
    }
  };

  // const handleViewDocuments = (id: number) => {
  //   const index = id;
  //   if (index >= 1 && index <= modifiedUrls.length) {
  //     const url = modifiedUrls[index];
  //     window.open(url, "_blank");
  //   } else {
  //     console.error("URL not found for id:", id);
  //   }
  // };

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

    const uploadDocument = await Promise.all(
      Object.values(selectedUploadRegoDocument)?.map((file) =>
        uploadVehicleRegoDocuemnts(file)
      )
    );

    const customVehiclePayload = {
      ...vehicleDetails,
      vehicleUploadDocument: uploadDocument[0]?.response,
      documents: urls?.map((url: any, index: number) => ({
        type: url,
        uploadDate: formattedDate,
        status: selectedStatusValues[index % selectedStatusValues.length],
      })),
    };

    const response: any = await addVehicle(customVehiclePayload, token || "");
    if (response?.status == 200) {
      toast("Vehicle has been successfully created..", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setTimeout(() => {
        router.push("/onboarding/vehicle-list");
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

  // Function to calculate the difference in days
  const calculateDaysDifference = () => {
    const renewalDate: any = new Date(vehicleDetails.renewalDate);
    const dateValidUntil: any = new Date(vehicleDetails.dateValidUntil);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = dateValidUntil - renewalDate;

    // Convert milliseconds to days
    const differenceInDays = Math.ceil(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    setVehicleDetails({
      ...vehicleDetails,
      daysLeft: differenceInDays.toString(),
    });
  };

  useEffect(() => {
    if (
      vehicleDetails.renewalDate !== "" &&
      vehicleDetails.dateValidUntil !== ""
    ) {
      calculateDaysDifference();
    }
  }, [vehicleDetails.renewalDate, vehicleDetails.dateValidUntil]);

  return (
    <>
      <div className="flex bg-[#F8F8F8]">
        <div>
          <Toaster />
        </div>
        <div className="ml-[316px] w-full mt-4">
          <div className="bg-white mr-4 flex justify-between items-center rounded-md">
            <h2 className=" w-full p-4 rounded-md font-bold text-[#16161D] text-[24px]">
              Add Vehicle
            </h2>
            <div className="h-8 w-8 flex justify-center cursor-pointer text-2xl items-center bg-blueGrey-100 rounded-full mr-4">
              <span className="mt-[-2px] ml-[2px] text-[#292D32] rotate-45">
                +
              </span>
            </div>
          </div>
          <div className="bg-white mr-4 px-4 rounded-md mt-4 p-4">
            <Progressbar value={progress} />
            <div>
              <h3 className="text-black w-full my-4 rounded-md font-semibold">
                Vehicle Information
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <Maininputfield
                  label="Registration Number"
                  value={vehicleDetails.registrationNumber}
                  onChange={(e: any) => {
                    setVehicleDetails({
                      ...vehicleDetails,
                      registrationNumber: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        registrationNumberError: "",
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.registrationNumberError}
                />
                <Maindatefield
                  label="Registration Expiry"
                  value={vehicleDetails.registrationExpiry}
                  onChange={(e: any) => {
                    setVehicleDetails({
                      ...vehicleDetails,
                      registrationExpiry: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        registrationExpiryError: "",
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.registrationExpiryError}
                />
                <Maininputfield
                  label="VIN No."
                  value={vehicleDetails.vinNumber}
                  onChange={(e: any) => {
                    setVehicleDetails({
                      ...vehicleDetails,
                      vinNumber: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        vinNumberError: "",
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.vinNumberError}
                />
                <Maininputfield
                  label="Vehicle Number"
                  value={vehicleDetails.vehicleNumber}
                  onChange={(e: any) => {
                    setVehicleDetails({
                      ...vehicleDetails,
                      vehicleNumber: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        vehicleNumberError: "",
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.vehicleNumberError}
                />

                <Maininputfield
                  label="Vehicle Manufacturer"
                  className="w-full"
                  value={vehicleDetails.vehicleManufacturer}
                  onChange={(e: any) => {
                    setVehicleDetails({
                      ...vehicleDetails,
                      vehicleManufacturer: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        vehicleManufacturerError: "",
                      });
                    }
                  }}
                  errorMessage={error.vehicleManufacturerError}
                />
                <Maininputfield
                  label="Vehicle Model"
                  value={vehicleDetails.vehicleModel}
                  onChange={(e: any) => {
                    setVehicleDetails({
                      ...vehicleDetails,
                      vehicleModel: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        vehicleModelError: "",
                      });
                    }
                  }}
                  errorMessage={error.vehicleModelError}
                  className="w-full"
                />
                <div>
                  <DropDownMap
                    label="Vehicle Type"
                    mapOption={vehicleTypeColleciton}
                    // selectedData={selectedData}
                    // setSelectedData={setSelectedData}
                    value={vehicleDetails.vehicleType}
                    onChange={(e: any) => {
                      setVehicleDetails({
                        ...vehicleDetails,
                        vehicleType: e.target.value,
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          vehicleTypeError: "",
                        });
                      }
                    }}
                    errorMessage={error.vehicleTypeError}
                  />

                  {vehicleDetails.vehicleType === "Other" && (
                    <div className="mt-3">
                      <Maininputfield label="Other" className="w-full" />
                    </div>
                  )}
                </div>
                <div>
                  <DropDownMap
                    label="Type of Trailer"
                    mapOption={trailerTypeCollection}
                    // selectedData={selectedData}
                    // setSelectedData={setSelectedData}
                    value={vehicleDetails.typeOfTrailer}
                    onChange={(e: any) => {
                      setVehicleDetails({
                        ...vehicleDetails,
                        typeOfTrailer: e.target.value,
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          typeOfTrailerError: "",
                        });
                      }
                    }}
                    errorMessage={error.typeOfTrailerError}
                  />
                  {vehicleDetails.typeOfTrailer === "Other" && (
                    <div className="mt-3">
                      <Maininputfield label="Other" className="w-full" />
                    </div>
                  )}
                </div>

                <Maininputfield
                  label="Trailer Number"
                  value={vehicleDetails.trailerNumber}
                  onChange={(e: any) => {
                    setVehicleDetails({
                      ...vehicleDetails,
                      trailerNumber: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        trailerNumberError: "",
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.trailerNumberError}
                />
                <div>
                  <DropDownMap
                    label="State of Registration"
                    mapOption={registrationStateCollection}
                    // selectedData={selectedData}
                    // setSelectedData={setSelectedData}
                    value={vehicleDetails.stateOfRegistration}
                    onChange={(e: any) => {
                      setVehicleDetails({
                        ...vehicleDetails,
                        stateOfRegistration: e.target.value,
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          stateOfRegistrationError: "",
                        });
                      }
                    }}
                    errorMessage={error.stateOfRegistrationError}
                  />
                  {vehicleDetails.stateOfRegistration === "Other" && (
                    <div className="mt-3">
                      <Maininputfield label="Other" className="w-full" />
                    </div>
                  )}
                </div>

                {/* <Mainselectfield label="Type of Trailer" option="Straight" /> */}
                {/* <Mainselectfield
                  label="State of Registration"
                  option="Victoria"
                /> */}
                <Maininputfield
                  label="Engine Number"
                  value={vehicleDetails.engineNumber}
                  onChange={(e: any) => {
                    setVehicleDetails({
                      ...vehicleDetails,
                      engineNumber: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        engineNumberError: "",
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.engineNumberError}
                />
                <Maininputfield
                  label="Compliance Plate"
                  value={vehicleDetails.compliancePlate}
                  onChange={(e: any) => {
                    setVehicleDetails({
                      ...vehicleDetails,
                      compliancePlate: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        compliancePlateError: "",
                      });
                    }
                  }}
                  className="w-full"
                  errorMessage={error.compliancePlateError}
                />
                <div>
                  <DropDownMap
                    label={"Registration Status"}
                    mapOption={registrationStatusCollection}
                    // selectedData={selectedData}
                    // setSelectedData={setSelectedData}
                    value={vehicleDetails.registrationStatus}
                    onChange={(e: any) => {
                      setVehicleDetails({
                        ...vehicleDetails,
                        registrationStatus: e.target.value,
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          registrationStatusError: "",
                        });
                      }
                    }}
                    errorMessage={error.registrationStatusError}
                  />
                  {vehicleDetails.registrationStatus === "Other" && (
                    <div className="mt-3">
                      <Maininputfield label="Other" className="w-full" />
                    </div>
                  )}
                </div>
                <div>
                  <DropDownMap
                    label={"Ownership Status"}
                    mapOption={ownershipStatus}
                    // selectedData={selectedData}
                    // setSelectedData={setSelectedData}
                    value={vehicleDetails.ownershipStatus}
                    onChange={(e: any) => {
                      setVehicleDetails({
                        ...vehicleDetails,
                        ownershipStatus: e.target.value,
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          ownershipStatusError: "",
                        });
                      }
                    }}
                    errorMessage={error.ownershipStatusError}
                  />
                  {vehicleDetails.ownershipStatus === "Other" && (
                    <div className="mt-3">
                      <Maininputfield label="Other" className="w-full" />
                    </div>
                  )}
                </div>

                {vehicleDetails.ownershipStatus === "Hired" && (
                  // {selectedData === "Hired" && (
                  <>
                    <Maininputfield
                      label="Rented Company"
                      value={vehicleDetails.rentedCompanyName}
                      onChange={(e: any) => {
                        setVehicleDetails({
                          ...vehicleDetails,
                          rentedCompanyName: e.target.value,
                        });
                        if (e.target.value.length > 0) {
                          setError({
                            ...error,
                            rentedCompanyNameError: "",
                          });
                        }
                      }}
                      className="w-full"
                      errorMessage={error.rentedCompanyNameError}
                    />
                    <Maindatefield
                      label="Date of Hire"
                      value={vehicleDetails.dateOfHire}
                      onChange={(e: any) => {
                        setVehicleDetails({
                          ...vehicleDetails,
                          dateOfHire: e.target.value,
                        });
                        if (e.target.value.length > 0) {
                          setError({
                            ...error,
                            dateOfHireError: "",
                          });
                        }
                      }}
                      errorMessage={error.dateOfHireError}
                    />
                    <Maindatefield
                      label="Contract Valid Till"
                      value={vehicleDetails.contractValidTill}
                      onChange={(e: any) => {
                        setVehicleDetails({
                          ...vehicleDetails,
                          contractValidTill: e.target.value,
                        });
                        if (e.target.value.length > 0) {
                          setError({
                            ...error,
                            contractValidTillError: "",
                          });
                        }
                      }}
                      errorMessage={error.contractValidTillError}
                    />
                    <div>
                      <DropDownMap
                        label={"Term"}
                        mapOption={termCollection}
                        // selectedData={state}
                        // setSelectedData={setState}
                        value={vehicleDetails.term}
                        onChange={(e: any) => {
                          setVehicleDetails({
                            ...vehicleDetails,
                            term: e.target.value,
                          });
                          if (e.target.value.length > 0) {
                            setError({
                              ...error,
                              termError: "",
                            });
                          }
                        }}
                        errorMessage={error.termError}
                      />
                      {vehicleDetails.term === "Other" && (
                        <div className="mt-3">
                          <Maininputfield label="Other" className="w-full" />
                        </div>
                      )}
                    </div>

                    <Maininputfield
                      label="Weekly Rent"
                      value={vehicleDetails.weeklyRent}
                      onChange={(e: any) => {
                        setVehicleDetails({
                          ...vehicleDetails,
                          weeklyRent: e.target.value,
                        });
                        if (e.target.value.length > 0) {
                          setError({
                            ...error,
                            weeklyRentError: "",
                          });
                        }
                      }}
                      className="w-full"
                      errorMessage={error.weeklyRentError}
                    />
                    <div>
                      <DropDownMap
                        label={"Tax"}
                        mapOption={taxCollection}
                        // selectedData={state}
                        // setSelectedData={setState}
                        value={vehicleDetails.tax}
                        onChange={(e: any) => {
                          setVehicleDetails({
                            ...vehicleDetails,
                            tax: e.target.value,
                          });
                          if (e.target.value.length > 0) {
                            setError({
                              ...error,
                              taxError: "",
                            });
                          }
                        }}
                        errorMessage={error.taxError}
                      />
                      {vehicleDetails.tax === "Other" && (
                        <div className="mt-3">
                          <Maininputfield label="Other" className="w-full" />
                        </div>
                      )}
                    </div>
                    <div>
                      <DropDownMap
                        label={"Payment Method"}
                        mapOption={paymentMethodColleciton}
                        // selectedData={state}
                        // setSelectedData={setState}

                        value={vehicleDetails.paymentMethod}
                        onChange={(e: any) => {
                          setVehicleDetails({
                            ...vehicleDetails,
                            paymentMethod: e.target.value,
                          });
                          if (e.target.value.length > 0) {
                            setError({
                              ...error,
                              paymentMethodError: "",
                            });
                          }
                        }}
                        errorMessage={error.paymentMethodError}
                      />
                      {vehicleDetails.paymentMethod === "Other" && (
                        <div className="mt-3">
                          <Maininputfield label="Other" className="w-full" />
                        </div>
                      )}
                    </div>
                  </>
                )}
                <FileUpload
                  file="Upload Rego Document"
                  id="vehicleRegoFile"
                  onChange={handleProfileFileChange}
                  name="vehicleRegoDocument"
                  //@ts-expect-error
                  fileName={selectedUploadRegoDocument?.file?.name || ""}
                />

                {/* <Mainselectfield label="Registration Status" option="Active" /> */}
              </div>
              {vehicleDetails.ownershipStatus === "Hired" && (
                //  {selectedData === "Hired" && (
                <div className="mt-8">
                  <h3 className="text-black w-full mb-4 font-semibold">
                    Bank Details
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <Maininputfield
                      label="BSB"
                      value={vehicleDetails.bankName}
                      onChange={(e: any) => {
                        setVehicleDetails({
                          ...vehicleDetails,
                          bankName: e.target.value,
                        });
                        if (e.target.value.length > 0) {
                          setError({
                            ...error,
                            bankNameError: "",
                          });
                        }
                      }}
                      className="w-full"
                      errorMessage={error.bankNameError}
                    />
                    <Maininputfield
                      label="Account Number"
                      value={vehicleDetails.accountNumber}
                      onChange={(e: any) => {
                        setVehicleDetails({
                          ...vehicleDetails,
                          accountNumber: e.target.value,
                        });
                        if (e.target.value.length > 0) {
                          setError({
                            ...error,
                            accountNumberError: "",
                          });
                        }
                      }}
                      className="w-full"
                      errorMessage={error.accountNumberError}
                    />
                    <Maininputfield
                      label="Account Name"
                      value={vehicleDetails.accountName}
                      onChange={(e: any) => {
                        setVehicleDetails({
                          ...vehicleDetails,
                          accountName: e.target.value,
                        });
                        if (e.target.value.length > 0) {
                          setError({
                            ...error,
                            accountNameError: "",
                          });
                        }
                      }}
                      className="w-full"
                      errorMessage={error.accountNameError}
                    />
                  </div>
                </div>
              )}
              <div className="mt-8">
                <h3 className="text-black w-full mb-4 font-semibold">
                  Vehicle Insurance
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <Maininputfield
                    label="Insurance Company"
                    className="w-full"
                    value={vehicleDetails.insuranceCompanyName}
                    onChange={(e: any) => {
                      setVehicleDetails({
                        ...vehicleDetails,
                        insuranceCompanyName: e.target.value,
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          insuranceCompanyNameError: "",
                        });
                      }
                    }}
                    errorMessage={error.insuranceCompanyNameError}
                  />
                  <Maininputfield
                    label="Policy Number"
                    className="w-full"
                    value={vehicleDetails.policyNumber}
                    onChange={(e: any) => {
                      setVehicleDetails({
                        ...vehicleDetails,
                        policyNumber: e.target.value,
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          policyNumberError: "",
                        });
                      }
                    }}
                    errorMessage={error.policyNumberError}
                  />
                  <Maindatefield
                    label="Vehicle Insurance Start Date"
                    value={vehicleDetails.vehicleInsuranceStartDate}
                    onChange={(e: any) => {
                      setVehicleDetails({
                        ...vehicleDetails,
                        vehicleInsuranceStartDate: e.target.value,
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          vehicleInsuranceStartDateError: "",
                        });
                      }
                    }}
                    errorMessage={error.vehicleInsuranceStartDateError}
                  />
                  <Maindatefield
                    label="Renewal Date"
                    value={vehicleDetails.renewalDate}
                    onChange={(e: any) => {
                      setVehicleDetails({
                        ...vehicleDetails,
                        renewalDate: e.target.value,
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          renewalDateError: "",
                        });
                      }
                    }}
                    errorMessage={error.renewalDateError}
                  />
                  <Maindatefield
                    label="Date Valid Until"
                    value={vehicleDetails.dateValidUntil}
                    onChange={(e: any) => {
                      setVehicleDetails({
                        ...vehicleDetails,
                        dateValidUntil: e.target.value,
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          dateValidUntilError: "",
                        });
                      }
                    }}
                    errorMessage={error.dateValidUntilError}
                    min={vehicleDetails.renewalDate}
                  />
                  <Maininputfield
                    label="Days Left"
                    value={vehicleDetails.daysLeft}
                    onChange={(e: any) => {
                      setVehicleDetails({
                        ...vehicleDetails,
                        daysLeft: e.target.value,
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          daysLeftError: "",
                        });
                      }
                    }}
                    errorMessage={error.daysLeftError}
                    className="w-full"
                  />
                  {/* <Mainselectfield
                    label="Insurance Coverage"
                    option="$1 Million Coverage"
                  /> */}
                  <div>
                    <DropDownMap
                      mapOption={insuranceCoverageCollection}
                      label="Insurance Coverage"
                      // selectedData={state}
                      // setSelectedData={setState}
                      value={vehicleDetails.insuranceCoverage}
                      onChange={(e: any) => {
                        setVehicleDetails({
                          ...vehicleDetails,
                          insuranceCoverage: e.target.value,
                        });
                        if (e.target.value.length > 0) {
                          setError({
                            ...error,
                            insuranceCoverageError: "",
                          });
                        }
                      }}
                      errorMessage={error.insuranceCoverageError}
                    />
                    {vehicleDetails.insuranceCoverage === "Other" && (
                      <div className="mt-3">
                        <Maininputfield label="Other" className="w-full" />
                      </div>
                    )}
                  </div>
                  <div>
                    <DropDownMap
                      mapOption={insuranceStatusCollection}
                      label="Insurance Status"
                      // selectedData={state}
                      // setSelectedData={setState}
                      value={vehicleDetails.insuranceStatus}
                      onChange={(e: any) => {
                        setVehicleDetails({
                          ...vehicleDetails,
                          insuranceStatus: e.target.value,
                        });
                        if (e.target.value.length > 0) {
                          setError({
                            ...error,
                            insuranceStatusError: "",
                          });
                        }
                      }}
                      errorMessage={error.insuranceStatusError}
                    />{" "}
                    {vehicleDetails.insuranceStatus === "Other" && (
                      <div className="mt-3">
                        <Maininputfield label="Other" className="w-full" />
                      </div>
                    )}
                  </div>
                  <div>
                    <DropDownMap
                      mapOption={situationCollection}
                      label="Situation"
                      // selectedData={state}
                      // setSelectedData={setState}
                      value={vehicleDetails.situation}
                      onChange={(e: any) => {
                        setVehicleDetails({
                          ...vehicleDetails,
                          situation: e.target.value,
                        });
                        if (e.target.value.length > 0) {
                          setError({
                            ...error,
                            situationError: "",
                          });
                        }
                      }}
                      errorMessage={error.situationError}
                    />
                    {vehicleDetails.situation === "Other" && (
                      <div className="mt-3">
                        <Maininputfield label="Other" className="w-full" />
                      </div>
                    )}
                  </div>

                  {/* <Mainselectfield label="Insurance Status" option="Active" /> */}
                  {/* <Mainselectfield label="Situation" option="Anywhere" /> */}
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-black w-full mb-4 font-semibold">
                  Truck Odometer
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <Maininputfield
                    label="Truck Odometer"
                    value={vehicleDetails.truckOdometer}
                    onChange={(e: any) => {
                      setVehicleDetails({
                        ...vehicleDetails,
                        truckOdometer: e.target.value,
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          truckOdometerError: "",
                        });
                      }
                    }}
                    className="w-full"
                    errorMessage={error.truckOdometerError}
                  />
                </div>
              </div>
              <div className="mt-8">
                <div className="flex">
                  <h3 className="text-black w-full mb-4 text-[16px] font-semibold">
                    Documents
                  </h3>
                  <button
                    onClick={handleAddRow}
                    className="text-white mb-2 flex justify-center items-center font-thin bg-[#2B36D9] w-[48px] h-[48px] pb-2 rounded-full text-[40px]"
                  >
                    +
                  </button>
                </div>

                <div className="grid grid-cols-[16%_16%_16%_16%_16%_20%] text-black bg-[#EFF2F3] py-4 rounded-md flex text-center">
                  {vehicleDocumentCollection?.map((value, index) => {
                    return (
                      <>
                        <div
                          className="font-semibold text-sm text-[#151515]"
                          key={index}
                        >
                          {value.heading}
                        </div>
                      </>
                    );
                  })}
                </div>

                <div>
                  <div>
                    {documentDataCollection?.map((data: any, index: any) => (
                      <div
                        className="text-black grid grid-cols-[16%_16%_16%_16%_16%_20%] py-4 flex text-center"
                        key={index}
                      >
                        <div>
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
                              <span className="!w-fit m-auto bg-[#2B36D9] py-2  text-sm px-6 rounded-full mb-6 font-semibold placeholder:py-[4px] text-white">
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
                        <div>
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
                        <div className="text-center  items-center justify-center m-auto">
                          <StatusChip
                            chipColor={(e: any) =>
                              handleStatusChipColor(e, index)
                            }
                          />
                        </div>
                        <div className="underline decoration-[#2B36D9] text-center">
                          <span
                            className="cursor-pointer text-primary"
                            onClick={() => handleOpenPreview(data?.id)}
                          >
                            Views
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mr-4 px-4 rounded-md mt-4 mb-20 p-4 flex justify-end gap-2">
            <Button
              text="Save"
              className="!bg-transparent !text-[#000] border px-8 !rounded-xl text-sm border-[#032272]"
            />
            <Button
              onClick={handleSubmit}
              text="Create"
              className="px-8 !rounded-xl text-sm"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateVehicle;
const vehicleDocumentCollection = [
  {
    heading: "Document Name",
  },
  {
    heading: "Attachment",
  },
  {
    heading: "Upload Date",
  },
  {
    heading: "Uploaded Doc.",
  },
  {
    heading: "Status",
  },
  {
    heading: "View Doc.",
  },
];
// const documentDataCollection = [
//   {
//     id: 1,
//     Vehicle: "Placeholder",
//     rego: "Placeholder",
//     uploadDate: "19/12/2023",
//     UploadedDoc: "doc.pdf",
//     status: "Approved",
//     viewDoc: "view",
//   },
//   {
//     id: 2,
//     Vehicle: "Placeholder",
//     rego: "Placeholder",
//     uploadDate: "14/12/2023",
//     UploadedDoc: "doc.pdf",
//     status: "Approved",
//     viewDoc: "view",
//   },
//   {
//     id: 3,
//     Vehicle: "Placeholder",
//     rego: "Placeholder",
//     uploadDate: "20/12/2023",
//     UploadedDoc: "doc.pdf",
//     status: "Approved",
//     viewDoc: "view",
//   },
// ];
const ownershipStatus = [
  {
    value: "Owned",
  },
  {
    value: "Hired",
  },
  {
    value: "Sub-Contractor",
  },
  {
    value: "Other",
  },
];
const vehicleTypeColleciton = [
  {
    value: "Prime Mover",
  },
  {
    value: "Trailer A",
  },
  {
    value: "Trailer B",
  },
  {
    value: "Foklift",
  },
  {
    value: "Car",
  },
  {
    value: "UTE",
  },
  {
    value: "Other",
  },
];
const trailerTypeCollection = [
  {
    value: "Straight",
  },
  { value: "Drop" },
  {
    value: "Freezer",
  },
  {
    value: "Mezz",
  },
  {
    value: "Box",
  },
  {
    value: "Dog",
  },
  {
    value: "Semi",
  },
  {
    value: "Low loader",
  },
  {
    value: "Tag",
  },
  {
    value: "Drop Decks with Ramps",
  },
  {
    value: "Drop Decks with Ramps",
  },
  {
    value: "B-Doubles",
  },
  {
    value: "Oversize Road Train",
  },
  {
    value: "Other",
  },
];
const registrationStateCollection = [
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
    value: "Western Australia",
  },
  {
    value: "Other",
  },
];
const registrationStatusCollection = [
  {
    value: "Active",
  },
  {
    value: "Cancelled",
  },
  {
    value: "Suspended",
  },
  {
    value: "Renewal Pending",
  },
  {
    value: "Other",
  },
];
const termCollection = [
  {
    value: "Weekly",
  },
  {
    value: "Fortnight",
  },
  {
    value: "Monthly",
  },
  {
    value: "Other",
  },
];
const taxCollection = [
  {
    value: "Inclusive",
  },
  {
    value: "Exclusive",
  },
  {
    value: "Free",
  },
  {
    value: "Other",
  },
];
const paymentMethodColleciton = [
  {
    value: "Credit Card",
  },
  {
    value: "Other",
  },
];
const insuranceCoverageCollection = [
  {
    value: "$1 Million Coverage",
  },
  {
    value: "$2 Million Coverage",
  },
  {
    value: "$3 Million Coverage",
  },
  {
    value: "$5 Million Coverage",
  },
  {
    value: "$10 Million Coverage",
  },
  {
    value: "Other",
  },
];
const insuranceStatusCollection = [
  {
    value: "Active",
  },
  {
    value: "Expired",
  },
  {
    value: "Renewed",
  },
  {
    value: "Other",
  },
];
const situationCollection = [
  {
    value: "Anywhere",
  },
  {
    value: "Limited",
  },
  {
    value: "Other",
  },
];
