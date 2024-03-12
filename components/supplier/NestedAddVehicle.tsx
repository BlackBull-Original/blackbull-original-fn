import React, { useState } from "react";
import Progressbar from "../Progressbar";
import Maininputfield from "../Maininputfield";
import DateWithoutDropdown from "../DateWithoutDropdown";
import Maindatefield from "../Maindatefield";
import FileUpload from "../FileUpload";
import DropDownMap from "../DropDownMap";
import StatusChip from "../StatusChip";
import { formatDate, formattedDate } from "@/utils";
import {
  uploadSupplierVehicleRegoDocuments,
  uploadSuppliervehicleDocuments,
} from "@/network-request/supplier/vehicle";

export const NestedAddVehicle = (props: any) => {
  const {
    addVehicle,
    setAddVehicle,
    error,
    setError,
    selectedUploadRegoDocument,
    setSelectedUploadRegoDocument,
    urls,
    setUrls,
    modifiedUrls,
    selectedStatusValues,
    setSelectedStatusValues,
  } = props;
  console.log("AddVehicle", addVehicle);
  const [documentRender, setDocumentRender] = React.useState("");
  // const [selectedUploadRegoDocument, setSelectedUploadRegoDocument] =
  //   React.useState("");

  const [selectedFiles, setSelectedFiles] = useState<
    {
      id: number;
      file: File;
      currentDate: Date | null;
      content: string | null;
    }[]
  >([]);
  const [documentDataCollection, setDocumentDataCollection] = useState<any>([]);

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

  console.log("documentDataCollection", documentDataCollection);
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
  console.log("selectedFiles", selectedFiles);
  console.log("urls", urls);

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

  const [uploadStatus, setUploadStatus] = useState<{ [id: number]: boolean }>(
    {}
  );
  // const [urls, setUrls] = useState<string[]>([]);
  const [showUploadMessage, setShowUploadMessage] = useState(false);
  // const [selectedStatusValues, setSelectedStatusValues] = useState<any[]>([]);

  // const modifiedUrls = urls.reduce((acc: any, url, index) => {
  //   acc[index] = url;
  //   return acc;
  // }, []);

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

  const handleUploadFileWithId = async (id: number, combinedObject: any) => {
    try {
      const project = combinedObject[id];
      if (id && project?.id) {
        console.log("Project", { project });
        const file = [project?.file];
        const uploadDocumentResponses = await Promise.all(
          Object.values(file)?.map((file) =>
            uploadSupplierVehicleRegoDocuments(file)
          )
        );
        console.log({ uploadDocumentResponses });
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

  const handleStatusChipColor = (value: any, index: number) => {
    // clg
    setSelectedStatusValues((prevState: any) => {
      const updatedValues = [...prevState];
      updatedValues[index] = value;
      return updatedValues;
    });
  };

  return (
    <div>
      <div>
        <h3 className=" w-full p-4 rounded-md font-bold text-[#16161D] text-[24px]">
          Add Vehicle
        </h3>
      </div>
      <div className="p-4 bg-white mr-4 mt-4 rounded-md">
        <Progressbar />

        <h4 className="text-black font-semibold text-sm my-4">
          Vehicle Information
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <Maininputfield
            label="Registration Number"
            value={addVehicle.registrationNumber}
            className="w-full"
            onChange={(e: any) => {
              setAddVehicle({
                ...addVehicle,
                registrationNumber: e.target.value,
              });
              if (e.target.value.length > 0) {
                setError({
                  ...error,
                  registrationNumberError: "",
                });
              }
            }}
            errorMessage={error.registrationNumberError}
          />
          <Maindatefield
            label="Registration Expiry"
            value={addVehicle.registrationExpiry}
            className="w-full"
            onChange={(e: any) => {
              setAddVehicle({
                ...addVehicle,
                registrationExpiry: e.target.value,
              });
              if (e.target.value.length > 0) {
                setError({
                  ...error,
                  registrationExpiryError: "",
                });
              }
            }}
            errorMessage={error.registrationExpiryError}
          />
          <Maininputfield
            label="VIN No."
            value={addVehicle.vinNumber}
            className="w-full"
            onChange={(e: any) => {
              setAddVehicle({
                ...addVehicle,
                vinNumber: e.target.value,
              });
              if (e.target.value.length > 0) {
                setError({
                  ...error,
                  vinNumberError: "",
                });
              }
            }}
            errorMessage={error.vinNumberError}
          />
          <Maininputfield
            label="Vehicle Manufacturer"
            value={addVehicle.vehicleManufacturer}
            className="w-full"
            onChange={(e: any) => {
              setAddVehicle({
                ...addVehicle,
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
            value={addVehicle.vehicleModel}
            className="w-full"
            onChange={(e: any) => {
              setAddVehicle({
                ...addVehicle,
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
          />
          <div>
            <DropDownMap
              label="Vehicle Type"
              mapOption={vehicleTypeColleciton}
              value={addVehicle.vehicleType}
              onChange={(e: any) => {
                setAddVehicle({
                  ...addVehicle,
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
            {addVehicle.vehicleType === "Other" && (
              <div className="mt-3">
                <Maininputfield label="Other" className="w-full" />
              </div>
            )}
          </div>
          <div>
            <DropDownMap
              label="Type of Trailer"
              mapOption={trailerTypeCollection}
              value={addVehicle.typeOfTrailer}
              onChange={(e: any) => {
                setAddVehicle({
                  ...addVehicle,
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
            {addVehicle.typeOfTrailer === "Other" && (
              <div className="mt-3">
                <Maininputfield label="Other" className="w-full" />
              </div>
            )}
          </div>
          <div>
            <DropDownMap
              label="State of Registration"
              mapOption={registrationStateCollection}
              value={addVehicle.stateOfRegistration}
              onChange={(e: any) => {
                setAddVehicle({
                  ...addVehicle,
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
            {addVehicle.stateOfRegistration === "Other" && (
              <div className="mt-3">
                <Maininputfield label="Other" className="w-full" />
              </div>
            )}
          </div>

          <Maininputfield
            label="Engine Number"
            value={addVehicle.engineNumber}
            className="w-full"
            onChange={(e: any) => {
              setAddVehicle({
                ...addVehicle,
                engineNumber: e.target.value,
              });
              if (e.target.value.length > 0) {
                setError({
                  ...error,
                  engineNumberError: "",
                });
              }
            }}
            errorMessage={error.engineNumberError}
          />
          <Maininputfield
            label="Compliance Plate"
            value={addVehicle.compliancePlate}
            className="w-full"
            onChange={(e: any) => {
              setAddVehicle({
                ...addVehicle,
                compliancePlate: e.target.value,
              });
              if (e.target.value.length > 0) {
                setError({
                  ...error,
                  compliancePlateError: "",
                });
              }
            }}
            errorMessage={error.compliancePlateError}
          />
          <Maindatefield
            label="Registration Status"
            value={addVehicle.registrationStatus}
            className="w-full"
            onChange={(e: any) => {
              setAddVehicle({
                ...addVehicle,
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
        </div>
        <div className="mt-4 w-fit">
          <FileUpload
            file="Upload Rego Document"
            id="supplierVehicleRegoFile"
            name="supplierVehicleRegoDocument"
            onChange={handleProfileFileChange}
            fileName={selectedUploadRegoDocument?.file?.name || ""}
          />
        </div>
        <h4 className="text-black font-semibold text-sm my-4">
          Vehicle Insurance
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <Maininputfield
            label="Insurance Company"
            value={addVehicle.insuranceCompanyName}
            className="w-full"
            onChange={(e: any) => {
              setAddVehicle({
                ...addVehicle,
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
            value={addVehicle.policyNumber}
            className="w-full"
            onChange={(e: any) => {
              setAddVehicle({
                ...addVehicle,
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
            value={addVehicle.vehicleInsuranceStartDate}
            className="w-full"
            onChange={(e: any) => {
              setAddVehicle({
                ...addVehicle,
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
            value={addVehicle.renewalDate}
            className="w-full"
            onChange={(e: any) => {
              setAddVehicle({
                ...addVehicle,
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
            value={addVehicle.dateValidUntil}
            className="w-full"
            onChange={(e: any) => {
              setAddVehicle({
                ...addVehicle,
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
            value={addVehicle.daysLeft === undefined ? "" : addVehicle.daysLeft}
            className="w-full"
            onChange={(e: any) => {
              // regex for only accept integer values
              const regex = /^-?\d*$/; // Allow an empty string or any integer
              if (!regex.test(e.target.value)) {
                setError({
                  ...error,
                  daysLeftError: "Please enter only numbers",
                });
              } else {
                setAddVehicle((prevVehicle: any) => {
                  const newDaysLeft =
                    e.target.value === "" ? undefined : Number(e.target.value);
                  return { ...prevVehicle, daysLeft: newDaysLeft };
                });
                if (e.target.value.length > 0) {
                  setError({ ...error, daysLeftError: "" });
                }
              }
            }}
            errorMessage={error.daysLeftError}
          />
          <div>
            <DropDownMap
              label="Insurance Coverage"
              mapOption={insuranceCoverageCollection}
              value={addVehicle.insuranceCoverage}
              onChange={(e: any) => {
                setAddVehicle({
                  ...addVehicle,
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
            {addVehicle.insuranceCoverage === "Other" && (
              <div className="mt-3">
                <Maininputfield label="Other" className="w-full" />
              </div>
            )}
          </div>
          <div>
            <DropDownMap
              label="Insurance Status"
              mapOption={activeInactive}
              value={addVehicle.insuranceStatus}
              onChange={(e: any) => {
                setAddVehicle({
                  ...addVehicle,
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
            {addVehicle.insuranceStatus === "Other" && (
              <div className="mt-3">
                <Maininputfield label="Other" className="w-full" />
              </div>
            )}
          </div>
          <div>
            <DropDownMap
              label="Situation"
              mapOption={situationCollection}
              value={addVehicle.situation}
              onChange={(e: any) => {
                setAddVehicle({
                  ...addVehicle,
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
            {addVehicle.situation === "Other" && (
              <div className="mt-3">
                <Maininputfield label="Other" className="w-full" />
              </div>
            )}
          </div>
        </div>
        <h4 className="text-black font-semibold text-sm my-4">
          Truck Odometer
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <Maininputfield
            label="Truck Odometer"
            value={addVehicle.truckOdometer}
            onChange={(e: any) => {
              setAddVehicle({
                ...addVehicle,
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
        <div className="mt-8">
          <div className="flex">
            <h3 className="text-black w-full mb-4 text-[16px] font-semibold">
              Vehicle Documents
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
                  <div>
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
                  <div className="text-center  items-center justify-center m-auto">
                    <StatusChip
                      chipColor={(e: any) => handleStatusChipColor(e, index)}
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
  );
};

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
//     uploadDate: "18/12/2023",
//     UploadedDoc: "doc.pdf",
//     status: "Under Review",
//     viewDoc: "view",
//   },
//   {
//     id: 3,
//     Vehicle: "Placeholder",
//     rego: "Placeholder",
//     uploadDate: "17/12/2023",
//     UploadedDoc: "doc.pdf",
//     status: "Rejected",
//     viewDoc: "view",
//   },
// ];
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

const activeInactive = [
  {
    value: "Active",
  },
  {
    value: "Inactive",
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
