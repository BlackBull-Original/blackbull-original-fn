import Image from "next/image";
import Button from "./Button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  deleteDriver,
  getAllDrives,
  uploadDriverBulkDocuments,
} from "@/network-request/driver/driverApi";
import { getCookie } from "cookies-next";
import MobileInput from "./mobile-input/MobileInput";
import toast, { Toaster } from "react-hot-toast";
import Maininputfield from "./Maininputfield";
import FileBulkUpload from "./FileBulkUpload";
const DriverDetails = () => {
  const [action, setAction] = useState(false);
  const [addPopUp, setAddPop] = useState(false);
  const [link, setLink] = useState(false);
  const [bulkUpload, setBulkUpload] = useState(false);
  const [deletePopUp, setDelete] = useState(false);
  const router = useRouter();
  const token = getCookie("token");
  const [driveToDelete, setDriverToDelete] = useState("");

  const [drivers, setDrivers] = useState([]);
  const regexOfEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.+([a-zA-Z0-9-]+)2*$/;
  const [sendLinkContact, setSendLinkContact] = useState({
    phoneNumber: "",
    email: "",
  });

  const [sendLinkError, setSendLinkError] = useState({
    emailError: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Number of items to display per page

  // Get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = drivers.slice(indexOfFirstItem, indexOfLastItem);

  const [documentRender, setDocumentRender] = React.useState("");
  const [selectedUploadBulkDocument, setselectedUploadBulkDocument] =
    React.useState<any>("");

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
    setselectedUploadBulkDocument,
    setDocumentRender
  );

  // Render vehicle items
  const renderDriverItems = () => {
    return currentItems.map((item: any, index) => (
      <div
        key={index}
        className="grid text-center grid-cols-[10%_10%_10%_10%_10%_10%_10%_10%_10%_10%] p-4 border"
      >
        <React.Fragment key={item?._id}>
          <p className="mb-4">{item?.firstName}</p>
          <p className="mb-4">{item?.lastName}</p>
          <p className="mb-4">{item?.licenseDetails?.licenseCardNumber}</p>
          <p className="mb-4">{item?.licenseHistory?.type}</p>
          <p className="mb-4">{item?.licenseDetails?.expiryDate}</p>
          <p className="mb-4">{item?.licenseDetails?.state}</p>
          <p className="mb-4">No Data</p>
          <p className="mb-4">No Data</p>
          <p className="mb-4">No Data</p>
          <div className="flex justify-center gap-2 mb-4">
            {/* <Image
                          src={"/edit.svg"}
                          alt="edit"
                          width={18}
                          height={18}
                          onClick={() => {
                            router.push({
                              pathname: "/onboarding/edit-driver",
                              query: { id: item?._id },
                            })
                          }}
                          className="cursor-pointer"
                        /> */}
            <Image
              src={"/trash.svg"}
              alt="edit"
              width={18}
              height={18}
              className="cursor-pointer"
              onClick={() => {
                setDelete(true);
                setDriverToDelete(item?._id);
              }}
            />
          </div>

          {/* <div className="mb-4">{item?.licenseDetails?.licenseType}</div>
                      <div className="mb-4">{item?.licenseDetails?.expiryDate}</div>
                      <div className="mb-4">{item?.licenseDetails?.state}</div>
                      <div className="mb-4">{item?.licenceDoc}</div>
                      <div className="mb-4">{item?.visaStatus}</div>
                      <div className="mb-4">{item?.complaint}</div> */}
        </React.Fragment>
      </div>
    ));
  };

  const getDrivers = async () => {
    const data = await getAllDrives(token || "");
    if (data) {
      setDrivers(data.data);
    }
  };

  useEffect(() => {
    getDrivers();
  }, []);

  const handleDelete = async () => {
    const response = await deleteDriver(token || "", driveToDelete);
    if (response) {
      setDriverToDelete("");
      setDelete(false);
      getDrivers();
    } else {
      setDelete(false);
      setDriverToDelete("");
    }
  };

  console.log({ drivers }, { token });

  const sendLinkHandler = () => {
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
    toast("Link sent successfully.", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    setTimeout(() => {
      setLink(false);
      setAction(false);
    }, 3000);
  };

  const checkValidation = () => {
    let hasError = false;
    if (sendLinkContact.email === "" && sendLinkContact.phoneNumber === "") {
      hasError = true;
      toast("Please type email OR phone number!!", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else if (sendLinkError.emailError !== "") {
      hasError = true;
      toast("Please type valid email address !!", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    return hasError;
  };

  const bulkUploadHanlder = async () => {
    try {
      const uploadDocument = await Promise.all(
        Object.values(selectedUploadBulkDocument)?.map(
          (file) => uploadDriverBulkDocuments(token, file) // Corrected function name
        )
      );
      console.log("uploadDocument", uploadDocument);
      if (uploadDocument[0].success === true) {
        toast("Data added successfully.", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        toast("Duplicate data found!!", {
          icon: "⚠️",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
      setTimeout(() => {
        setselectedUploadBulkDocument("");
        setBulkUpload(false);
        getDrivers();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mr-4">
        <h2 className="bg-white w-full p-4 rounded-2xl font-bold">
          Driver Details
        </h2>
        <div>
          <div className="mt-4 mb-20 bg-white p-4 rounded-2xl items-center ">
            <div className="flex items-center justify-between">
              <h3 className="leading-loose font-semibold">
                Existing Driver List
              </h3>
              <div className="flex gap-2 relative">
                <button
                  onClick={() => setBulkUpload(true)}
                  className="text-[#2B36D9] font-semibold mx-2"
                >
                  Bulk Upload
                </button>
                <Button
                  text="Choose Action"
                  className="px-4 rounded-xl"
                  dropDownIcon
                  onClick={() => setAction(!action)}
                />
                {action === true && (
                  <>
                    <div className="absolute top-[40px] right-0 w-[142px] text-center bg-white font-semibold">
                      <div
                        className="py-2 rounded cursor-pointer hover:bg-[#032272] hover:text-white"
                        onClick={() => setAddPop(true)}
                      >
                        Add Driver
                      </div>
                      <div
                        onClick={() => setLink(true)}
                        className="py-2 rounded cursor-pointer hover:bg-[#032272] hover:text-white"
                      >
                        Send Form Link
                      </div>
                      <div className="py-2 rounded cursor-pointer hover:bg-[#032272] hover:text-white">
                        Pending Reviews
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div>
              <div className="grid text-center grid-cols-[10%_10%_10%_10%_10%_10%_10%_10%_10%_10%] bg-[#EFF2F3] p-4 rounded-md mt-4">
                {driverDetailsHeading?.map((value, index) => {
                  return (
                    <>
                      <div className="font-semibold text-sm" key={index}>
                        {value.heading}
                      </div>
                    </>
                  );
                })}
              </div>
              {/* <div className="grid items-center text-center grid-cols-[10%_10%_10%_10%_10%_10%_10%_10%_10%_10%] p-4 border">
                {drivers?.map((item: any, ind: number) => {
                  return (
                    <React.Fragment key={item?._id}>
                      <p className="mb-4">{item?.firstName}</p>
                      <p className="mb-4">{item?.lastName}</p>
                      <p className="mb-4">
                        {item?.licenseDetails?.licenseCardNumber}
                      </p>
                      <p className="mb-4">{item?.licenseHistory?.type}</p>
                      <p className="mb-4">{item?.licenseDetails?.expiryDate}</p>
                      <p className="mb-4">{item?.licenseDetails?.state}</p>
                      <p className="mb-4">No Data</p>
                      <p className="mb-4">No Data</p>
                      <p className="mb-4">No Data</p>
                      <div className="flex justify-center gap-2 mb-4">
                        <Image
                          src={"/trash.svg"}
                          alt="edit"
                          width={18}
                          height={18}
                          className="cursor-pointer"
                          onClick={() => {
                            setDelete(true);
                            setDriverToDelete(item?._id);
                          }}
                        />
                      </div>
                    </React.Fragment>
                  );
                })}
              </div> */}
              {renderDriverItems()}
              {deletePopUp === true ? (
                <>
                  <div className="w-screen h-screen  fixed top-0 left-0 backdrop-blur-md flex">
                    <div className="w-[440px] h-[120px] bg-white m-auto rounded-xl relative border">
                      <p className="text-center mt-4 mb-2">
                        Are you sure you want to delete this driver details?
                      </p>
                      <div className="flex justify-end absolute bottom-4 right-4 gap-2">
                        <Button
                          text="Cancel"
                          className="!bg-transparent border-[null] font-semibold !text-[#000] !py-[4px] !px-[8px]"
                          onClick={() => {
                            setDelete(false);
                            setDriverToDelete("");
                          }}
                        />
                        <Button
                          text="Confirm"
                          className="rounded-md !py-[4px] !px-[8px] !bg-red-500"
                          onClick={() => handleDelete()}
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            {/* Pagination */}
            <div className="flex justify-between pt-4 bg-white  p-4">
              <div>
                Showing {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, drivers.length)} of {drivers.length}{" "}
                entries
              </div>
              <div className="flex gap-2">
                <div
                  className={`bg-[#CED7DB] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                    currentPage === 1
                      ? "bg-gray-100 cursor-not-allowed"
                      : "bg-[#D9D9D9]"
                  }`}
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                >
                  <Image
                    src="/chevron_right.png"
                    alt="chevron right"
                    width={22}
                    height={22}
                    className="transform rotate-180"
                  />
                </div>
                <div
                  className={`bg-[#CED7DB] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                    currentPage === Math.ceil(drivers.length / itemsPerPage)
                      ? "bg-gray-100 cursor-not-allowed"
                      : "bg-[#D9D9D9]"
                  }`}
                  onClick={() => {
                    if (
                      currentPage !== Math.ceil(drivers.length / itemsPerPage)
                    ) {
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                >
                  <Image
                    src="/chevron_right.png"
                    alt="chevron right"
                    width={22}
                    height={22}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {addPopUp === true ? (
          <>
            <div className="w-screen h-screen  fixed top-0 left-0 backdrop-blur-md flex">
              <div className="w-[440px] h-[176px] bg-white m-auto rounded-xl relative border">
                <h4 className="text-center font-semibold p-4">
                  Add a New Driver
                </h4>
                <p className="text-center">
                  Are you sure you want to add a driver?
                </p>
                <div className="flex justify-end absolute bottom-4 right-4 gap-2">
                  <Button
                    text="Cancel"
                    className="!bg-transparent border-[null] font-semibold !text-[#000] !py-[4px] !px-[8px]"
                    onClick={() => setAddPop(false)}
                  />
                  <Button
                    text="Add Driver"
                    className="rounded-md !py-[4px] !px-[8px]"
                    onClick={() => router.push("/onboarding/create-driver")}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {link === true && (
          <div className="w-screen h-screen  fixed top-0 left-0 backdrop-blur-md flex">
            <div className="w-[550px] h-fit p-4 bg-white m-auto rounded-xl relative border">
              <h4 className="text-center font-semibold p-4 mb-2">
                Choose your preferred option for receiving the form link
              </h4>
              <div>
                <Toaster />
              </div>
              <div className="grid gap-2 justify-center">
                <div>
                  <MobileInput
                    state={sendLinkContact}
                    setState={setSendLinkContact}
                  />
                </div>
                <div className="text-center">or</div>
                <div>
                  <Maininputfield
                    label="Email"
                    labelClass="text-sm mb-1 font-semibold"
                    value={sendLinkContact.email}
                    onChange={(e: any) => {
                      const inputValue = e.target.value;
                      if (!regexOfEmail.test(inputValue)) {
                        setSendLinkError({
                          ...sendLinkError,
                          emailError: "Please enter a valid email address",
                        });
                      } else {
                        setSendLinkError({ ...sendLinkError, emailError: "" });
                      }
                      setSendLinkContact({
                        ...sendLinkContact,
                        email: e.target.value,
                      });
                    }}
                    className="!font-bold"
                    errorMessage={sendLinkError.emailError}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <Button
                  text="Cancel"
                  className="!bg-transparent border-[null] font-semibold !text-[#000] !py-[6px] !px-4"
                  onClick={() => setLink(false)}
                />
                <Button
                  text="Send Link"
                  className="rounded-md !py-[6px] !px-4"
                  onClick={sendLinkHandler}
                />
              </div>
            </div>
          </div>
        )}
        {bulkUpload === true && (
          <div className="w-screen h-screen  fixed top-0 left-0 backdrop-blur-md flex">
            <div className="w-[450px] h-fit p-4 bg-white m-auto rounded-xl relative border">
              <div
                className="flex justify-end cursor-pointer"
                onClick={() => setBulkUpload(false)}
              >
                <Image src="/add.svg" alt="calender" width={42} height={42} />
              </div>
              <h4 className="text-center mt-[-1.5em] font-bold p-4">
                Streamline Your Fleet
              </h4>
              <p className="mb-4 text-center">
                Upload your list in bulk for a seamless and time-saving
                experience.
              </p>
              <div className="grid gap-2 justify-center">
                <FileBulkUpload
                  id="driverDocumentFile"
                  className="font-semibold"
                  name="vehicleDocumentDocument"
                  onChange={handleProfileFileChange}
                  fileName={
                    selectedUploadBulkDocument?.file?.name ||
                    "Upload Vehicle Document"
                  }
                />
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <button>
                  <a className="font-semibold me-2" href="/driver.csv" download>
                    Download Template
                  </a>
                </button>
                <Button
                  text="Upload"
                  className="rounded-md !py-[6px] !px-4"
                  onClick={bulkUploadHanlder}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default DriverDetails;
const driverDetailsHeading = [
  {
    heading: "FIRST NAME",
  },
  {
    heading: "LAST NAME",
  },
  {
    heading: "LICENCE NO.",
  },
  {
    heading: "LICENCE TYPE",
  },
  {
    heading: "EXPIRY DATE",
  },
  {
    heading: "STATE",
  },
  {
    heading: "LICENCE DOC.",
  },
  {
    heading: "STATUS",
  },
  {
    heading: "COMPLAINT",
  },
  {
    heading: "Action",
  },
];
const driverDetailsData = [
  {
    firstName: "Gagandeep Singh",
    lastName: "Ranu",
    licenceNo: "038639930",
    licenceType: "Multi Combination",
    expiryDate: "12/08/2025",
    state: "Victoria",
    licenceDoc: "view",
    status: "STATUS",
    complaint: "YES",
  },
  {
    firstName: "Karam Singh",
    lastName: "Deol",
    licenceNo: "049083926",
    licenceType: "Multi Combination",
    expiryDate: "22/05/2024",
    state: "Victoria",
    licenceDoc: "view",
    status: "STATUS",
    complaint: "NO",
  },
  {
    firstName: "Gurpreet Singh",
    lastName: "Sidhu",
    licenceNo: "052468941",
    licenceType: "Multi Combination",
    expiryDate: "17/10/2027",
    state: "Victoria",
    licenceDoc: "view",
    status: "STATUS",
    complaint: "NO",
  },
  {
    firstName: "Gagandeep singh",
    lastName: "Ranu",
    licenceNo: "HN0849",
    licenceType: "Multi Combination",
    expiryDate: "08/12/2025",
    state: "South Australia",
    licenceDoc: "view",
    status: "STATUS",
    complaint: "NO",
  },
  {
    firstName: "Gagandeep Singh",
    lastName: "Ranu",
    licenceNo: "038639930",
    licenceType: "Multi Combination",
    expiryDate: "12/08/2025",
    state: "Victoria",
    licenceDoc: "view",
    status: "STATUS",
    complaint: "YES",
  },
  {
    firstName: "Karam Singh",
    lastName: "Deol",
    licenceNo: "049083926",
    licenceType: "Multi Combination",
    expiryDate: "22/05/2024",
    state: "Victoria",
    licenceDoc: "view",
    status: "STATUS",
    complaint: "NO",
  },
];
