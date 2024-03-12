import Image from "next/image";

import Progressbar from "../../../../components/Progressbar";
import Maininputfield from "../../../../components/Maininputfield";
import DropDownMap from "../../../../components/DropDownMap";
import { useEffect, useRef, useState } from "react";
import Button from "../../../../components/Button";
import FileUpload from "../../../../components/FileUpload";
import {
  addCustomer,
  uploadCustomerContractDocuments,
  uploadCustomerProfile,
} from "@/network-request/customer/customerApi";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
// import { correctCustomerStateName } from "../utility/utilityMethod";
// import { regexOfEmail, regexOfPhoneNumber, regexOfWebsite } from "../utility/commonRegex";
import toast, { Toaster } from "react-hot-toast";

const correctCustomerStateName = (stateName: string): string => {
  const nameMapping: { [key: string]: string } = {
    companyName: "Company Name",
    tradingName: "Trading Name",
    abnNumber: "ABN Number",
    legalName: "Legal Name",
    websiteAddress: "Website Address",
    firstName: "First Name",
    lastName: "Last Name",
    designation: "Designation",
    companyAddress: "Company Address",
    street1: "Street 1",
    street2: "Street 2",
    suburb: "Suburb",
    state: "State",
    country: "Country",
    postCode: "Post Code",
    accountPayble: "Account Payble",
    contactPerson: "Contact Person",
    contactNumber: "Contact Number",
    accountsPaybleEmail: "Accounts Payable Email",
    accountReceivable: "Account Receivable",
    accountsReceivableEmail: "Accounts Receivable Email",
    opreations: "Opreations",
    opreationsEmail: "Operations Email",
    compliance: "Compliance",
    complianceEmail: "Compliance Email",
    admin: "Admin",
    adminEmail: "Admin Email",
    invoicePrefrences: "Invoice Preferences",
    invoiceCommunicationPrefrences: "Invoice Communication Preferences",
    companySuiteDetails: "Company Suite Details",
    directorEmailAddress: "Director Email Address",
    directorContactNumber: "Director Contact Number",
    payment: "Payment",
    accountName: "Account Name",
    bankName: "Bank Name",
    bsb: "BSB",
    accountNumber: "Account Number",
    paymentTerm: "Payment Term",
    warehouseLocation: "Warehouse Location",
    document: "Document",
  };

  return nameMapping[stateName] || stateName;
};

const AddCustomer = () => {
  const [selectedData, setSelectedData] = useState("");
  const token = getCookie("token");
  const router = useRouter();

  const [customer, setCustomer] = useState<any>({
    avatar: "",
    companyName: "",
    tradingName: "",
    abnNumber: "",
    legalName: "",
    websiteAddress: "",
    firstName: "",
    lastName: "",
    designation: "",
    companyAddress: {
      street1: "",
      street2: "",
      suburb: "",
      state: "",
      country: "Australia",
      postCode: "",
    },

    accountPayble: {
      contactPerson: "",
      designation: "",
      contactNumber: "",
      accountsPaybleEmail: "",
    },

    accountReceivable: {
      contactPerson: "",
      designation: "",
      contactNumber: "",
      accountsReceivableEmail: "",
    },
    opreations: {
      contactPerson: "",
      designation: "",
      contactNumber: "",
      opreationsEmail: "",
    },
    compliance: {
      contactPerson: "",
      designation: "",
      contactNumber: "",
      complianceEmail: "",
    },
    admin: {
      contactPerson: "",
      designation: "",
      contactNumber: "",
      adminEmail: "",
    },
    invoicePrefrences: "",
    invoiceCommunicationPrefrences: "",
    companySuiteDetails: [],
    payment: {
      accountName: "",
      bankName: "",
      bsb: "",
      accountNumber: "",
    },
    paymentTerm: "",
    warehouseLocation: [],
    document: "",
  });

  const [error, setError] = useState<any>({
    companyNameError: "",
    tradingNameError: "",
    abnNumberError: "",
    legalNameError: "",
    websiteAddressError: "",
    firstNameError: "",
    lastNameError: "",
    designationError: "",

    companyAddressError: {
      street1: "",
      street2: "",
      suburb: "",
      state: "",
      country: "",
      postCode: "",
    },

    accountPaybleError: {
      contactPerson: "",
      designation: "",
      contactNumber: "",
      accountsPaybleEmail: "",
    },

    accountReceivableError: {
      contactPerson: "",
      designation: "",
      contactNumber: "",
      accountsReceivableEmail: "",
    },
    opreationsError: {
      contactPerson: "",
      designation: "",
      contactNumber: "",
      opreationsEmail: "",
    },
    complianceError: {
      contactPerson: "",
      designation: "",
      contactNumber: "",
      complianceEmail: "",
    },
    adminError: {
      contactPerson: "",
      designation: "",
      contactNumber: "",
      adminEmail: "",
    },
    invoicePrefrencesError: "",
    invoiceCommunicationPrefrencesError: "",
    paymentError: {
      accountName: "",
      bankName: "",
      bsb: "",
      accountNumber: "",
    },
    paymentTermError: "",
  });

  const [progressOfState, setProgressOfState] = useState({
    companyName: "",
    tradingName: "",
    abnNumber: "",
    legalName: "",
    websiteAddress: "",
    firstName: "",
    lastName: "",
    designation: "",
    companyAddressStreet1: "",
    companyAddressStreet2: "",
    companyAddressSuburb: "",
    companyAddressState: "",
    companyAddressCountry: "Australia",
    companyAddressPostCode: "",
    accountPaybleContactPerson: "",
    accountPaybleDesignation: "",
    accountPaybleContactNumber: "",
    accountPaybleAccountsPaybleEmail: "",
    accountReceivableContactPerson: "",
    accountReceivableDesignation: "",
    accountReceivableContactNumber: "",
    accountReceivableAccountsReceivableEmail: "",
    opreationsContactPerson: "",
    opreationsDesignation: "",
    opreationsContactNumber: "",
    opreationsOpreationsEmail: "",
    complianceContactPerson: "",
    complianceDesignation: "",
    complianceContactNumber: "",
    complianceComplianceEmail: "",
    adminContactPerson: "",
    adminDesignation: "",
    adminContactNumber: "",
    adminAdminEmail: "",
    invoicePrefrences: "",
    invoiceCommunicationPrefrences: "",
    companySuiteDetailsDesignation: "",
    companySuiteDetailsDirectorEmailAddress: "",
    companySuiteDetailsDirectorContactNumber: "",
    paymentAccountName: "",
    paymentBankName: "",
    paymentBsb: "",
    paymentAccountNumber: "",
    paymentTerm: "",
    warehouseLocationStreet1: "",
    warehouseLocationStreet2: "",
    warehouseLocationSuburb: "",
    warehouseLocationState: "",
    warehouseLocationCountry: "Australia",
    warehouseLocationPostCode: "",
  });
  const [addMoreDirector, setAddMoreDirector] = useState<Array<any>>([]);
  const [addMoreAddress, setAddMoreAddress] = useState<Array<any>>([]);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgressOfState({
      ...progressOfState,
      companyName: customer.companyName,
      tradingName: customer.tradingName,
      abnNumber: customer.abnNumber,
      legalName: customer.legalName,
      websiteAddress: customer.websiteAddress,
      firstName: customer.firstName,
      lastName: customer.lastName,
      designation: customer.designation,
      companyAddressStreet1: customer.companyAddress.street1,
      companyAddressStreet2: customer.companyAddress.street2,
      companyAddressSuburb: customer.companyAddress.suburb,
      companyAddressState: customer.companyAddress.state,
      companyAddressCountry: customer.companyAddress.country,
      companyAddressPostCode: customer.companyAddress.postCode,
      accountPaybleContactPerson: customer.accountPayble.contactPerson,
      accountPaybleDesignation: customer.accountPayble.designation,
      accountPaybleContactNumber: customer.accountPayble.contactNumber,
      accountPaybleAccountsPaybleEmail:
        customer.accountPayble.accountsPaybleEmail,
      accountReceivableContactPerson: customer.accountReceivable.contactPerson,
      accountReceivableDesignation: customer.accountReceivable.designation,
      accountReceivableContactNumber: customer.accountReceivable.contactNumber,
      accountReceivableAccountsReceivableEmail:
        customer.accountReceivable.accountsReceivableEmail,
      opreationsContactPerson: customer.opreations.contactPerson,
      opreationsDesignation: customer.opreations.designation,
      opreationsContactNumber: customer.opreations.contactNumber,
      opreationsOpreationsEmail: customer.opreations.opreationsEmail,
      complianceContactPerson: customer.compliance.contactPerson,
      complianceDesignation: customer.compliance.designation,
      complianceContactNumber: customer.compliance.contactNumber,
      complianceComplianceEmail: customer.compliance.complianceEmail,
      adminContactPerson: customer.admin.contactPerson,
      adminDesignation: customer.admin.designation,
      adminContactNumber: customer.admin.contactNumber,
      adminAdminEmail: customer.admin.adminEmail,
      invoicePrefrences: customer.invoicePrefrences,
      invoiceCommunicationPrefrences: customer.invoiceCommunicationPrefrences,
      companySuiteDetailsDesignation: addMoreDirector[0]?.designation,
      companySuiteDetailsDirectorEmailAddress:
        addMoreDirector[0]?.directorEmailAddress,
      companySuiteDetailsDirectorContactNumber:
        addMoreDirector[0]?.directorContactNumber,
      paymentAccountName: customer.payment.accountName,
      paymentBankName: customer.payment.bankName,
      paymentBsb: customer.payment.bsb,
      paymentAccountNumber: customer.payment.accountNumber,
      paymentTerm: customer.paymentTerm,
      warehouseLocationStreet1: addMoreAddress[0]?.street1,
      warehouseLocationStreet2: addMoreAddress[0]?.street2,
      warehouseLocationSuburb: addMoreAddress[0]?.suburb,
      warehouseLocationState: addMoreAddress[0]?.state,
      warehouseLocationCountry: addMoreAddress[0]?.country,
      warehouseLocationPostCode: addMoreAddress[0]?.postCode,
    });
  }, [addMoreAddress, customer, addMoreDirector]);

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

  // *********** Add More Director ********************************

  useEffect(() => {
    if (addMoreDirector.length === 0) {
      setAddMoreDirector([
        {
          designation: "",
          directorEmailAddress: "",
          directorContactNumber: "",
        },
      ]);
    }
  }, []);

  const handleExperienceChange = (value: any, fieldName: any, index: any) => {
    const data = [...addMoreDirector];
    data[index][fieldName] = value.target.value;
    setAddMoreDirector(data);
  };

  const handleAddMoreExperience = () => {
    setAddMoreDirector([
      ...addMoreDirector,
      {
        designation: "",
        directorEmailAddress: "",
        directorContactNumber: "",
      },
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    setAddMoreDirector(addMoreDirector.filter((_, i) => i !== index));
  };

  // *********** Add More Address ********************************

  useEffect(() => {
    if (addMoreAddress.length === 0) {
      setAddMoreAddress([
        {
          street1: "",
          street2: "",
          suburb: "",
          state: "",
          country: "Australia",
          postCode: "",
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
        postCode: "",
      },
    ]);
  };

  const handleRemoveAddress = (index: number) => {
    setAddMoreAddress(addMoreAddress.filter((_, i) => i !== index));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");

  const handleUploadClick: any = () => {
    if (fileInputRef.current) {
      fileInputRef?.current?.click();
    }
  };
  const [documentRender, setDocumentRender] = useState("");
  const [selectedUploadContractDocument, setSelectedUploadContractDocument] =
    useState("");

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
    setSelectedUploadContractDocument,
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

    // Uploading customer profile ...
    const [profileUrl] = await Promise.all([
      Promise.all(
        Object.values(selectedProfile)?.map((imageInfo) =>
          uploadCustomerProfile(imageInfo)
        )
      ),
    ]);

    // Uploading customer contract documents ...
    const [customerContract] = await Promise.all([
      Promise.all(
        Object.values(selectedUploadContractDocument)?.map((imageInfo) =>
          uploadCustomerContractDocuments(imageInfo)
        )
      ),
    ]);

    console.log("Avatar", profileUrl[0]?.response);

    const updatedDirector = addMoreDirector?.map((director: any) => {
      console.log({ director });
      return {
        ...director,
        designation: director?.designation,
        directorEmailAddress: director?.directorEmailAddress,
        directorContactNumber: director?.directorContactNumber,
      };
    });

    const updatedAddress = addMoreAddress?.map((address: any) => {
      console.log({ address });
      return {
        ...address,
        street1: address?.street1,
        street2: address?.street2,
        suburb: address?.suburb,
        state: address?.state,
        country: address?.country,
        postCode: address?.postCode,
      };
    });

    const newCustomer = {
      ...customer,
      avatar: profileUrl[0]?.response,
      document: customerContract[0]?.response,
      companySuiteDetails: updatedDirector,
      warehouseLocation: updatedAddress,
    };

    const response: any = await addCustomer(newCustomer, token || "");

    if (response?.status === 200) {
      toast("Customer has been successfully created..", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
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
    Object.keys(customer).forEach((key) => {
      if (
        key !== "document" &&
        key !== "avatar" &&
        key !== "companySuiteDetails" &&
        key !== "warehouseLocation"
      ) {
        if (typeof customer[key] === "object" && customer[key] !== null) {
          // Handle nested objects with a different logic
          Object.keys(customer[key]).forEach((nestedKey) => {
            const nestedKeyPath = `${key}Error.${nestedKey}`;
            if (
              !customer[key][nestedKey] ||
              customer[key][nestedKey] === undefined
            ) {
              newErrors[key + "Error"][nestedKey] = `${correctCustomerStateName(
                nestedKey
              )} is required in ${correctCustomerStateName(key)}`;
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

          if (!customer[key]) {
            newErrors[key + "Error"] = `${correctCustomerStateName(
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

  console.log("State", customer);
  console.log("Error", error);

  const regexOfPhoneNumber = /^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$/;
  const regexOfEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.+([a-zA-Z0-9-]+)2*$/;
  const regexOfWebsite = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

  return (
    <>
      {/* <Header /> */}
      <div className="flex bg-[#F8F8F8]">
        <div>
          <Toaster />
        </div>
        {/* <div className="sticky top-0">
          <Sidebar />
        </div> */}
        <div className="ml-[316px] w-full mt-4">
          <div className="bg-white mr-4 flex justify-between items-center rounded-md">
            <h2 className=" w-full p-4 rounded-md font-bold text-[#16161D] text-[24px]">
              Add Customer
            </h2>
            <div className="h-8 w-8 flex justify-center cursor-pointer text-2xl items-center bg-blueGrey-100 rounded-full mr-4">
              <span className="mt-[-2px] ml-[2px] text-[#292D32] rotate-45">
                +
              </span>
            </div>
          </div>
          <div className="bg-white mr-4 px-4  mt-4 p-4 rounded-md">
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
          </div>
          <div className="bg-white mr-4 mt-4 rounded-md">
            <h2 className="font-semibold p-4 text-[#151515] text-[18px]">
              Company Information
            </h2>
            <div className="grid grid-cols-3 gap-4 p-4">
              <Maininputfield
                label="Company Name"
                value={customer.companyName}
                onChange={(e: any) => {
                  setCustomer({ ...customer, companyName: e.target.value });
                  if (e.target.value.length > 0) {
                    setError({ ...error, companyNameError: "" });
                  }
                }}
                className="w-full"
                errorMessage={error.companyNameError}
              />
              <Maininputfield
                label="Trading Name"
                vsalue={customer.tradingName}
                onChange={(e: any) => {
                  setCustomer({ ...customer, tradingName: e.target.value });
                  if (e.target.value.length > 0) {
                    setError({ ...error, tradingNameError: "" });
                  }
                }}
                className="w-full"
                errorMessage={error.tradingNameError}
              />
              <Maininputfield
                label="ABN"
                value={
                  customer.abnNumber === undefined ? "" : customer.abnNumber
                }
                onChange={(e: any) => {
                  // regex for only accepting integer values
                  const regex = /^-?\d*$/; // Allow an empty string or any integer
                  if (!regex.test(e.target.value)) {
                    setError({
                      ...error,
                      abnNumberError: "Please enter only numbers",
                    });
                  } else {
                    setCustomer((prevCustomer: any) => {
                      const newAbnNumber =
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value);
                      return { ...prevCustomer, abnNumber: newAbnNumber };
                    });
                    if (e.target.value.length > 0) {
                      setError({ ...error, abnNumberError: "" });
                    }
                  }
                }}
                className="w-full"
                errorMessage={error.abnNumberError}
              />

              <Maininputfield
                label="Legal Name"
                value={customer.legalName}
                onChange={(e: any) => {
                  setCustomer({ ...customer, legalName: e.target.value });
                  if (e.target.value.length > 0) {
                    setError({ ...error, legalNameError: "" });
                  }
                }}
                className="w-full"
                errorMessage={error.legalNameError}
              />
              <Maininputfield
                label="Website Address"
                value={customer.websiteAddress}
                onChange={(e: any) => {
                  const inputValue = e.target.value;
                  if (!regexOfWebsite.test(inputValue)) {
                    setError({
                      ...error,
                      websiteAddressError:
                        "Please enter a valid webiste address",
                    });
                  } else {
                    setError({ ...error, websiteAddressError: "" });
                  }
                  setCustomer({ ...customer, websiteAddress: e.target.value });
                }}
                className="w-full"
                errorMessage={error.websiteAddressError}
              />
              {/* <Maininputfield
                label="Customer ID"
                value={customer.customerId}
                className="w-full"
              /> */}
              <Maininputfield
                label="First Name"
                value={customer.firstName}
                onChange={(e: any) => {
                  setCustomer({ ...customer, firstName: e.target.value });
                  if (e.target.value.length > 0) {
                    setError({ ...error, firstNameError: "" });
                  }
                }}
                className="w-full"
                errorMessage={error.firstNameError}
              />
              <Maininputfield
                label="Last Name"
                value={customer.lastName}
                onChange={(e: any) => {
                  setCustomer({ ...customer, lastName: e.target.value });
                  if (e.target.value.length > 0) {
                    setError({ ...error, lastNameError: "" });
                  }
                }}
                className="w-full"
                errorMessage={error.lastNameError}
              />
              <Maininputfield
                label="Designation"
                value={customer.designation}
                onChange={(e: any) => {
                  setCustomer({ ...customer, designation: e.target.value });
                  if (e.target.value.length > 0) {
                    setError({ ...error, designationError: "" });
                  }
                }}
                className="w-full"
                errorMessage={error.designationError}
              />
            </div>
          </div>
          <div className="bg-white mr-4 mt-4 rounded-md">
            <h2 className="font-semibold p-4 text-[#151515] text-[18px]">
              Company Address
            </h2>
            <div className="grid grid-cols-3 gap-4 p-4">
              <Maininputfield
                label="Street 1"
                value={customer.companyAddress.street1}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    companyAddress: {
                      ...customer.companyAddress,
                      street1: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      companyAddressError: {
                        ...error.companyAddressError,
                        street1: "",
                      },
                    });
                  }
                }}
                className="w-full"
                errorMessage={error.companyAddressError?.street1}
              />
              <Maininputfield
                label="Street 2"
                value={customer.companyAddress.street2}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    companyAddress: {
                      ...customer.companyAddress,
                      street2: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      companyAddressError: {
                        ...error.companyAddressError,
                        street2: "",
                      },
                    });
                  }
                }}
                className="w-full"
                errorMessage={error.companyAddressError?.street2}
              />
              <Maininputfield
                label="Suburb"
                value={customer.companyAddress.suburb}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    companyAddress: {
                      ...customer.companyAddress,
                      suburb: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      companyAddressError: {
                        ...error.companyAddressError,
                        suburb: "",
                      },
                    });
                  }
                }}
                className="w-full"
                errorMessage={error.companyAddressError?.suburb}
              />
              <div>
                <DropDownMap
                  label="State"
                  mapOption={stateCollection}
                  value={customer.companyAddress.state}
                  onChange={(e: any) => {
                    setCustomer({
                      ...customer,
                      companyAddress: {
                        ...customer.companyAddress,
                        state: e.target.value,
                      },
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        companyAddressError: {
                          ...error.companyAddressError,
                          state: "",
                        },
                      });
                    }
                  }}
                  errorMessage={error.companyAddressError?.state}
                  // selectedData={selectedData}
                  // setSelectedData={setSelectedData}
                />
                {customer?.companyAddress?.state === "Other" && (
                  <div className="mt-3">
                    <Maininputfield label="Other" className="w-full" />
                  </div>
                )}
              </div>

              <Maininputfield
                label="Country"
                // mapOption={countryCollection}
                value={customer?.companyAddress?.country}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    companyAddress: {
                      ...customer.companyAddress,
                      country: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      companyAddressError: {
                        ...error.companyAddressError,
                        country: "",
                      },
                    });
                  }
                }}
                errorMessage={error.companyAddressError?.country}
                // selectedData={selectedData}
                // setSelectedData={setSelectedData}
              />
              <Maininputfield
                label="Post Code"
                value={customer.companyAddress.postCode}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    companyAddress: {
                      ...customer.companyAddress,
                      postCode: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      companyAddressError: {
                        ...error.companyAddressError,
                        postCode: "",
                      },
                    });
                  }
                }}
                className="w-full"
                validationSchema={"test"}
                errorMessage={error.companyAddressError?.postCode}
              />
            </div>
          </div>
          <div className="bg-white mr-4 mt-4 rounded-md">
            <h2 className="font-semibold p-4 text-[#151515] text-[18px]">
              Contact Information
            </h2>
            <h3 className="font-semibold px-4 text-sm text-[#28353A] text-[16px]">
              Accounts Payable
            </h3>
            <div className="grid grid-cols-3 gap-4 p-4">
              <Maininputfield
                label="Contact Person"
                value={customer.accountPayble.contactPerson}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    accountPayble: {
                      ...customer.accountPayble,
                      contactPerson: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      accountPaybleError: {
                        ...error.accountPaybleError,
                        contactPerson: "",
                      },
                    });
                  }
                }}
                className="w-full"
                errorMessage={error.accountPaybleError?.contactPerson}
              />
              <Maininputfield
                label="Designation"
                value={customer.accountPayble.designation}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    accountPayble: {
                      ...customer.accountPayble,
                      designation: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      accountPaybleError: {
                        ...error.accountPaybleError,
                        designation: "",
                      },
                    });
                  }
                }}
                className="w-full"
                errorMessage={error.accountPaybleError?.designation}
              />
              <Maininputfield
                label="Contact Number"
                value={customer.accountPayble.contactNumber}
                onChange={(e: any) => {
                  const phoneNumber = e.target.value;
                  // Check if the entered value is a valid 10-digit phone number
                  if (!regexOfPhoneNumber.test(phoneNumber)) {
                    setError((prevError: any) => ({
                      ...prevError,
                      accountPaybleError: {
                        ...prevError.accountPaybleError,
                        contactNumber:
                          "Please enter a valid 10-digit phone number",
                      },
                    }));
                  } else {
                    setError((prevError: any) => ({
                      ...prevError,
                      accountPaybleError: {
                        ...prevError.accountPaybleError,
                        contactNumber: "", // Clear the error if the input is valid
                      },
                    }));
                  }
                  setCustomer((prevCustomer: any) => ({
                    ...prevCustomer,
                    accountPayble: {
                      ...prevCustomer.accountPayble,
                      contactNumber: phoneNumber,
                    },
                  }));
                }}
                className="w-full"
                errorMessage={error.accountPaybleError?.contactNumber}
              />

              <Maininputfield
                label="Accounts Payable Email"
                value={customer.accountPayble.accountsPaybleEmail}
                onChange={(e: any) => {
                  const inputValue = e.target.value;
                  if (!regexOfEmail.test(inputValue)) {
                    setError({
                      ...error,
                      accountPaybleError: {
                        ...error.accountPaybleError,
                        accountsPaybleEmail:
                          "Please enter a valid email address",
                      },
                    });
                  } else {
                    setError({
                      ...error,
                      accountPaybleError: {
                        ...error.accountPaybleError,
                        accountsPaybleEmail: "",
                      },
                    });
                  }
                  setCustomer({
                    ...customer,
                    accountPayble: {
                      ...customer.accountPayble,
                      accountsPaybleEmail: e.target.value,
                    },
                  });
                }}
                className="w-full"
                errorMessage={error.accountPaybleError?.accountsPaybleEmail}
              />
            </div>
            <h3 className="font-semibold px-4 text-sm text-[#28353A] text-[16px]">
              Accounts Receivable
            </h3>
            <div className="grid grid-cols-3 gap-4 p-4">
              <Maininputfield
                label="Contact Person"
                value={customer.accountReceivable.contactPerson}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    accountReceivable: {
                      ...customer.accountReceivable,
                      contactPerson: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      accountReceivableError: {
                        ...error.accountReceivableError,
                        contactPerson: "",
                      },
                    });
                  }
                }}
                className="w-full"
                errorMessage={error.accountReceivableError?.contactPerson}
              />
              <Maininputfield
                label="Designation"
                value={customer.accountReceivable.designation}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    accountReceivable: {
                      ...customer.accountReceivable,
                      designation: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      accountReceivableError: {
                        ...error.accountReceivableError,
                        designation: "",
                      },
                    });
                  }
                }}
                className="w-full"
                errorMessage={error.accountReceivableError?.designation}
              />
              <Maininputfield
                label="Contact Number"
                value={customer.accountReceivable.contactNumber}
                onChange={(e: any) => {
                  const phoneNumber = e.target.value;
                  // Check if the entered value is a valid 10-digit phone number
                  if (!regexOfPhoneNumber.test(phoneNumber)) {
                    setError((prevError: any) => ({
                      ...prevError,
                      accountReceivableError: {
                        ...prevError.accountReceivableError,
                        contactNumber:
                          "Please enter a valid 10-digit phone number",
                      },
                    }));
                  } else {
                    setError((prevError: any) => ({
                      ...prevError,
                      accountReceivableError: {
                        ...prevError.accountReceivableError,
                        contactNumber: "", // Clear the error if the input is valid
                      },
                    }));
                  }
                  setCustomer((prevCustomer: any) => ({
                    ...prevCustomer,
                    accountReceivable: {
                      ...prevCustomer.accountReceivable,
                      contactNumber: phoneNumber,
                    },
                  }));
                }}
                className="w-full"
                errorMessage={error.accountReceivableError?.contactNumber}
              />

              <Maininputfield
                label="Accounts Receivable Email"
                value={customer.accountReceivable.accountsReceivableEmail}
                onChange={(e: any) => {
                  const inputValue = e.target.value;
                  if (!regexOfEmail.test(inputValue)) {
                    setError({
                      ...error,
                      accountReceivableError: {
                        ...error.accountReceivableError,
                        accountsReceivableEmail:
                          "Please enter a valid email address",
                      },
                    });
                  } else {
                    setError({
                      ...error,
                      accountReceivableError: {
                        ...error.accountReceivableError,
                        accountsReceivableEmail: "",
                      },
                    });
                  }
                  setCustomer({
                    ...customer,
                    accountReceivable: {
                      ...customer.accountReceivable,
                      accountsReceivableEmail: e.target.value,
                    },
                  });
                }}
                className="w-full"
                errorMessage={
                  error.accountReceivableError?.accountsReceivableEmail
                }
              />
            </div>
            <h3 className="font-semibold px-4 text-sm text-[#28353A] text-[16px]">
              Operations
            </h3>
            <div className="grid grid-cols-3 gap-4 p-4">
              <Maininputfield
                label="Contact Person"
                value={customer.opreations.contactPerson}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    opreations: {
                      ...customer.opreations,
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
                className="w-full"
                errorMessage={error.opreationsError?.contactPerson}
              />
              <Maininputfield
                label="Designation"
                value={customer.opreations.designation}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    opreations: {
                      ...customer.opreations,
                      designation: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      opreationsError: {
                        ...error.opreationsError,
                        designation: "",
                      },
                    });
                  }
                }}
                className="w-full"
                errorMessage={error.opreationsError?.designation}
              />
              <Maininputfield
                label="Contact Number"
                value={customer.opreations.contactNumber}
                onChange={(e: any) => {
                  const phoneNumber = e.target.value;
                  // Check if the entered value is a valid 10-digit phone number
                  if (!regexOfPhoneNumber.test(phoneNumber)) {
                    setError((prevError: any) => ({
                      ...prevError,
                      opreationsError: {
                        ...prevError.opreationsError,
                        contactNumber:
                          "Please enter a valid 10-digit phone number",
                      },
                    }));
                  } else {
                    setError((prevError: any) => ({
                      ...prevError,
                      opreationsError: {
                        ...prevError.opreationsError,
                        contactNumber: "", // Clear the error if the input is valid
                      },
                    }));
                  }
                  setCustomer((prevCustomer: any) => ({
                    ...prevCustomer,
                    opreations: {
                      ...prevCustomer.opreations,
                      contactNumber: phoneNumber,
                    },
                  }));
                }}
                className="w-full"
                errorMessage={error.opreationsError?.contactNumber}
              />

              <Maininputfield
                label="Operations Email"
                value={customer.opreations.opreationsEmail}
                onChange={(e: any) => {
                  const inputValue = e.target.value;
                  if (!regexOfEmail.test(inputValue)) {
                    setError({
                      ...error,
                      opreationsError: {
                        ...error.opreationsError,
                        opreationsEmail: "Please enter a valid email address",
                      },
                    });
                  } else {
                    setError({
                      ...error,
                      opreationsError: {
                        ...error.opreationsError,
                        opreationsEmail: "",
                      },
                    });
                  }
                  setCustomer({
                    ...customer,
                    opreations: {
                      ...customer.opreations,
                      opreationsEmail: e.target.value,
                    },
                  });
                }}
                className="w-full"
                errorMessage={error.opreationsError?.opreationsEmail}
              />
            </div>
            <h3 className="font-semibold px-4 text-sm text-[#28353A] text-[16px]">
              Compliance
            </h3>
            <div className="grid grid-cols-3 gap-4 p-4">
              <Maininputfield
                label="Contact Person"
                value={customer.compliance.contactPerson}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    compliance: {
                      ...customer.compliance,
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
                className="w-full"
                errorMessage={error.complianceError?.contactPerson}
              />
              <Maininputfield
                label="Designation"
                value={customer.compliance.designation}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    compliance: {
                      ...customer.compliance,
                      designation: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      complianceError: {
                        ...error.complianceError,
                        designation: "",
                      },
                    });
                  }
                }}
                className="w-full"
                errorMessage={error.complianceError?.designation}
              />
              <Maininputfield
                label="Contact Number"
                value={customer.compliance.contactNumber}
                onChange={(e: any) => {
                  const phoneNumber = e.target.value;
                  // Check if the entered value is a valid 10-digit phone number
                  if (!regexOfPhoneNumber.test(phoneNumber)) {
                    setError((prevError: any) => ({
                      ...prevError,
                      complianceError: {
                        ...prevError.complianceError,
                        contactNumber:
                          "Please enter a valid 10-digit phone number",
                      },
                    }));
                  } else {
                    setError((prevError: any) => ({
                      ...prevError,
                      complianceError: {
                        ...prevError.complianceError,
                        contactNumber: "", // Clear the error if the input is valid
                      },
                    }));
                  }
                  setCustomer((prevCustomer: any) => ({
                    ...prevCustomer,
                    compliance: {
                      ...prevCustomer.compliance,
                      contactNumber: phoneNumber,
                    },
                  }));
                }}
                className="w-full"
                errorMessage={error.complianceError?.contactNumber}
              />

              <Maininputfield
                label="Compliance Email"
                value={customer.compliance.complianceEmail}
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
                  setCustomer({
                    ...customer,
                    compliance: {
                      ...customer.compliance,
                      complianceEmail: e.target.value,
                    },
                  });
                }}
                className="w-full"
                errorMessage={error.complianceError?.complianceEmail}
              />
            </div>
            <h3 className="font-semibold px-4 text-sm text-[#28353A] text-[16px]">
              Admin
            </h3>
            <div className="grid grid-cols-3 gap-4 p-4">
              <Maininputfield
                label="Contact Person"
                value={customer.admin.contactPerson}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    admin: { ...customer.admin, contactPerson: e.target.value },
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
                className="w-full"
                errorMessage={error.adminError?.contactPerson}
              />
              <Maininputfield
                label="Designation"
                value={customer.admin.designation}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    admin: { ...customer.admin, designation: e.target.value },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      adminError: {
                        ...error.adminError,
                        designation: "",
                      },
                    });
                  }
                }}
                className="w-full"
                errorMessage={error.adminError?.designation}
              />
              <Maininputfield
                label="Contact Number"
                value={customer.admin.contactNumber}
                onChange={(e: any) => {
                  const phoneNumber = e.target.value;
                  // Check if the entered value is a valid 10-digit phone number
                  if (!regexOfPhoneNumber.test(phoneNumber)) {
                    setError((prevError: any) => ({
                      ...prevError,
                      adminError: {
                        ...prevError.adminError,
                        contactNumber:
                          "Please enter a valid 10-digit phone number",
                      },
                    }));
                  } else {
                    setError((prevError: any) => ({
                      ...prevError,
                      adminError: {
                        ...prevError.adminError,
                        contactNumber: "", // Clear the error if the input is valid
                      },
                    }));
                  }
                  setCustomer((prevCustomer: any) => ({
                    ...prevCustomer,
                    admin: {
                      ...prevCustomer.admin,
                      contactNumber: phoneNumber,
                    },
                  }));
                }}
                className="w-full"
                errorMessage={error.adminError?.contactNumber}
              />

              <Maininputfield
                label="Admin Email"
                value={customer.admin.adminEmail}
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
                  setCustomer({
                    ...customer,
                    admin: { ...customer.admin, adminEmail: e.target.value },
                  });
                }}
                className="w-full"
                errorMessage={error.adminError?.adminEmail}
              />
            </div>
            <h3 className="font-semibold px-4 text-sm text-[#28353A] text-[16px]">
              Invoice Preferences
            </h3>
            <div>
              <div className="grid grid-cols-3 gap-4 ml-4 mt-4 mb-3">
                <DropDownMap
                  label="Invoice Preferences"
                  mapOption={invoiceColletion}
                  value={customer.invoicePrefrences}
                  onChange={(e: any) => {
                    setCustomer({
                      ...customer,
                      invoicePrefrences: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        invoicePrefrencesError: "",
                      });
                    }
                  }}
                  errorMessage={error.invoicePrefrencesError}
                />
              </div>
              {customer?.invoicePrefrences === "Other" && (
                <div className="grid grid-cols-3 gap-4 ml-4 mb-4 mt-3">
                  <Maininputfield label="Other" className="w-full" />
                </div>
              )}
            </div>

            <h3 className="font-semibold px-4 text-sm text-[#28353A] text-[16px]">
              Invoice Communication Preferences
            </h3>

            <div>
              <div className="grid grid-cols-3 gap-4 ml-4 mt-4 mb-4">
                <DropDownMap
                  label="Select Email"
                  mapOption={invoiceComuColletion}
                  value={customer.invoiceCommunicationPrefrences}
                  onChange={(e: any) => {
                    setCustomer({
                      ...customer,
                      invoiceCommunicationPrefrences: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        invoiceCommunicationPrefrencesError: "",
                      });
                    }
                  }}
                  errorMessage={error.invoiceCommunicationPrefrencesError}
                />
              </div>
              {customer.invoiceCommunicationPrefrences === "Other" && (
                <div className="grid grid-cols-3 gap-4 ml-4 mt-3 mb-4">
                  <Maininputfield label="Other" className="w-full" />
                </div>
              )}
            </div>

            <h3 className="font-semibold mb-4 px-4 text-sm text-[#28353A] text-[16px]">
              Company C-Suite Details
            </h3>
            {addMoreDirector?.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <div>
                    <h3 className="font-semibold px-4 text-sm text-[#28353A] text-[16px]">
                      Director {index + 1}
                    </h3>
                    <div className="grid grid-cols-3 gap-4 p-4">
                      <Maininputfield
                        label="Designation"
                        value={item?.designation}
                        onChange={(e: any) =>
                          handleExperienceChange(e, "designation", index)
                        }
                        // onChange={(e: any) => {
                        //   setCustomer({
                        //     ...customer,
                        //     companySuiteDetails: {
                        //       ...customer.companySuiteDetails,
                        //       designation: e.target.value,
                        //     },
                        //   });
                        //   if (e.target.value.length > 0) {
                        //     setError({
                        //       ...error,
                        //       companySuiteDetailsError: {
                        //         ...error.companySuiteDetailsError,
                        //         designation: "",
                        //       },
                        //     });
                        //   }
                        // }}
                        className="w-full"
                        errorMessage={
                          error.companySuiteDetailsError?.designation
                        }
                      />
                      <Maininputfield
                        label="Director Email Address"
                        value={item?.directorEmailAddress}
                        onChange={(e: any) =>
                          handleExperienceChange(
                            e,
                            "directorEmailAddress",
                            index
                          )
                        }
                        // onChange={(e: any) => {
                        //   const inputValue = e.target.value;
                        //   if (!regexOfEmail.test(inputValue)) {
                        //     setError({
                        //       ...error,
                        //       companySuiteDetailsError: {
                        //         ...error.companySuiteDetailsError,
                        //         directorEmailAddress:
                        //           "Please enter a valid email address",
                        //       },
                        //     });
                        //   } else {
                        //     setError({
                        //       ...error,
                        //       companySuiteDetailsError: {
                        //         ...error.companySuiteDetailsError,
                        //         directorEmailAddress: "",
                        //       },
                        //     });
                        //   }
                        //   setCustomer({
                        //     ...customer,
                        //     companySuiteDetails: {
                        //       ...customer.companySuiteDetails,
                        //       directorEmailAddress: e.target.value,
                        //     },
                        //   });
                        // }}
                        className="w-full"
                        errorMessage={
                          error.companySuiteDetailsError?.directorEmailAddress
                        }
                      />
                      <Maininputfield
                        label="Director Contact Number"
                        value={item?.directorContactNumber}
                        onChange={(e: any) =>
                          handleExperienceChange(
                            e,
                            "directorContactNumber",
                            index
                          )
                        }
                        // onChange={(e: any) => {
                        //   const phoneNumber = e.target.value;
                        //   if (!regexOfPhoneNumber.test(phoneNumber)) {
                        //     setError((prevError: any) => ({
                        //       ...prevError,
                        //       companySuiteDetailsError: {
                        //         ...prevError.companySuiteDetailsError,
                        //         directorContactNumber:
                        //           "Please enter a valid 10-digit phone number",
                        //       },
                        //     }));
                        //   } else {
                        //     setError((prevError: any) => ({
                        //       ...prevError,
                        //       companySuiteDetailsError: {
                        //         ...prevError.companySuiteDetailsError,
                        //         directorContactNumber: "",
                        //       },
                        //     }));
                        //   }
                        //   setCustomer((prevCustomer: any) => ({
                        //     ...prevCustomer,
                        //     companySuiteDetails: {
                        //       ...prevCustomer.companySuiteDetails,
                        //       directorContactNumber: phoneNumber,
                        //     },
                        //   }));
                        // }}
                        className="w-full"
                        errorMessage={
                          error.companySuiteDetailsError?.directorContactNumber
                        }
                      />
                    </div>
                    <div className="mb-8 me-3 flex justify-end">
                      <Button
                        onClick={handleAddMoreExperience}
                        text="Add More Director"
                        className="!w-fit bg-[#2B36D9] !px-4"
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
                </div>
              );
            })}
            {/* <h3 className="font-semibold mt-4 px-4 text-sm text-[#28353A] text-[16px]">
              Director
            </h3>
            <div className="grid grid-cols-3 gap-4 p-4">
              <Maininputfield
                label="Designation"
                value={customer.companySuiteDetails.designation}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    companySuiteDetails: {
                      ...customer.companySuiteDetails,
                      designation: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      companySuiteDetailsError: {
                        ...error.companySuiteDetailsError,
                        designation: "",
                      },
                    });
                  }
                }}
                className="w-full"
                errorMessage={error.companySuiteDetailsError?.designation}
              />
              <Maininputfield
                label="Director Email Address"
                value={customer.companySuiteDetails.directorEmailAddress}
                onChange={(e: any) => {
                  const inputValue = e.target.value;
                  if (!regexOfEmail.test(inputValue)) {
                    setError({
                      ...error,
                      companySuiteDetailsError: {
                        ...error.companySuiteDetailsError,
                        directorEmailAddress:
                          "Please enter a valid email address",
                      },
                    });
                  } else {
                    setError({
                      ...error,
                      companySuiteDetailsError: {
                        ...error.companySuiteDetailsError,
                        directorEmailAddress: "",
                      },
                    });
                  }
                  setCustomer({
                    ...customer,
                    companySuiteDetails: {
                      ...customer.companySuiteDetails,
                      directorEmailAddress: e.target.value,
                    },
                  });
                }}
                className="w-full"
                errorMessage={
                  error.companySuiteDetailsError?.directorEmailAddress
                }
              />
              <Maininputfield
                label="Director Contact Number"
                value={customer.companySuiteDetails.directorContactNumber}
                onChange={(e: any) => {
                  const phoneNumber = e.target.value;
                  if (!regexOfPhoneNumber.test(phoneNumber)) {
                    setError((prevError: any) => ({
                      ...prevError,
                      companySuiteDetailsError: {
                        ...prevError.companySuiteDetailsError,
                        directorContactNumber:
                          "Please enter a valid 10-digit phone number",
                      },
                    }));
                  } else {
                    setError((prevError: any) => ({
                      ...prevError,
                      companySuiteDetailsError: {
                        ...prevError.companySuiteDetailsError,
                        directorContactNumber: "",
                      },
                    }));
                  }
                  setCustomer((prevCustomer: any) => ({
                    ...prevCustomer,
                    companySuiteDetails: {
                      ...prevCustomer.companySuiteDetails,
                      directorContactNumber: phoneNumber,
                    },
                  }));
                }}
                className="w-full"
                errorMessage={
                  error.companySuiteDetailsError?.directorContactNumber
                }
              />
            </div>
            <div className="flex justify-end py-2 px-4">
              <Button
                text="Add More Director"
                className="!w-fit bg-[#2B36D9] !px-4"
              />
            </div> */}
            <h2 className="font-semibold p-4 text-[#151515] text-[18px]">
              {" "}
              Payment
            </h2>

            <h3 className="font-semibold px-4 text-sm text-[#28353A] text-[16px]">
              Bank Details
            </h3>
            <div className="grid grid-cols-3 gap-4 p-4">
              <Maininputfield
                label="Account Name"
                value={customer.payment.accountName}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    payment: {
                      ...customer.payment,
                      accountName: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      paymentError: {
                        ...error.paymentError,
                        accountName: "",
                      },
                    });
                  }
                }}
                className="w-full"
                errorMessage={error.paymentError?.accountName}
              />
              <Maininputfield
                label="Bank Name"
                value={customer.payment.bankName}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    payment: { ...customer.payment, bankName: e.target.value },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      paymentError: {
                        ...error.paymentError,
                        bankName: "",
                      },
                    });
                  }
                }}
                className="w-full"
                errorMessage={error.paymentError?.bankName}
              />
              <Maininputfield
                label="BSB"
                value={customer.payment.bsb}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    payment: { ...customer.payment, bsb: e.target.value },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      paymentError: {
                        ...error.paymentError,
                        bsb: "",
                      },
                    });
                  }
                }}
                className="w-full"
                errorMessage={error.paymentError?.bsb}
              />
              <Maininputfield
                label="Account Number"
                value={customer.payment.accountNumber}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    payment: {
                      ...customer.payment,
                      accountNumber: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      paymentError: {
                        ...error.paymentError,
                        accountNumber: "",
                      },
                    });
                  }
                }}
                className="w-full"
                errorMessage={error.paymentError?.accountNumber}
              />
            </div>
            <h3 className="font-semibold px-4 text-sm text-[#28353A] text-[16px]">
              Payment Terms
            </h3>
            <div>
              <div className="grid grid-cols-3 gap-4 ml-4 mt-4 mb-4">
                <DropDownMap
                  label="Term"
                  mapOption={paymentTermsCollection}
                  value={customer.paymentTerm}
                  onChange={(e: any) => {
                    setCustomer({ ...customer, paymentTerm: e.target.value });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        paymentTermError: "",
                      });
                    }
                  }}
                  errorMessage={error.paymentTermError}
                />
              </div>
              {customer?.paymentTerm === "Other" && (
                <div className="grid grid-cols-3 gap-4 ml-4 mt-3">
                  <Maininputfield label="Other" className="w-full" />
                </div>
              )}
            </div>

            <h2 className="font-semibold p-4 text-[#151515] text-[18px]">
              {" "}
              Warehouse Locations & Address
            </h2>
            {addMoreAddress?.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <h3 className="font-semibold px-4 text-sm text-[#28353A] text-[16px]">
                    Address {index + 1}
                  </h3>
                  <div className="grid grid-cols-3 gap-4 p-4">
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
                        <div className="mt-4">
                          <Maininputfield label="Other" className="w-full" />
                        </div>
                      )}
                    </div>

                    <Maininputfield
                      label="Country"
                      mapOption={countryCollection}
                      value={item?.country}
                      onChange={(e: any) =>
                        handleAddressChange(e, "country", index)
                      }
                      errorMessage={error.warehouseLocationError?.country}
                    />
                    <Maininputfield
                      label="Post Code"
                      value={item?.postCode}
                      onChange={(e: any) =>
                        handleAddressChange(e, "postCode", index)
                      }
                      className="w-full"
                      errorMessage={error.warehouseLocationError?.postCode}
                    />
                  </div>
                  <div className="mb-8 me-3 flex justify-end">
                    <Button
                      onClick={handleAddAddress}
                      text="Add More Addresses"
                      className="!w-fit bg-[#2B36D9] !px-4"
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
            {/* <h3 className="font-semibold px-4 text-sm text-[#28353A] text-[16px]">
              Address 1
            </h3>
            <div className="grid grid-cols-3 gap-4 p-4">
              <Maininputfield
                label="Street 1"
                value={customer.warehouseLocation.street1}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    warehouseLocation: {
                      ...customer.warehouseLocation,
                      street1: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      warehouseLocationError: {
                        ...error.warehouseLocationError,
                        street1: "",
                      },
                    });
                  }
                }}
                className="w-full"
                errorMessage={error.warehouseLocationError?.street1}
              />
              <Maininputfield
                label="Street 2"
                value={customer.warehouseLocation.street2}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    warehouseLocation: {
                      ...customer.warehouseLocation,
                      street2: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      warehouseLocationError: {
                        ...error.warehouseLocationError,
                        street2: "",
                      },
                    });
                  }
                }}
                className="w-full"
                errorMessage={error.warehouseLocationError?.street2}
              />
              <Maininputfield
                label="Suburb"
                value={customer.warehouseLocation.suburb}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    warehouseLocation: {
                      ...customer.warehouseLocation,
                      suburb: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      warehouseLocationError: {
                        ...error.warehouseLocationError,
                        suburb: "",
                      },
                    });
                  }
                }}
                className="w-full"
                errorMessage={error.warehouseLocationError?.suburb}
              />
              <DropDownMap
                label="State"
                mapOption={stateCollection}
                value={customer.warehouseLocation.state}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    warehouseLocation: {
                      ...customer.warehouseLocation,
                      state: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      warehouseLocationError: {
                        ...error.warehouseLocationError,
                        state: "",
                      },
                    });
                  }
                }}
                errorMessage={error.warehouseLocationError?.state}
              />
              <Maininputfield
                label="Country"
                mapOption={countryCollection}
                value={customer.warehouseLocation.country}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    warehouseLocation: {
                      ...customer.warehouseLocation,
                      country: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      warehouseLocationError: {
                        ...error.warehouseLocationError,
                        country: "",
                      },
                    });
                  }
                }}
                errorMessage={error.warehouseLocationError?.country}
              />
              <Maininputfield
                label="Post Code"
                value={customer.warehouseLocation.postCode}
                onChange={(e: any) => {
                  setCustomer({
                    ...customer,
                    warehouseLocation: {
                      ...customer.warehouseLocation,
                      postCode: e.target.value,
                    },
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      warehouseLocationError: {
                        ...error.warehouseLocationError,
                        postCode: "",
                      },
                    });
                  }
                }}
                className="w-full"
                errorMessage={error.warehouseLocationError?.postCode}
              />
            </div>
            <div className="flex justify-end py-2 px-4">
              <Button
                text="Add More Addresses"
                className="!w-fit bg-[#2B36D9] !px-4"
              />
            </div> */}
            <h2 className="font-semibold p-4 text-[#151515] text-[18px]">
              {" "}
              Contract Document
            </h2>

            <div className="grid grid-cols-3 gap-4 p-4">
              <FileUpload
                file="Upload Contractual Document"
                onChange={handleDocumentUpload}
                id="customerContractualFile"
                name="customerContractualDocument"
                //@ts-expect-error
                fileName={selectedUploadContractDocument?.file?.name || ""}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 my-4 px-4 mb-20">
            <Button
              text="Save"
              className="!bg-transparent !w-fit border border-[#e5e5e5] !text-black px-8"
            />
            <Button
              onClick={handleSubmit}
              text="Create"
              className="!w-fit px-8"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCustomer;
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
const paymentTermsCollection = [
  {
    value: "Net 30",
  },
  {
    value: "Net 15",
  },
  {
    value: "Net 14",
  },
  {
    value: "Net 7",
  },
  {
    value: "Due on Receipt",
  },
  {
    value: "Net 45",
  },
  {
    value: "End of the Month",
  },
  {
    value: "Net Monthly Account",
  },
  {
    value: "Cash in Advance",
  },
  {
    value: "Cash on Delivery",
  },
  {
    value: "Other",
  },
];
