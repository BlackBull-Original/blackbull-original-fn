import { useEffect, useState } from "react";
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
  editVehicle,
  getVehicle,
  uploadVehicleRegoDocuemnts,
  // uploadMulitpleVehicleDocuments,
} from "@/network-request/vehicle/vehicleApi";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { formatDate, formattedDate } from "@/utils";
interface SelectedFile {
  id: number;
  file: File | null;
}

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

const EditVehicle = () => {
  const token = getCookie("token");
  const router = useRouter();
  const xyz = ownershipStatus?.map((item) => {
    return item;
  });
  const id = router.query.id;

  const [ownerStatus, setOwnerStatus] = useState("");
  console.log("owner status on select", ownerStatus);
  const [selectedData, setSelectedData] = useState("");
  const [state, setState] = useState("");

  const [vehicleDetails, setVehicleDetails] = useState<any>({
    registrationNumber: "",
    registrationExpiry: "",
    vinNumber: "",
    vehicleManufacturer: "",
    vehicleModel: "",
    vehicleType: "",
    typeOfTrailer: "",
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
    vehicleManufacturerError: "",
    vehicleModelError: "",
    vehicleTypeError: "",
    typeOfTrailerError: "",
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
    // documents: [
    //   { type: "Registration Certificate", uploadDate: "2023-01-15" },
    //   { type: "Insurance Policy", uploadDate: "2023-01-20" },
    // ],
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
  });

  useEffect(() => {
    getVehicleAndSettoState();
  }, []);

  const getVehicleAndSettoState = async () => {
    const response = await getVehicle(token as string, id as string);

    if (response?.status == 200) {
      const data = response?.data;
      console.log({ data });

      setVehicleDetails({
        ...vehicleDetails,
        registrationNumber: data?.data?.registrationNumber,
        registrationExpiry: data?.data?.registrationExpiry,
        vinNumber: data?.data?.vinNumber,
        vehicleManufacturer: data?.data?.vehicleManufacturer,
        vehicleModel: data?.data?.vehicleModel,
        vehicleType: data?.data?.vehicleType,
        typeOfTrailer: data?.data?.typeOfTrailer,
        stateOfRegistration: data?.data?.stateOfRegistration,
        engineNumber: data?.data?.engineNumber,
        compliancePlate: data?.data?.compliancePlate,
        ownershipStatus: data?.data?.ownershipStatus,
        registrationStatus: data?.data?.registrationStatus,
        insuranceCompanyName: data?.data?.insuranceCompanyName,
        policyNumber: data?.data?.policyNumber,
        vehicleInsuranceStartDate: data?.data?.vehicleInsuranceStartDate,
        renewalDate: data?.data?.renewalDate,
        dateValidUntil: data?.data?.dateValidUntil,
        daysLeft: data?.data?.daysLeft,
        insuranceCoverage: data?.data?.insuranceCoverage,
        insuranceStatus: data?.data?.insuranceStatus,
        situation: data?.data?.situation,
        truckOdometer: data?.data?.truckOdometer,
        // documents: [
        //   { type: "Registration Certificate", uploadDate: "2023-01-15" },
        //   { type: "Insurance Policy", uploadDate: "2023-01-20" },
        // ],
        rentedCompanyName: data?.data?.rentedCompanyName,
        dateOfHire: data?.data?.dateOfHire,
        contractValidTill: data?.data?.contractValidTill,
        term: data?.data?.term,
        weeklyRent: data?.data?.weeklyRent,
        tax: data?.data?.tax,
        paymentMethod: data?.data?.paymentMethod,
        bankName: data?.data?.bankName,
        accountNumber: data?.data?.accountNumber,
        accountName: data?.data?.accountName,
        vehicleDocumentStatus: data?.data?.vehicleDocumentStatus,
      });
    }
  };

  const handleSubmit = async () => {
    let urls;
    // Check validation and get error status
    const hasErrors = checkValidation();
    console.log("Vehicle State : ", vehicleDetails);
    console.log("Error State", error);
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
    console.log({ uploadDocument });

    // try {
    //   const profileUrls = await Promise.all(
    //     Object.values(files).map((imageInfo) =>
    //       uploadMulitpleVehicleDocuments(imageInfo)
    //     )
    //   );
    //   console.log({ profileUrls });
    //   urls = profileUrls.flatMap((entry) => entry.response);

    //   console.log({ urls });
    // } catch (error) {
    //   console.error("Error uploading files:", error);
    // }

    const customVehiclePayload = {
      ...vehicleDetails,
      vehicleUploadDocument: uploadDocument[0]?.response,
      // documents: urls?.map((url: any, index: number) => ({
      //   type: url,
      //   uploadDate: formattedDate,
      // })),
    };
    console.log({ customVehiclePayload });

    const response: any = await editVehicle(
      token as string,
      id as string,
      customVehiclePayload
    );
    if (response?.status == 200) {
      toast("Vehicle Updated Successfully", {
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
      console.log("response :", response);
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

        console.log("Key Name", key);

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
          key !== "documents" &&
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

  const [documentRender, setDocumentRender] = useState("");
  const [selectedUploadRegoDocument, setSelectedUploadRegoDocument] =
    useState("");

  const handleFileChange = (setSide: any, setPreview: any) => (event: any) => {
    const selectedFile = event.target.files && event.target.files[0];
    console.log({ selectedFile });
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

  console.log({ selectedUploadRegoDocument });

  const handleViewDocuments = () => {
    window.open("http://localhost:1800/vehicle-documents/Resume.pdf", "_blank");
  };

  const [selectedFiles, setSelectedFiles] = useState<
    { id: number; file: File; currentDate: Date | null }[]
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
        };
      } else {
        newSelectedFiles.push({ id: documentId, file, currentDate });
      }
      setSelectedFiles(newSelectedFiles);
    }
  };
  console.log({ selectedFiles });
  const files = selectedFiles?.map((selectedFile) => selectedFile.file);
  console.log({ files });

  return (
    <>
      <div className="flex bg-[#E9EFFF]">
        <div>
          <Toaster />
        </div>
        <div className="ml-[316px] w-full mt-4">
          <div className="bg-white mr-4 flex justify-between items-center rounded-md">
            <h2 className=" w-full p-4 rounded-md font-bold text-[#16161D] text-[24px]">
              Update Vehicle
            </h2>
            <div className="h-8 w-8 flex justify-center cursor-pointer text-2xl items-center bg-blueGrey-100 rounded-full mr-4">
              <span className="mt-[-2px] ml-[2px] text-[#292D32] rotate-45">
                +
              </span>
            </div>
          </div>
          <div className="bg-white mr-4 px-4 rounded-md mt-4 p-4">
            <Progressbar />
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
                {/* <Mainselectfield label="Vehicle Type" option="Choose vehicle" /> */}
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
                  </>
                )}
                <FileUpload
                  file="Upload Rego Document"
                  onChange={handleProfileFileChange}
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
                  />
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
                <h3 className="text-black w-full mb-4 font-semibold">
                  Vehicle Documents
                </h3>
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
                  {documentDataCollection?.map((data: any, index: number) => (
                    <div
                      className="text-black grid grid-cols-[16%_16%_16%_16%_16%_20%] py-4 flex text-center"
                      key={index}
                    >
                      <div>{data.Vehicle}</div>
                      <div className="text-center">
                        <label className="cursor-pointer">
                          <span className="!w-fit m-auto bg-accent3 text-sm px-6 rounded-md mb-6 font-semibold rounded-md py-[4px] text-white">
                            Upload
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept=".doc,.docx,.pdf"
                            onChange={(e) => handleFileChanges(e, data?.id)}
                          />
                        </label>
                      </div>
                      <div>
                        {selectedFiles.find((file) => file.id === data?.id) ? (
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
                          <p>
                            {
                              selectedFiles.find((file) => file.id === data?.id)
                                ?.file.name
                            }
                          </p>
                        ) : (
                          <p>No file selected</p>
                        )}
                      </div>
                      <div className="text-center items-center justify-center m-auto">
                        {/* <StatusChip /> */}
                      </div>
                      <div className="underline decoration-[#2B36D9] text-center">
                        <span
                          className="cursor-pointer text-primary"
                          onClick={handleViewDocuments}
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
export default EditVehicle;
const vehicleDocumentCollection = [
  {
    heading: "VEHICLE",
  },
  {
    heading: "REGO",
  },
  {
    heading: "UPLOAD DATE",
  },
  {
    heading: "UPLOADED DOC.",
  },
  {
    heading: "STATUS",
  },
  {
    heading: "VIEW DOC.",
  },
];
const documentDataCollection = [
  {
    Vehicle: "Placeholder",
    rego: "Placeholder",
    uploadDate: "19/12/2023",
    UploadedDoc: "doc.pdf",
    status: "Approved",
    viewDoc: "view",
  },
  {
    Vehicle: "Placeholder",
    rego: "Placeholder",
    uploadDate: "18/12/2023",
    UploadedDoc: "doc.pdf",
    status: "Under Review",
    viewDoc: "view",
  },
  {
    Vehicle: "Placeholder",
    rego: "Placeholder",
    uploadDate: "17/12/2023",
    UploadedDoc: "doc.pdf",
    status: "Rejected",
    viewDoc: "view",
  },
];
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
];
const paymentMethodColleciton = [
  {
    value: "Select Payment Method",
  },
  {
    value: "Credit Card",
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
];
const situationCollection = [
  {
    value: "Anywhere",
  },
  {
    value: "Limited",
  },
];
