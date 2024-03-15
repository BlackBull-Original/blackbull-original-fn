import React, { useEffect, useRef, useState } from "react";
import Progressbar from "../Progressbar";
import Image from "next/image";
import Maininputfield from "../Maininputfield";
import DropDownMap from "../DropDownMap";
import Button from "../Button";
import DateWithoutDropdown from "../DateWithoutDropdown";
import { uploadSupplierComplianceDocuments } from "@/network-request/supplier/supplier";
import { formatDate } from "@/utils";
import Maindatefield from "../Maindatefield";
import FileUpload from "../FileUpload";

export const NestedAddSupplier = (props: any) => {
  const [selectedData, setSelectedData] = useState();
  const {
    addSupplier,
    setAddSupplier,
    error,
    setError,
    modifiedUrls,
    urls,
    setUrls,
    setSelectedProfileSupplier,
    accreditationDocument,
    setAccreditationDocument,
    productDocument,
    setProductDocument,
    publicDocument,
    setPublicDocument,
    workCoverDocument,
    setWorkCoverDocument,
    marineDocument,
    setMarineDocument,
    marineAlcoholDocument,
    setMarineAlcoholDocument,
    cocDocument,
    setCocDocument,
    addMoreFields,
    setAddMoreFields,
    addMoreDirector,
    setAddMoreDirector,
    addMoreAddress,
    setAddMoreAddress,
  } = props;

  const [progress, setProgress] = useState(0);

  const [progressOfState, SetProgressOfState] = useState({
    companyName: "",
    tradingName: "",
    abn: "",
    legalName: "",
    website: "",
    profile: "",
    opreationsContactPerson: "",
    opreationsDesgination: "",
    opreationsNumber: "",
    opreationsOpreationEmail: "",
    complianceContactPerson: "",
    complianceDesgination: "",
    complianceNumber: "",
    complianceComplianceEmail: "",
    adminContactPerson: "",
    adminDesgination: "",
    adminNumber: "",
    adminAdminEmail: "",
    dispatchContactPerson: "",
    dispatchDesgination: "",
    dispatchNumber: "",
    dispatchDispatchEmail: "",
    invoicePreferences: "",
    invoiceCommunicationPreferences: "",
    companySuiteDetailsDesignation: "",
    companySuiteDetailsDirectorEmailAddress: "",
    companySuiteDetailsDirectorNumber: "",
    bankDetailsAccountName: "",
    bankDetailsBankName: "",
    bankDetailsBsb: "",
    bankDetailsAccountNumber: "",
    businessCoverageAreaCovered: "",
    businessCoverageBusinessOpreations: "",
    warehouseDetailsStreet1: "",
    warehouseDetailsStreet2: "",
    warehouseDetailsSuburb: "",
    warehouseDetailsState: "",
    warehouseDetailsCountry: "",
    warehouseDetailsPostcode: "",
    certificateOfAccreditationAccreditationNumber: "",
    certificateOfAccreditationMassManagementExpiryDate: "",
    certificateOfAccreditationBasicFatigueExpiryDate: "",
    certificateOfAccreditationDangerousGoodsExpiryDate: "",
    certificateOfAccreditationNhvassExpiryDate: "",
    certificateOfAccreditationHaccpExpiryDate: "",
    insuranceDetailsProductLiabilityPolicyNumber: "",
    insuranceDetailsProductLiabilityInsurer: "",
    insuranceDetailsProductLiabilityExpiryDate: "",
    insuranceDetailsProductLiabilitySumAssured: "",
    insuranceDetailsPublicLiabilityPolicyNumber: "",
    insuranceDetailsPublicLiabilityInsurer: "",
    insuranceDetailsPublicLiabilityExpiryDate: "",
    insuranceDetailsPublicLiabilitySumAssured: "",
    insuranceDetailsWorkCoverEmployerNumber: "",
    insuranceDetailsWorkCoverValid: "",
    insuranceDetailsWorkCoverValidTill: "",
    insuranceDetailsWorkCoverDuesDays: "",
    insuranceDetailsMarineGeneralPolicyNumber: "",
    insuranceDetailsMarineGeneralInsurer: "",
    insuranceDetailsMarineGeneralExpiryDate: "",
    insuranceDetailsMarineGeneralSumAssured: "",
    insuranceDetailsMarineAlcoholPolicyNumber: "",
    insuranceDetailsMarineAlcoholInsurer: "",
    insuranceDetailsMarineAlcoholExpiryDate: "",
    insuranceDetailsMarineAlcoholSumAssured: "",
    insuranceDetailsCocPolicyNumber: "",
    insuranceDetailsCocInsurer: "",
    insuranceDetailsCocExpiryDate: "",
    insuranceDetailsCocSumAssured: "",
  });

  useEffect(() => {
    SetProgressOfState({
      ...progressOfState,
      companyName: addSupplier.companyName,
      tradingName: addSupplier.tradingName,
      abn: addSupplier.abn,
      legalName: addSupplier.legalName,
      website: addSupplier.website,
      opreationsContactPerson: addSupplier.opreations.contactPerson,
      opreationsDesgination: addSupplier.opreations.desgination,
      opreationsNumber: addSupplier.opreations.number,
      opreationsOpreationEmail: addSupplier.opreations.opreationEmail,
      complianceContactPerson: addSupplier.compliance.contactPerson,
      complianceDesgination: addSupplier.compliance.desgination,
      complianceNumber: addSupplier.compliance.number,
      complianceComplianceEmail: addSupplier.compliance.complianceEmail,
      adminContactPerson: addSupplier.admin.contactPerson,
      adminDesgination: addSupplier.admin.desgination,
      adminNumber: addSupplier.admin.number,
      adminAdminEmail: addSupplier.admin.adminEmail,
      dispatchContactPerson: addSupplier.dispatch.contactPerson,
      dispatchDesgination: addSupplier.dispatch.desgination,
      dispatchNumber: addSupplier.dispatch.number,
      dispatchDispatchEmail: addSupplier.dispatch.dispatchEmail,
      invoicePreferences: addSupplier.invoicePreferences,
      invoiceCommunicationPreferences:
        addSupplier.invoiceCommunicationPreferences,
      companySuiteDetailsDesignation: addMoreDirector[0]?.designation,
      companySuiteDetailsDirectorEmailAddress:
        addMoreDirector[0]?.directorEmailAddress,
      companySuiteDetailsDirectorNumber: addMoreDirector[0]?.directorNumber,
      bankDetailsAccountName: addSupplier.bankDetails.accountName,
      bankDetailsBankName: addSupplier.bankDetails.bankName,
      bankDetailsBsb: addSupplier.bankDetails.bsb,
      bankDetailsAccountNumber: addSupplier.bankDetails.accountNumber,
      businessCoverageAreaCovered: addSupplier.businessCoverage.areaCovered,
      businessCoverageBusinessOpreations:
        addSupplier.businessCoverage.businessOpreations,
      warehouseDetailsStreet1: addMoreAddress[0]?.street1,
      warehouseDetailsStreet2: addMoreAddress[0]?.street2,
      warehouseDetailsSuburb: addMoreAddress[0]?.suburb,
      warehouseDetailsState: addMoreAddress[0]?.state,
      warehouseDetailsCountry: addMoreAddress[0]?.country,
      warehouseDetailsPostcode: addMoreAddress[0]?.postcode,
      certificateOfAccreditationAccreditationNumber:
        addSupplier.certificateOfAccreditation.accreditationNumber,
      certificateOfAccreditationMassManagementExpiryDate:
        addSupplier.certificateOfAccreditation.massManagementExpiryDate,
      certificateOfAccreditationBasicFatigueExpiryDate:
        addSupplier.certificateOfAccreditation.basicFatigueExpiryDate,
      certificateOfAccreditationDangerousGoodsExpiryDate:
        addSupplier.certificateOfAccreditation.dangerousGoodsExpiryDate,
      certificateOfAccreditationNhvassExpiryDate:
        addSupplier.certificateOfAccreditation.nhvassExpiryDate,
      certificateOfAccreditationHaccpExpiryDate:
        addSupplier.certificateOfAccreditation.haccpExpiryDate,
      insuranceDetailsProductLiabilityPolicyNumber:
        addSupplier.insuranceDetails.productLiability.policyNumber,
      insuranceDetailsProductLiabilityInsurer:
        addSupplier.insuranceDetails.productLiability.insurer,
      insuranceDetailsProductLiabilityExpiryDate:
        addSupplier.insuranceDetails.productLiability.expiryDate,
      insuranceDetailsProductLiabilitySumAssured:
        addSupplier.insuranceDetails.productLiability.sumAssured,
      insuranceDetailsPublicLiabilityPolicyNumber:
        addSupplier.insuranceDetails.publicLiability.policyNumber,
      insuranceDetailsPublicLiabilityInsurer:
        addSupplier.insuranceDetails.publicLiability.insurer,
      insuranceDetailsPublicLiabilityExpiryDate:
        addSupplier.insuranceDetails.publicLiability.expiryDate,
      insuranceDetailsPublicLiabilitySumAssured:
        addSupplier.insuranceDetails.publicLiability.sumAssured,
      insuranceDetailsWorkCoverEmployerNumber:
        addSupplier.insuranceDetails.workCover.employerNumber,
      insuranceDetailsWorkCoverValid:
        addSupplier.insuranceDetails.workCover.valid,
      insuranceDetailsWorkCoverValidTill:
        addSupplier.insuranceDetails.workCover.validTill,
      insuranceDetailsWorkCoverDuesDays:
        addSupplier.insuranceDetails.workCover.duesDays,
      insuranceDetailsMarineGeneralPolicyNumber:
        addSupplier.insuranceDetails.marineGeneral.policyNumber,
      insuranceDetailsMarineGeneralInsurer:
        addSupplier.insuranceDetails.marineGeneral.insurer,
      insuranceDetailsMarineGeneralExpiryDate:
        addSupplier.insuranceDetails.marineGeneral.expiryDate,
      insuranceDetailsMarineGeneralSumAssured:
        addSupplier.insuranceDetails.marineGeneral.sumAssured,
      insuranceDetailsMarineAlcoholPolicyNumber:
        addSupplier.insuranceDetails.marineAlcohol.policyNumber,
      insuranceDetailsMarineAlcoholInsurer:
        addSupplier.insuranceDetails.marineAlcohol.insurer,
      insuranceDetailsMarineAlcoholExpiryDate:
        addSupplier.insuranceDetails.marineAlcohol.expiryDate,
      insuranceDetailsMarineAlcoholSumAssured:
        addSupplier.insuranceDetails.marineAlcohol.sumAssured,
      insuranceDetailsCocPolicyNumber:
        addSupplier.insuranceDetails.coc.policyNumber,
      insuranceDetailsCocInsurer: addSupplier.insuranceDetails.coc.insurer,
      insuranceDetailsCocExpiryDate:
        addSupplier.insuranceDetails.coc.expiryDate,
      insuranceDetailsCocSumAssured:
        addSupplier.insuranceDetails.coc.sumAssured,
    });
  }, [addSupplier, addMoreDirector, addMoreAddress]);

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

  const [selectedFiles, setSelectedFiles] = useState<
    { id: number; file: File; currentDate: Date | null }[]
  >([]);
  const [uploadStatus, setUploadStatus] = useState<{ [id: number]: boolean }>(
    {}
  );
  const [showUploadMessage, setShowUploadMessage] = useState(false);

  const regexOfPhoneNumber = /^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$/;
  const regexOfEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.+([a-zA-Z0-9-]+)2*$/;
  const regexOfWebsite = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  const [documentDataCollection, setDocumentDataCollection] = useState<any>([]);

  // **** Add more fields ****
  const [showOtherFields, setShowOtherFields] = useState(false);
  console.log("addMoreFields", addMoreFields);
  // React.useEffect(() => {
  //   if (addMoreFields.length === 0) {
  //     setAddMoreFields([
  //       {
  //         others: "",
  //       },
  //     ]);
  //   }
  // }, []);
  console.log("addMoreFields", addMoreFields);

  const handleFieldsChange = (value: any, fieldName: any, index: any) => {
    const data = [...addMoreFields];
    data[index][fieldName] = value.target.value;
    setAddMoreFields(data);
  };

  const handleAddMoreFields = () => {
    setShowOtherFields(true);
    setAddMoreFields([
      ...addMoreFields,
      {
        others: "",
      },
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    // if (index === 0) {
    //   setShowOtherFields(false);
    // } else {
    //   setShowOtherFields(true);
    // }
    setAddMoreFields(addMoreFields.filter((_: any, i: any) => i !== index));
  };

  // *** End Here Add more feilds**

  // **** Add more director ****
  // const [addMoreDirector, setAddMoreDirector] = useState<Array<any>>([]);
  useEffect(() => {
    if (addMoreDirector.length === 0) {
      setAddMoreDirector([
        {
          designation: "",
          directorEmailAddress: "",
          directorNumber: "",
        },
      ]);
    }
  }, []);

  const handleDirectorChange = (value: any, fieldName: any, index: any) => {
    const data = [...addMoreDirector];
    data[index][fieldName] = value.target.value;
    setAddMoreDirector(data);
  };

  const handleAddMoreDirector = () => {
    setAddMoreDirector([
      ...addMoreDirector,
      {
        designation: "",
        directorEmailAddress: "",
        directorNumber: "",
      },
    ]);
  };

  const handleRemoveDirector = (index: number) => {
    setAddMoreDirector(addMoreDirector.filter((_: any, i: any) => i !== index));
  };
  // *** End Here Add more director**

  // *********** Add More Address ********************************

  console.log("addMoreAddress", addMoreAddress);
  useEffect(() => {
    if (addMoreAddress.length === 0) {
      setAddMoreAddress([
        {
          street1: "",
          street2: "",
          suburb: "",
          state: "",
          country: "Australia",
          postcode: "",
          otherState: "",
        },
      ]);
    }
  }, []);

  const handleAddressChange = (value: any, fieldName: any, index: any) => {
    const data = [...addMoreAddress];
    data[index][fieldName] = value.target.value;
    setAddMoreAddress(data);
  };

  const handleAddAddress = () => {
    setAddMoreAddress([
      ...addMoreAddress,
      {
        street1: "",
        street2: "",
        suburb: "",
        state: "",
        country: "Australia",
        postcode: "",
        otherState: "",
      },
    ]);
  };

  const handleRemoveAddress = (index: number) => {
    setAddMoreAddress(addMoreAddress.filter((_: any, i: any) => i !== index));
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

  const handleViewDocuments = (id: number) => {
    const index = id;
    if (index >= 1 && index < modifiedUrls.length) {
      const url = modifiedUrls[index];
      window.open(url, "_blank");
    } else {
      console.error("URL not found for id:", id);
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

  const handleUploadFileWithId = async (id: number, combinedObject: any) => {
    try {
      const project = combinedObject[id];
      if (id && project?.id) {
        const file = [project?.file];
        const uploadDocumentResponses = await Promise.all(
          Object.values(file)?.map((file) =>
            uploadSupplierComplianceDocuments(file)
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
    React.useState(null);
  // const [documentRender, setDocumentRender] = React.useState("");

  const [selectedUploadRegoDocument2, setSelectedUploadRegoDocument2] =
    React.useState(null);
  const [documentRender2, setDocumentRender2] = React.useState("");

  const handleFileChange = (setFile: any, setPreview: any) => (event: any) => {
    const selectedFile = event.target.files && event.target.files[0];
    console.log({ selectedFile });
    setFile({ file: selectedFile });
    if (selectedFile) {
      readAndSetPreview(selectedFile, setPreview);
    }
  };

  const readAndSetPreview = (file: any, setPreview: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader?.result || "");
    };
    reader.readAsDataURL(file);
  };

  const handleProfileFileChange = handleFileChange(
    setSelectedProfileSupplier,
    setProfile
  );

  const handleAccreditationDocument = handleFileChange(
    setAccreditationDocument,
    setDocumentRender
  );

  const handleProductLiabilityDocument = handleFileChange(
    setProductDocument,
    setDocumentRender
  );

  const handlePublicLiabilityDocument = handleFileChange(
    setPublicDocument,
    setDocumentRender
  );

  const handleWorkCoverDocument = handleFileChange(
    setWorkCoverDocument,
    setDocumentRender
  );

  const handleMarineDocument = handleFileChange(
    setMarineDocument,
    setDocumentRender
  );

  const handleMarineAlcoholDocument = handleFileChange(
    setMarineAlcoholDocument,
    setDocumentRender
  );

  const handleCocDocument = handleFileChange(setCocDocument, setDocumentRender);

  return (
    <div>
      <div className="bg-white mr-4 flex justify-between items-center rounded-2xl">
        <h2 className=" w-full p-4 rounded-2xl font-bold text-[#16161D] text-[24px]">
          Add Supplier
        </h2>
        <div className="h-8 w-8 flex justify-center cursor-pointer text-2xl items-center bg-blueGrey-100 rounded-full mr-4">
          <span className="mt-[-2px] ml-[2px] text-[#292D32] rotate-45">+</span>
        </div>
      </div>
      <div className="bg-white mr-4 px-4 mt-4 p-4 rounded-2xl">
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
        <div className="bg-white mr-4 mt-4 rounded-2xl">
          <h2 className="text-black font-semibold mt-8">
            Supplier Information
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <Maininputfield
              label="Company Name"
              value={addSupplier.companyName}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  companyName: e.target.value,
                });
                if (e.target.value.length > 0) {
                  setError({ ...error, companyNameError: "" });
                }
              }}
              errorMessage={error.companyNameError}
            />
            <Maininputfield
              label="Trading Name"
              value={addSupplier.tradingName}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  tradingName: e.target.value,
                });
                if (e.target.value.length > 0) {
                  setError({ ...error, tradingNameError: "" });
                }
              }}
              errorMessage={error.tradingNameError}
            />
            <Maininputfield
              label="ABN"
              value={addSupplier.abn}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  abn: e.target.value,
                });
                if (e.target.value.length > 0) {
                  setError({ ...error, abnError: "" });
                }
              }}
              errorMessage={error.abnError}
            />
            <Maininputfield
              label="Legal Name"
              value={addSupplier.legalName}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  legalName: e.target.value,
                });
                if (e.target.value.length > 0) {
                  setError({ ...error, legalNameError: "" });
                }
              }}
              errorMessage={error.legalNameError}
            />
            <Maininputfield
              label="Website Address"
              value={addSupplier.website}
              className="w-full"
              onChange={(e: any) => {
                const inputValue = e.target.value;
                if (!regexOfWebsite.test(inputValue)) {
                  setError({
                    ...error,
                    websiteAddressError: "Please enter a valid webiste address",
                  });
                  setError({
                    ...error,
                    websiteError: "Please enter a valid webiste address",
                  });
                } else {
                  setError({ ...error, websiteError: "" });
                }
                setAddSupplier({
                  ...addSupplier,
                  website: e.target.value,
                });
              }}
              errorMessage={error.websiteError}
            />
            <Maininputfield
              label="Supplier ID"
              // value={addSupplier.website}
              className="w-full"
              // onChange={(e: any) => {
              //   setAddSupplier({
              //     ...addSupplier,
              //     website: e.target.value,
              //   });
              // }}
            />
          </div>
          <h2 className="text-black font-semibold mt-8">Contact Information</h2>
          <h3 className="text-black font-semibold text-sm my-4">Operations</h3>
          <div className="grid grid-cols-3 gap-4">
            <Maininputfield
              label="Contact Person"
              value={addSupplier.opreations?.contactPerson}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  opreations: {
                    ...addSupplier.opreations,
                    contactPerson: e.target.value,
                  },
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    opreationsError: {
                      ...error.opreationsError,
                      contactPerson: "",
                    },
                  });
                }
              }}
              errorMessage={error.opreationsError?.contactPerson}
            />
            <Maininputfield
              label="Designation"
              value={addSupplier.opreations?.desgination}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  opreations: {
                    ...addSupplier.opreations,
                    desgination: e.target.value,
                  },
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    opreationsError: {
                      ...error.opreationsError,
                      desgination: "",
                    },
                  });
                }
              }}
              errorMessage={error.opreationsError?.desgination}
            />
            <Maininputfield
              label="Contact Number"
              value={addSupplier.opreations?.number}
              className="w-full"
              onChange={(e: any) => {
                const phoneNumber = e.target.value;
                // Check if the entered value is a valid 10-digit phone number
                if (!regexOfPhoneNumber.test(phoneNumber)) {
                  setError({
                    ...error,
                    opreationsError: {
                      ...error.opreationsError,
                      number: "Please enter a valid 10-digit phone number",
                    },
                  });
                } else {
                  setError({
                    ...error,
                    opreationsError: {
                      ...error.opreationsError,
                      number: "",
                    },
                  });
                }
                setAddSupplier({
                  ...addSupplier,
                  opreations: {
                    ...addSupplier.opreations,
                    number: e.target.value,
                  },
                });
              }}
              errorMessage={error.opreationsError?.number}
            />
            <Maininputfield
              label="Operations Email"
              value={addSupplier.opreations?.opreationEmail}
              className="w-full"
              onChange={(e: any) => {
                const inputValue = e.target.value;
                if (!regexOfEmail.test(inputValue)) {
                  setError({
                    ...error,
                    opreationsError: {
                      ...error.opreationsError,
                      opreationEmail: "Please enter a valid email address",
                    },
                  });
                } else {
                  setError({
                    ...error,
                    opreationsError: {
                      ...error.opreationsError,
                      opreationEmail: "",
                    },
                  });
                }
                setAddSupplier({
                  ...addSupplier,
                  opreations: {
                    ...addSupplier.opreations,
                    opreationEmail: e.target.value,
                  },
                });
              }}
              errorMessage={error.opreationsError?.opreationEmail}
            />
          </div>
          <h3 className="text-black font-semibold text-sm my-4">Compliance</h3>
          <div className="grid grid-cols-3 gap-4">
            <Maininputfield
              label="Contact Person"
              value={addSupplier.compliance?.contactPerson}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  compliance: {
                    ...addSupplier.compliance,
                    contactPerson: e.target.value,
                  },
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    complianceError: {
                      ...error.complianceError,
                      contactPerson: "",
                    },
                  });
                }
              }}
              errorMessage={error.complianceError?.contactPerson}
            />
            <Maininputfield
              label="Designation"
              value={addSupplier.compliance?.desgination}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  compliance: {
                    ...addSupplier.compliance,
                    desgination: e.target.value,
                  },
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    complianceError: {
                      ...error.complianceError,
                      desgination: "",
                    },
                  });
                }
              }}
              errorMessage={error.complianceError?.desgination}
            />
            <Maininputfield
              label="Contact Number"
              value={addSupplier.compliance?.number}
              className="w-full"
              onChange={(e: any) => {
                const phoneNumber = e.target.value;
                // Check if the entered value is a valid 10-digit phone number
                if (!regexOfPhoneNumber.test(phoneNumber)) {
                  setError({
                    ...error,
                    complianceError: {
                      ...error.complianceError,
                      number: "Please enter a valid 10-digit phone number",
                    },
                  });
                } else {
                  setError({
                    ...error,
                    complianceError: {
                      ...error.complianceError,
                      number: "",
                    },
                  });
                }
                setAddSupplier({
                  ...addSupplier,
                  compliance: {
                    ...addSupplier.compliance,
                    number: e.target.value,
                  },
                });
              }}
              errorMessage={error.complianceError?.number}
            />
            <Maininputfield
              label="Compliance Email"
              value={addSupplier.compliance?.complianceEmail}
              className="w-full"
              onChange={(e: any) => {
                const inputValue = e.target.value;
                if (!regexOfEmail.test(inputValue)) {
                  setError({
                    ...error,
                    complianceError: {
                      ...error.complianceError,
                      complianceEmail: "Please enter a valid email address",
                    },
                  });
                } else {
                  setError({
                    ...error,
                    complianceError: {
                      ...error.complianceError,
                      complianceEmail: "",
                    },
                  });
                }
                setAddSupplier({
                  ...addSupplier,
                  compliance: {
                    ...addSupplier.compliance,
                    complianceEmail: e.target.value,
                  },
                });
              }}
              errorMessage={error.complianceError?.complianceEmail}
            />
          </div>
          <h3 className="text-black font-semibold text-sm my-4">Admin</h3>
          <div className="grid grid-cols-3 gap-4">
            <Maininputfield
              label="Contact Person"
              value={addSupplier.admin?.contactPerson}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  admin: {
                    ...addSupplier.admin,
                    contactPerson: e.target.value,
                  },
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    adminError: {
                      ...error.adminError,
                      contactPerson: "",
                    },
                  });
                }
              }}
              errorMessage={error.adminError?.contactPerson}
            />
            <Maininputfield
              label="Designation"
              value={addSupplier.admin?.desgination}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  admin: {
                    ...addSupplier.admin,
                    desgination: e.target.value,
                  },
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    adminError: {
                      ...error.adminError,
                      desgination: "",
                    },
                  });
                }
              }}
              errorMessage={error.adminError?.desgination}
            />
            <Maininputfield
              label="Contact Number"
              value={addSupplier.admin?.number}
              className="w-full"
              onChange={(e: any) => {
                const phoneNumber = e.target.value;
                // Check if the entered value is a valid 10-digit phone number
                if (!regexOfPhoneNumber.test(phoneNumber)) {
                  setError({
                    ...error,
                    adminError: {
                      ...error.adminError,
                      number: "Please enter a valid 10-digit phone number",
                    },
                  });
                } else {
                  setError({
                    ...error,
                    adminError: {
                      ...error.adminError,
                      number: "",
                    },
                  });
                }
                setAddSupplier({
                  ...addSupplier,
                  admin: {
                    ...addSupplier.admin,
                    number: e.target.value,
                  },
                });
              }}
              errorMessage={error.adminError?.number}
            />
            <Maininputfield
              label="Admin Email"
              value={addSupplier.admin?.adminEmail}
              className="w-full"
              onChange={(e: any) => {
                const inputValue = e.target.value;
                if (!regexOfEmail.test(inputValue)) {
                  setError({
                    ...error,
                    adminError: {
                      ...error.adminError,
                      adminEmail: "Please enter a valid email address",
                    },
                  });
                } else {
                  setError({
                    ...error,
                    adminError: {
                      ...error.adminError,
                      adminEmail: "",
                    },
                  });
                }
                setAddSupplier({
                  ...addSupplier,
                  admin: {
                    ...addSupplier.admin,
                    adminEmail: e.target.value,
                  },
                });
              }}
              errorMessage={error.adminError?.adminEmail}
            />
          </div>
          <h3 className="text-black font-semibold text-sm my-4">Dispatch</h3>
          <div className="grid grid-cols-3 gap-4">
            <Maininputfield
              label="Contact Person"
              value={addSupplier.dispatch?.contactPerson}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  dispatch: {
                    ...addSupplier.dispatch,
                    contactPerson: e.target.value,
                  },
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    dispatchError: {
                      ...error.dispatchError,
                      contactPerson: "",
                    },
                  });
                }
              }}
              errorMessage={error.dispatchError?.contactPerson}
            />
            <Maininputfield
              label="Designation"
              value={addSupplier.dispatch?.desgination}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  dispatch: {
                    ...addSupplier.dispatch,
                    desgination: e.target.value,
                  },
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    dispatchError: {
                      ...error.dispatchError,
                      desgination: "",
                    },
                  });
                }
              }}
              errorMessage={error.dispatchError?.desgination}
            />
            <Maininputfield
              label="Contact Number"
              value={addSupplier.dispatch?.number}
              className="w-full"
              onChange={(e: any) => {
                const phoneNumber = e.target.value;
                // Check if the entered value is a valid 10-digit phone number
                if (!regexOfPhoneNumber.test(phoneNumber)) {
                  setError({
                    ...error,
                    dispatchError: {
                      ...error.dispatchError,
                      number: "Please enter a valid 10-digit phone number",
                    },
                  });
                } else {
                  setError({
                    ...error,
                    dispatchError: {
                      ...error.dispatchError,
                      number: "",
                    },
                  });
                }
                setAddSupplier({
                  ...addSupplier,
                  dispatch: {
                    ...addSupplier.dispatch,
                    number: e.target.value,
                  },
                });
              }}
              errorMessage={error.dispatchError?.number}
            />
            <Maininputfield
              label="Dispatch Email"
              value={addSupplier.dispatch?.dispatchEmail}
              className="w-full"
              onChange={(e: any) => {
                const inputValue = e.target.value;
                if (!regexOfEmail.test(inputValue)) {
                  setError({
                    ...error,
                    dispatchError: {
                      ...error.dispatchError,
                      dispatchEmail: "Please enter a valid email address",
                    },
                  });
                } else {
                  setError({
                    ...error,
                    dispatchError: {
                      ...error.dispatchError,
                      dispatchEmail: "",
                    },
                  });
                }
                setAddSupplier({
                  ...addSupplier,
                  dispatch: {
                    ...addSupplier.dispatch,
                    dispatchEmail: e.target.value,
                  },
                });
              }}
              errorMessage={error.dispatchError?.dispatchEmail}
            />
          </div>
          <h3 className="text-black font-semibold text-sm my-4">
            Invoice Preferences
          </h3>
          <div>
            <div className="grid grid-cols-3 gap-4">
              <DropDownMap
                label="Invoice Preferences"
                mapOption={invoiceColletion}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
                value={addSupplier.invoicePreferences}
                onChange={(e: any) => {
                  setAddSupplier({
                    ...addSupplier,
                    invoicePreferences: e.target.value,
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      invoicePreferencesError: "",
                    });
                  }
                }}
                errorMessage={error.invoicePreferencesError}
              />
            </div>
            {addSupplier.invoicePreferences === "Other" && (
              <div className="grid grid-cols-3 gap-4 mt-3">
                <Maininputfield
                  label="Other"
                  value={addSupplier.otherInvoicePreferences}
                  onChange={(e: any) => {
                    setAddSupplier({
                      ...addSupplier,
                      otherInvoicePreferences: e.target.value,
                    });
                  }}
                  className="w-full"
                />
              </div>
            )}
          </div>

          <h3 className="text-black font-semibold text-sm my-4">
            Invoice Communication Preferences
          </h3>
          <div>
            <div className="grid mb-4 grid-cols-3 gap-4">
              <DropDownMap
                label="Select Email"
                mapOption={invoiceComuColletion}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
                value={addSupplier.invoiceCommunicationPreferences}
                onChange={(e: any) => {
                  setAddSupplier({
                    ...addSupplier,
                    invoiceCommunicationPreferences: e.target.value,
                  });
                }}
              />
            </div>
            {addSupplier.invoiceCommunicationPreferences === "Other" && (
              <div className="mt-3 grid mb-4 grid-cols-3 gap-4">
                <Maininputfield
                  label="Other"
                  value={addSupplier.otherInvoiceCommunicationPreferences}
                  onChange={(e: any) => {
                    setAddSupplier({
                      ...addSupplier,
                      otherInvoiceCommunicationPreferences: e.target.value,
                    });
                  }}
                  className="w-full"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end">
            {/* {!showOtherFields && ( */}
            <Button
              onClick={() => {
                setShowOtherFields(true);
                setAddMoreFields([
                  ...addMoreFields,
                  {
                    others: "",
                  },
                ]);
              }}
              text="Add More Fields"
              className="bg-[#2B36D9] px-4 !w-fit"
            />
            {/* )} */}
          </div>
          {showOtherFields &&
            addMoreFields?.map((item: any, index: number) => {
              const displayIndex = index;

              return (
                <div key={displayIndex}>
                  <div>
                    <h4 className="text-sm font-semibold mb-1 text-black">
                      Others {displayIndex + 1}
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <Maininputfield
                      label="Others"
                      id={`others-${displayIndex}`}
                      name={`others-${displayIndex}`}
                      value={item?.others}
                      onChange={(e: any) =>
                        handleFieldsChange(e, "others", displayIndex)
                      }
                      className="w-full"
                      errorMessage={
                        error.employmentHistoryError?.previousEmployer
                      }
                    />
                  </div>
                  <div className="mb-8 mt-8 flex justify-end">
                    <Button
                      onClick={handleAddMoreFields}
                      text="Add More Fields"
                      className="bg-[#2B36D9] px-4 !w-fit"
                    />

                    <span
                      onClick={() => handleRemoveExperience(displayIndex)}
                      className="ml-4 cursor-pointer"
                      style={{
                        color: "red",
                        marginTop: "10px",
                        marginRight: "10px",
                      }}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              );
            })}

          <h2 className="text-black font-semibold mt-8 mb-4">
            Company C-Suite Details
          </h2>
          {addMoreDirector?.map((item: any, index: number) => {
            return (
              <div key={index}>
                <div>
                  <h3 className="font-semibold  text-sm text-[#28353A] text-[16px]">
                    Director {index + 1}
                  </h3>
                  <div className="grid grid-cols-3 gap-4 mt-3">
                    <Maininputfield
                      label="Designation"
                      value={item?.designation}
                      onChange={(e: any) =>
                        handleDirectorChange(e, "designation", index)
                      }
                      className="w-full"
                      errorMessage={error.companySuiteDetailsError?.designation}
                    />
                    <Maininputfield
                      label="Director Email Address"
                      value={item?.directorEmailAddress}
                      onChange={(e: any) =>
                        handleDirectorChange(e, "directorEmailAddress", index)
                      }
                      className="w-full"
                      errorMessage={
                        error.companySuiteDetailsError?.directorEmailAddress
                      }
                    />
                    <Maininputfield
                      label="Director Contact Number"
                      value={item?.directorNumber}
                      onChange={(e: any) =>
                        handleDirectorChange(e, "directorNumber", index)
                      }
                      className="w-full"
                      errorMessage={
                        error.companySuiteDetailsError?.directorNumber
                      }
                    />
                  </div>
                  <div className="mb-8 me-3 flex justify-end">
                    <Button
                      onClick={handleAddMoreDirector}
                      text="Add More Director"
                      className="!w-fit bg-[#2B36D9] !px-4 mt-3"
                    />
                    {index > 0 && (
                      <span
                        onClick={() => handleRemoveDirector(index)}
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
              </div>
            );
          })}
          {/* <div className="grid grid-cols-3 gap-4">
            <Maininputfield
              label="Director Name"
              value={addSupplier.companySuiteDetails[0]?.directorName}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  companySuiteDetails: [
                    {
                      ...addSupplier.companySuiteDetails[0],
                      directorName: e.target.value,
                    },
                  ],
                });
              }}
            />
            <Maininputfield
              label="Director Email Address"
              value={addSupplier.companySuiteDetails[0]?.directorEmailAddress}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  companySuiteDetails: [
                    {
                      ...addSupplier.companySuiteDetails[0],
                      directorEmailAddress: e.target.value,
                    },
                  ],
                });
              }}
            />
            <Maininputfield
              label="Director Contact Number"
              value={addSupplier.companySuiteDetails[0]?.directorNumber}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  companySuiteDetails: [
                    {
                      ...addSupplier.companySuiteDetails[0],
                      directorNumber: e.target.value,
                    },
                  ],
                });
              }}
            />
          </div>
          <div className="flex justify-end py-2 px-4">
            <Button
              text="Add More Director"
              className="!w-fit bg-[#2B36D9] !px-4"
            />
          </div> */}
          <h2 className="text-black font-semibold mt-8 mb-4">Bank Details</h2>
          <div className="grid grid-cols-3 gap-4">
            <Maininputfield
              label="Account Name"
              value={addSupplier.bankDetails?.accountName}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  bankDetails: {
                    ...addSupplier.bankDetails,
                    accountName: e.target.value,
                  },
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    bankDetailsError: {
                      ...error.bankDetailsError,
                      accountName: "",
                    },
                  });
                }
              }}
              errorMessage={error.bankDetailsError?.accountName}
            />
            <Maininputfield
              label="Bank Name"
              value={addSupplier.bankDetails?.bankName}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  bankDetails: {
                    ...addSupplier.bankDetails,
                    bankName: e.target.value,
                  },
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    bankDetailsError: {
                      ...error.bankDetailsError,
                      bankName: "",
                    },
                  });
                }
              }}
              errorMessage={error.bankDetailsError?.bankName}
            />
            <Maininputfield
              label="BSB"
              value={addSupplier.bankDetails?.bsb}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  bankDetails: {
                    ...addSupplier.bankDetails,
                    bsb: e.target.value,
                  },
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    bankDetailsError: {
                      ...error.bankDetailsError,
                      bsb: "",
                    },
                  });
                }
              }}
              errorMessage={error.bankDetailsError?.bsb}
            />
            <Maininputfield
              label="Account Number"
              value={addSupplier.bankDetails?.accountNumber}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  bankDetails: {
                    ...addSupplier.bankDetails,
                    accountNumber: e.target.value,
                  },
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    bankDetailsError: {
                      ...error.bankDetailsError,
                      accountNumber: "",
                    },
                  });
                }
              }}
              errorMessage={error.bankDetailsError?.accountNumber}
            />
          </div>
          <h2 className="text-black font-semibold mt-8 mb-4">
            Business Coverage
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <DropDownMap
                label="Area Covered"
                mapOption={areaCollection}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
                value={addSupplier.businessCoverage?.areaCovered}
                onChange={(e: any) => {
                  setAddSupplier({
                    ...addSupplier,
                    businessCoverage: {
                      ...addSupplier.businessCoverage,
                      areaCovered: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      businessCoverageError: {
                        ...error.businessCoverageError,
                        areaCovered: "",
                      },
                    });
                  }
                }}
                errorMessage={error.businessCoverageError?.areaCovered}
              />
              {addSupplier.businessCoverage?.areaCovered === "Other" && (
                <div className="mt-3">
                  <Maininputfield
                    label="Other"
                    value={addSupplier.businessCoverage?.otherAreaCovered}
                    onChange={(e: any) => {
                      setAddSupplier({
                        ...addSupplier,
                        businessCoverage: {
                          ...addSupplier.businessCoverage,
                          otherAreaCovered: e.target.value,
                        },
                      });
                    }}
                    className="w-full"
                  />
                </div>
              )}
            </div>
            <div>
              <DropDownMap
                label="Business Operations"
                mapOption={businessOperationCollection}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
                value={addSupplier.businessCoverage?.businessOpreations}
                onChange={(e: any) => {
                  setAddSupplier({
                    ...addSupplier,
                    businessCoverage: {
                      ...addSupplier.businessCoverage,
                      businessOpreations: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      businessCoverageError: {
                        ...error.businessCoverageError,
                        businessOpreations: "",
                      },
                    });
                  }
                }}
                errorMessage={error.businessCoverageError?.businessOpreations}
              />
              {addSupplier.businessCoverage?.businessOpreations === "Other" && (
                <div className="mt-3">
                  <Maininputfield
                    label="Other"
                    value={
                      addSupplier.businessCoverage?.otherBusinessOpreations
                    }
                    onChange={(e: any) => {
                      setAddSupplier({
                        ...addSupplier,
                        businessCoverage: {
                          ...addSupplier.businessCoverage,
                          otherBusinessOpreations: e.target.value,
                        },
                      });
                    }}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>
          <h2 className="text-black font-semibold mt-8 mb-4">
            Warehouse Locations & Address
          </h2>
          {addMoreAddress?.map((item: any, index: number) => {
            return (
              <div key={index}>
                <h3 className="font-semibold  text-sm text-[#28353A] text-[16px]">
                  Address {index + 1}
                </h3>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <Maininputfield
                    label="Street 1"
                    value={item?.street1}
                    onChange={(e: any) =>
                      handleAddressChange(e, "street1", index)
                    }
                    className="w-full"
                    errorMessage={error.warehouseLocationError?.street1}
                  />
                  <Maininputfield
                    label="Street 2"
                    value={item?.street2}
                    onChange={(e: any) =>
                      handleAddressChange(e, "street2", index)
                    }
                    className="w-full"
                    errorMessage={error.warehouseLocationError?.street2}
                  />
                  <Maininputfield
                    label="Suburb"
                    value={item?.suburb}
                    onChange={(e: any) =>
                      handleAddressChange(e, "suburb", index)
                    }
                    className="w-full"
                    errorMessage={error.warehouseLocationError?.suburb}
                  />
                  <div>
                    <DropDownMap
                      label="State"
                      mapOption={stateCollection}
                      value={item?.state}
                      onChange={(e: any) =>
                        handleAddressChange(e, "state", index)
                      }
                      errorMessage={error.warehouseLocationError?.state}
                    />
                    {item?.state === "Other" && (
                      <div className="mt-3">
                        <Maininputfield
                          label="Other"
                          onChange={(e: any) =>
                            handleAddressChange(e, "otherState", index)
                          }
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>

                  <Maininputfield
                    label="Country"
                    // mapOption={countryCollection}
                    value={item?.country}
                    onChange={(e: any) =>
                      handleAddressChange(e, "country", index)
                    }
                    errorMessage={error.warehouseLocationError?.country}
                  />
                  <Maininputfield
                    label="Post Code"
                    value={item?.postcode}
                    onChange={(e: any) =>
                      handleAddressChange(e, "postcode", index)
                    }
                    className="w-full"
                    errorMessage={error.warehouseLocationError?.postcode}
                  />
                </div>
                <div className="mb-8 me-3 flex justify-end">
                  <Button
                    onClick={handleAddAddress}
                    text="Add More Addresses"
                    className="!w-fit bg-[#2B36D9] !px-4 mt-3"
                  />
                  {index > 0 && (
                    <span
                      onClick={() => handleRemoveAddress(index)}
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

          <h2 className="text-black font-semibold mt-8 mb-4">
            Cerificate Of Accreditation
          </h2>

          <div className="grid grid-cols-3 gap-4">
            <Maininputfield
              label="Accreditation Number"
              value={
                addSupplier.certificateOfAccreditation?.accreditationNumber
              }
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  certificateOfAccreditation: {
                    ...addSupplier.certificateOfAccreditation,
                    accreditationNumber: e.target.value,
                  },
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    certificateOfAccreditationError: {
                      ...error.certificateOfAccreditationError,
                      accreditationNumber: "",
                    },
                  });
                }
              }}
              errorMessage={
                error.certificateOfAccreditationError?.accreditationNumber
              }
            />

            <Maindatefield
              label="Mass Management Expiry Date"
              value={
                addSupplier.certificateOfAccreditation?.massManagementExpiryDate
              }
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  certificateOfAccreditation: {
                    ...addSupplier.certificateOfAccreditation,
                    massManagementExpiryDate: e.target.value,
                  },
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    certificateOfAccreditationError: {
                      ...error.certificateOfAccreditationError,
                      massManagementExpiryDate: "",
                    },
                  });
                }
              }}
              errorMessage={
                error.certificateOfAccreditationError?.massManagementExpiryDate
              }
            />
            <Maindatefield
              label="Basic Fatigue Management Expiry Date"
              value={
                addSupplier.certificateOfAccreditation?.basicFatigueExpiryDate
              }
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  certificateOfAccreditation: {
                    ...addSupplier.certificateOfAccreditation,
                    basicFatigueExpiryDate: e.target.value,
                  },
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    certificateOfAccreditationError: {
                      ...error.certificateOfAccreditationError,
                      basicFatigueExpiryDate: "",
                    },
                  });
                }
              }}
              errorMessage={
                error.certificateOfAccreditationError?.basicFatigueExpiryDate
              }
            />
            <Maindatefield
              label="Dangerous Goods Expiry Date"
              value={
                addSupplier.certificateOfAccreditation?.dangerousGoodsExpiryDate
              }
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  certificateOfAccreditation: {
                    ...addSupplier.certificateOfAccreditation,
                    dangerousGoodsExpiryDate: e.target.value,
                  },
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    certificateOfAccreditationError: {
                      ...error.certificateOfAccreditationError,
                      dangerousGoodsExpiryDate: "",
                    },
                  });
                }
              }}
              errorMessage={
                error.certificateOfAccreditationError?.dangerousGoodsExpiryDate
              }
            />
            <Maindatefield
              label="NHVAS Expiry Date"
              value={addSupplier.certificateOfAccreditation?.nhvassExpiryDate}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  certificateOfAccreditation: {
                    ...addSupplier.certificateOfAccreditation,
                    nhvassExpiryDate: e.target.value,
                  },
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    certificateOfAccreditationError: {
                      ...error.certificateOfAccreditationError,
                      nhvassExpiryDate: "",
                    },
                  });
                }
              }}
              errorMessage={
                error.certificateOfAccreditationError?.nhvassExpiryDate
              }
            />
            <Maindatefield
              label="HACCP Expiry Date"
              value={addSupplier.certificateOfAccreditation?.haccpExpiryDate}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  certificateOfAccreditation: {
                    ...addSupplier.certificateOfAccreditation,
                    haccpExpiryDate: e.target.value,
                  },
                });
                if (e.target.value.length > 0) {
                  setError({
                    ...error,
                    certificateOfAccreditationError: {
                      ...error.certificateOfAccreditationError,
                      haccpExpiryDate: "",
                    },
                  });
                }
              }}
              errorMessage={
                error.certificateOfAccreditationError?.haccpExpiryDate
              }
            />
          </div>
          <div className="w-fit my-4">
            <FileUpload
              file="Upload Accreditation Document"
              id="accreditationFile"
              name="accreditationDocument"
              onChange={handleAccreditationDocument}
              fileName={accreditationDocument?.file?.name || ""}
            />
          </div>
          <h2 className="text-black font-semibold mt-8 mb-4">
            Insurance Details
          </h2>
          <h3 className="text-black font-semibold text-sm mb-4">
            Product Liability
          </h3>

          <div className="grid grid-cols-3 gap-4">
            <Maininputfield
              label="Policy Number"
              value={
                addSupplier.insuranceDetails?.productLiability?.policyNumber
              }
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    productLiability: {
                      ...addSupplier.insuranceDetails.productLiability,
                      policyNumber: e.target.value,
                    },
                  },
                });
              }}
            />
            <Maininputfield
              label="Insurer"
              value={addSupplier.insuranceDetails?.productLiability?.insurer}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    productLiability: {
                      ...addSupplier.insuranceDetails.productLiability,
                      insurer: e.target.value,
                    },
                  },
                });
              }}
            />

            <Maindatefield
              label="Expiry Date"
              value={addSupplier.insuranceDetails?.productLiability?.expiryDate}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    productLiability: {
                      ...addSupplier.insuranceDetails.productLiability,
                      expiryDate: e.target.value,
                    },
                  },
                });
              }}
            />

            <Maininputfield
              label="Sum Assured"
              value={addSupplier.insuranceDetails?.productLiability?.sumAssured}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    productLiability: {
                      ...addSupplier.insuranceDetails.productLiability,
                      sumAssured: e.target.value,
                    },
                  },
                });
              }}
            />
            <FileUpload
              file="Attach Document"
              id="productFile"
              name="productDocument"
              onChange={handleProductLiabilityDocument}
              fileName={productDocument?.file?.name || ""}
            />
          </div>
          <h3 className="text-black font-semibold text-sm my-4">
            Public Liability
          </h3>

          <div className="grid grid-cols-3 gap-4">
            <Maininputfield
              label="Policy Number"
              value={
                addSupplier.insuranceDetails?.publicLiability?.policyNumber
              }
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    publicLiability: {
                      ...addSupplier.insuranceDetails.publicLiability,
                      policyNumber: e.target.value,
                    },
                  },
                });
              }}
            />
            <Maininputfield
              label="Insurer"
              value={addSupplier.insuranceDetails?.publicLiability?.insurer}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    publicLiability: {
                      ...addSupplier.insuranceDetails.publicLiability,
                      insurer: e.target.value,
                    },
                  },
                });
              }}
            />

            <Maindatefield
              label="Expiry Date"
              value={addSupplier.insuranceDetails?.publicLiability?.expiryDate}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    publicLiability: {
                      ...addSupplier.insuranceDetails.publicLiability,
                      expiryDate: e.target.value,
                    },
                  },
                });
              }}
            />

            <Maininputfield
              label="Sum Assured"
              value={addSupplier.insuranceDetails?.publicLiability?.sumAssured}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    publicLiability: {
                      ...addSupplier.insuranceDetails.publicLiability,
                      sumAssured: e.target.value,
                    },
                  },
                });
              }}
            />
            <FileUpload
              file="Attch Document"
              id="publicFile"
              name="publicDocument"
              onChange={handlePublicLiabilityDocument}
              fileName={publicDocument?.file?.name || ""}
            />
          </div>
          <h3 className="text-black font-semibold text-sm my-4">Work Cover</h3>

          <div className="grid grid-cols-3 gap-4">
            <Maininputfield
              label="Employer Number"
              value={addSupplier.insuranceDetails?.workCover?.employerNumber}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    workCover: {
                      ...addSupplier.insuranceDetails.workCover,
                      employerNumber: e.target.value,
                    },
                  },
                });
              }}
            />

            <Maindatefield
              label="Vaild From"
              value={addSupplier.insuranceDetails?.workCover?.valid}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    workCover: {
                      ...addSupplier.insuranceDetails.workCover,
                      valid: e.target.value,
                    },
                  },
                });
              }}
            />

            <Maindatefield
              label="Vaild Till"
              value={addSupplier.insuranceDetails?.workCover?.validTill}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    workCover: {
                      ...addSupplier.insuranceDetails.workCover,
                      validTill: e.target.value,
                    },
                  },
                });
              }}
            />

            <Maininputfield
              label="Due in days"
              value={addSupplier.insuranceDetails?.workCover?.duesDays}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    workCover: {
                      ...addSupplier.insuranceDetails.workCover,
                      duesDays: e.target.value,
                    },
                  },
                });
              }}
            />
            <FileUpload
              file="Attach Document"
              id="workCoverFile"
              name="workCoverDocument"
              onChange={handleWorkCoverDocument}
              fileName={workCoverDocument?.file?.name || ""}
            />
          </div>
          <h3 className="text-black font-semibold text-sm my-4">
            Marine (General & Refrigerated)
          </h3>

          <div className="grid grid-cols-3 gap-4">
            <Maininputfield
              label="Employer Number"
              value={addSupplier.insuranceDetails?.marineGeneral?.policyNumber}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    marineGeneral: {
                      ...addSupplier.insuranceDetails.marineGeneral,
                      policyNumber: e.target.value,
                    },
                  },
                });
              }}
            />
            <Maininputfield
              label="Insurer"
              value={addSupplier.insuranceDetails?.marineGeneral?.insurer}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    marineGeneral: {
                      ...addSupplier.insuranceDetails.marineGeneral,
                      insurer: e.target.value,
                    },
                  },
                });
              }}
            />

            <Maindatefield
              label="Expiry Date"
              value={addSupplier.insuranceDetails?.marineGeneral?.expiryDate}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    marineGeneral: {
                      ...addSupplier.insuranceDetails.marineGeneral,
                      expiryDate: e.target.value,
                    },
                  },
                });
              }}
            />

            <Maininputfield
              label="Sum Assured"
              value={addSupplier.insuranceDetails?.marineGeneral?.sumAssured}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    marineGeneral: {
                      ...addSupplier.insuranceDetails.marineGeneral,
                      sumAssured: e.target.value,
                    },
                  },
                });
              }}
            />
            <FileUpload
              file="Attach Document"
              id="marineFile"
              name="marineDocument"
              onChange={handleMarineDocument}
              fileName={marineDocument?.file?.name || ""}
            />
          </div>
          <h3 className="text-black font-semibold text-sm my-4">
            Marine (Alcohol)
          </h3>

          <div className="grid grid-cols-3 gap-4">
            <Maininputfield
              label="Employer Number"
              value={addSupplier.insuranceDetails?.marineAlcohol?.policyNumber}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    marineAlcohol: {
                      ...addSupplier.insuranceDetails.marineAlcohol,
                      policyNumber: e.target.value,
                    },
                  },
                });
              }}
            />
            <Maininputfield
              label="Insurer"
              value={addSupplier.insuranceDetails?.marineAlcohol?.insurer}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    marineAlcohol: {
                      ...addSupplier.insuranceDetails.marineAlcohol,
                      insurer: e.target.value,
                    },
                  },
                });
              }}
            />

            <Maindatefield
              label="Expiry Date"
              value={addSupplier.insuranceDetails?.marineAlcohol?.expiryDate}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    marineAlcohol: {
                      ...addSupplier.insuranceDetails.marineAlcohol,
                      expiryDate: e.target.value,
                    },
                  },
                });
              }}
            />

            <Maininputfield
              label="Sum Assured"
              value={addSupplier.insuranceDetails?.marineAlcohol?.sumAssured}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    marineAlcohol: {
                      ...addSupplier.insuranceDetails.marineAlcohol,
                      sumAssured: e.target.value,
                    },
                  },
                });
              }}
            />
            <FileUpload
              file="Attach Document"
              id="marineAlcoholFile"
              name="marineAlcoholDocument"
              onChange={handleMarineAlcoholDocument}
              fileName={marineAlcoholDocument?.file?.name || ""}
            />
          </div>
          <h3 className="text-black font-semibold text-sm my-4">COC</h3>

          <div className="grid grid-cols-3 gap-4">
            <Maininputfield
              label="Employer Number"
              value={addSupplier.insuranceDetails?.coc?.policyNumber}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    coc: {
                      ...addSupplier.insuranceDetails.coc,
                      policyNumber: e.target.value,
                    },
                  },
                });
              }}
            />
            <Maininputfield
              label="Insurer"
              value={addSupplier.insuranceDetails?.coc?.insurer}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    coc: {
                      ...addSupplier.insuranceDetails.coc,
                      insurer: e.target.value,
                    },
                  },
                });
              }}
            />

            <Maindatefield
              label="Expiry Date"
              value={addSupplier.insuranceDetails?.coc?.expiryDate}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    coc: {
                      ...addSupplier.insuranceDetails.coc,
                      expiryDate: e.target.value,
                    },
                  },
                });
              }}
            />
            <Maininputfield
              label="Sum Assured"
              value={addSupplier.insuranceDetails?.coc?.sumAssured}
              className="w-full"
              onChange={(e: any) => {
                setAddSupplier({
                  ...addSupplier,
                  insuranceDetails: {
                    ...addSupplier.insuranceDetails,
                    coc: {
                      ...addSupplier.insuranceDetails.coc,
                      sumAssured: e.target.value,
                    },
                  },
                });
              }}
            />
            <FileUpload
              file="Attach Document"
              id="cocFile"
              name="cocDocument"
              onChange={handleCocDocument}
              fileName={cocDocument?.file?.name || ""}
            />
          </div>
        </div>
      </div>
      <div className="bg-white mr-4 px-4 rounded-2xl mt-4 p-4">
        <div className="mb-4 mt-8">
          <div className="flex">
            <h3 className="w-full mb-4 rounded-2xl font-semibold text-black">
              {" "}
              Compliance Documents
            </h3>
            <button
              onClick={handleAddRow}
              className="text-white mb-2 flex justify-center items-center font-thin bg-[#2B36D9] w-[48px] h-[48px] pb-2 rounded-full text-[40px]"
            >
              +
            </button>
          </div>

          <div className="grid grid-cols-5 bg-table-header p-4 rounded-2xl text-black text-center mb-2 ">
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
          <div className="grid grid-cols-5 p-4 rounded-2xl text-black text-center items-center">
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

const carrierTypeCollection = [
  {
    value: "Trucking Carrier",
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

const businessOperationCollection = [
  {
    value: "Queensland ",
  },
  {
    value: "Victoria",
  },
  {
    value: "Other",
  },
];

const areaCollection = [
  {
    value: "Australian Capital Territory",
  },
  {
    value: "Northern Territory",
  },
  {
    value: "Tasmania, Victoria",
  },
  {
    value: "Other",
  },
];

const invoiceColletion = [
  {
    value: "Mail",
  },
  {
    value: "None",
  },
  {
    value: "Other",
  },
];

const invoiceComuColletion = [
  {
    value: "Accounts Payable Email, Operations Email",
  },
  {
    value: "Accounts Payable Email",
  },
  {
    value: "Accounts Receivable Email",
  },
  {
    value: "Opreations Email",
  },
  {
    value: "Compliance Email",
  },
  {
    value: "Admin Email",
  },
  {
    value: "Other",
  },
];
