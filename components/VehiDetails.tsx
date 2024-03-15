import Image from "next/image";
import Button from "./Button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Maininputfield from "./Maininputfield";
import MobileInput from "./mobile-input/MobileInput";
import FileUpload from "./FileUpload";
import { getCookie } from "cookies-next";
import {
  deleteVehicle,
  getAllVehicle,
  uploadBulkDocuments,
} from "@/network-request/vehicle/vehicleApi";
import toast, { Toaster } from "react-hot-toast";
import FileBulkUpload from "./FileBulkUpload";

const VehiDetails = () => {
  const token = getCookie("token");
  const [action, setAction] = useState(false);
  const [addPopUp, setAddPop] = useState(false);
  const router = useRouter();
  const [link, setLink] = useState(false);
  const [bulkUpload, setBulkUpload] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState("");
  const [deletePopUp, setDelete] = useState(false);
  // fetching vechial list
  const [vehicleList, setvehicleList] = React.useState([]);
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
  const currentItems = vehicleList.slice(indexOfFirstItem, indexOfLastItem);

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
  const renderVehicleItems = () => {
    return currentItems.map((item: any, index) => (
      <div
        key={index}
        className="grid text-center grid-cols-[12%_16%_12%_12%_12%_12%_12%_12%] p-4 border"
      >
        <>
          <div key={index} className="mb-4" style={{ color: "#000" }}>
            {item?.registrationNumber}
          </div>
          <div className="mb-4" style={{ color: "#000" }}>
            {item.vehicleType}
          </div>
          <div className="mb-4" style={{ color: "#000" }}>
            {"None"}
          </div>
          <div className="mb-4" style={{ color: "#000" }}>
            {item?.registrationExpiry}
          </div>
          <div className="mb-4" style={{ color: "#000" }}>
            {item?.vehicleDocumentStatus}
          </div>
          <div className="mb-4" style={{ color: "#000" }}>
            {item?.registrationStatus}
          </div>
          <div className="mb-4" style={{ color: "#000" }}>
            {item?.compliancePlate}
          </div>
          <div
            className="mb-6 flex gap-2 justify-center"
            style={{ color: "#000" }}
          >
            {/* <Image
                          src={"/edit.svg"}
                          alt="svg"
                          width={24}
                          height={24}
                          onClick={() => {
                            router.push({
                              pathname: "/onboarding/edit-vehicle",
                              query: { id: item?._id },
                            });
                          }}
                          className="cursor-pointer"
                        /> */}
            <Image
              src={"/trash.svg"}
              alt="svg"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={() => {
                setDelete(true);
                setVehicleToDelete(item?._id);
              }}
            />
          </div>
        </>
      </div>
    ));
  };

  const getVehicles = async () => {
    const data = await getAllVehicle(token || "");
    if (data) {
      setvehicleList(data.data);
    }
  };

  useEffect(() => {
    getVehicles();
  }, []);

  const handleDelete = async () => {
    const response = await deleteVehicle(token || "", vehicleToDelete);
    if (response) {
      setVehicleToDelete("");
      setDelete(false);
      getVehicles();
    } else {
      setDelete(false);
      setVehicleToDelete("");
    }
  };

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
          (file) => uploadBulkDocuments(token, file) // Corrected function name
        )
      );
      console.log("uploadDocument",uploadDocument)
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
        setselectedUploadBulkDocument("")
        setBulkUpload(false);
        getVehicles();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mr-4">
        <div>
          <Toaster />
        </div>
        <h2 className="bg-white w-full p-4 rounded-2xl font-bold">
          Vehicle Details
        </h2>
        <div>
          <div className="mt-4 mb-20 bg-white p-4 rounded-2xl items-center ">
            <div className="flex items-center justify-between">
              <h3 className="leading-loose font-semibold">
                Existing Vehicle List
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
                  className="rounded-full px-4"
                  dropDownIcon
                  onClick={() => setAction(!action)}
                />
                {action === true && (
                  <>
                    <div className="absolute top-[42px] right-2 w-[142px] text-center bg-white font-semibold">
                      <div
                        className="py-2 rounded cursor-pointer hover:bg-[#032272] hover:text-white"
                        onClick={() => setAddPop(true)}
                      >
                        Add Vehicle
                      </div>
                      <div
                        className="py-2 rounded cursor-pointer hover:bg-[#032272] hover:text-white"
                        onClick={() => setLink(true)}
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
              <div className="grid text-center grid-cols-[12%_16%_12%_12%_12%_12%_12%_12%] bg-[#EFF2F3] p-4 rounded-md mt-4">
                {vehicleDetailsHeading.map((value, index) => {
                  return (
                    <div
                      className="font-semibold"
                      key={index}
                      style={{ color: "#000" }}
                    >
                      {value.heading}
                    </div>
                  );
                })}
              </div>
              {renderVehicleItems()}
              {deletePopUp === true ? (
                <>
                  <div className="w-screen h-screen  fixed top-0 left-0 backdrop-blur-md flex">
                    <div className="w-[440px] h-[120px] bg-white m-auto rounded-xl relative border">
                      <p className="text-center mt-4 mb-2">
                        Are you sure you want to delete this vehicle details?
                      </p>
                      <div className="flex justify-end absolute bottom-4 right-4 gap-2">
                        <Button
                          text="Cancel"
                          className="!bg-transparent border !text-[#000] !py-[4px] !px-[8px]"
                          onClick={() => {
                            setDelete(false);
                            setVehicleToDelete("");
                          }}
                        />
                        <Button
                          text="Confirm"
                          className=" !py-[4px] !px-[8px] !bg-red-500"
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
                {Math.min(indexOfLastItem, vehicleList.length)} of{" "}
                {vehicleList.length} entries
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
                    currentPage === Math.ceil(vehicleList.length / itemsPerPage)
                      ? "bg-gray-100 cursor-not-allowed"
                      : "bg-[#D9D9D9]"
                  }`}
                  onClick={() => {
                    if (
                      currentPage !==
                      Math.ceil(vehicleList.length / itemsPerPage)
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
                  Add a New Vehicle
                </h4>
                <p className="text-center">
                  Are you sure you want to add a vehicle?
                </p>
                <div className="flex justify-end absolute bottom-4 right-4 gap-2">
                  <Button
                    text="Cancel"
                    className="!bg-transparent border-[null] font-semibold !text-[#000] !py-[6px] !px-4"
                    onClick={() => setAddPop(false)}
                  />
                  <Button
                    text="Add Vehicle"
                    className=" rounded-md !py-[6px] !px-4"
                    onClick={() => router.push("/onboarding/create-vehicle")}
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
                  className="!bg-transparent *: border-[null] font-semibold !text-[#000] !py-[6px] !px-4"
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
                  id="vehicleDocumentFile"
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
                  <a className="font-semibold me-2" href="/vehicle.csv" download>
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
export default VehiDetails;
const vehicleDetailsHeading = [
  {
    heading: "Rego number",
  },
  {
    heading: "Vehicle type",
  },
  {
    heading: "Category",
  },
  {
    heading: "Expiry date",
  },
  {
    heading: "Rego Doc.",
  },
  {
    heading: "Status",
  },
  {
    heading: "Complaints",
  },
  {
    heading: "Action",
  },
];
const vehicleDetailsCollection = [
  {
    regoNumber: "xb656k",
    type: "Prime Mover",
    category: "Sleeper cab",
    expiry: "20/12/2023",
    regoDoc: "view",
    status: "status",
    complaints: "No",
  },
  {
    regoNumber: "xw30cp",
    type: "Prime Mover",
    category: "Sleeper cab",
    expiry: "20/12/2023",
    regoDoc: "view",
    status: "status",
    complaints: "No",
  },
  {
    regoNumber: "xb656k",
    type: "Prime Mover",
    category: "Sleeper cab",
    expiry: "20/12/2023",
    regoDoc: "view",
    status: "status",
    complaints: "No",
  },
  {
    regoNumber: "xb656k",
    type: "Prime Mover",
    category: "Sleeper cab",
    expiry: "20/12/2023",
    regoDoc: "view",
    status: "status",
    complaints: "No",
  },
  {
    regoNumber: "xb656k",
    type: "Prime Mover",
    category: "Sleeper cab",
    expiry: "20/12/2023",
    regoDoc: "view",
    status: "status",
    complaints: "No",
  },
  {
    regoNumber: "xb656k",
    type: "Prime Mover",
    category: "Sleeper cab",
    expiry: "20/12/2023",
    regoDoc: "view",
    status: "status",
    complaints: "No",
  },
  {
    regoNumber: "xb656k",
    type: "Prime Mover",
    category: "Sleeper cab",
    expiry: "20/12/2023",
    regoDoc: "view",
    status: "status",
    complaints: "No",
  },
];
