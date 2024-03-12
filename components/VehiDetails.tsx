import Image from "next/image";
import Button from "./Button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Maininputfield from "./Maininputfield";
import MobileInput from "./mobile-input/MobileInput";
import FileUpload from "./FileUpload";
import { getCookie } from "cookies-next";
import { deleteVehicle, getAllVehicle } from "@/network-request/vehicle/vehicleApi";

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

  const getVehicles = async () => {
    const data = await getAllVehicle(token || "");
    if (data) {
      setvehicleList(data.data);
    }
  };

  useEffect(() => {
    getVehicles();
  }, []);
  console.log("vehicleList", { vehicleList });

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

  return (
    <>
      <div className="mr-4">
        <h2 className="bg-white w-full p-4 rounded-md font-bold">
          Vehicle Details
        </h2>
        <div>
          <div className="mt-4 mb-20 bg-white p-4 rounded-md items-center ">
            <div className="flex items-center justify-between">
              <h3 className="leading-loose font-semibold">
                Existing Vehicle List
              </h3>
              <div className="flex gap-2 relative">
                <Button
                  text="Bulk Upload"
                  className="bg-accent3 rounded-xl px-4 border border-[#6599FF] tracking-wide"
                  onClick={() => setBulkUpload(true)}
                />
                <Button
                  text="Choose Action"
                  className="rounded-xl px-4"
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
              <div className="grid text-center grid-cols-[12%_16%_12%_12%_12%_12%_12%_12%] p-4 border">
                {vehicleList?.map((item: any, index: number) => {
                  console.log({ item });
                  return (
                    <>
                      <div
                        key={index}
                        className="mb-4"
                        style={{ color: "#000" }}
                      >
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
                  );
                })}
              </div>
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
            <div className="flex justify-between pt-4 bg-white  p-4">
              <div>Showing 1 to 7 of 56 entries</div>
              <div className="bg-[#CED7DB] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
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
                    className="!bg-transparent border !text-[#000] !py-[6px] !px-4"
                    onClick={() => setAddPop(false)}
                  />
                  <Button
                    text="Add Vehicle"
                    className=" !py-[6px] !px-4"
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
              <div className="grid gap-2 justify-center">
                <div>
                  <MobileInput />
                </div>
                <div className="text-center">or</div>
                <div>
                  <Maininputfield
                    label="Email"
                    labelClass="text-sm mb-1 font-semibold"
                    value="sanket.r.salve@gmail.com"
                    className="!font-bold"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <Button
                  text="Cancel"
                  className="!bg-transparent border !text-[#000] !py-[6px] !px-4"
                  onClick={() => setLink(false)}
                />
                <Button
                  text="Send Link"
                  className=" !py-[6px] !px-4"
                  onClick={() => router.push("/onboarding/create-vehicle")}
                />
              </div>
            </div>
          </div>
        )}
        {bulkUpload === true && (
          <div className="w-screen h-screen  fixed top-0 left-0 backdrop-blur-md flex">
            <div className="w-[450px] h-fit p-4 bg-white m-auto rounded-xl relative border relative">
              <div
                className="bg-blueGrey-50 rounded-full absolute right-4 top-2 flex justify-center items-center w-[35px] h-[35px] text-2xl rotate-45 cursor-pointer font-semibold"
                onClick={() => setBulkUpload(false)}
              >
                +
              </div>
              <h4 className="text-center font-bold p-4">
                Streamline Your Fleet
              </h4>
              <p className="mb-4 text-center">
                Upload your list in bulk for a seamless and time-saving
                experience.
              </p>
              <div className="grid gap-2 justify-center">
                <FileUpload
                  file="Upload Vehicle Document"
                  className="font-semibold"
                />
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <Button
                  text="Download Template"
                  className="!bg-transparent border !text-[#000] !py-[6px] !px-4"
                // onClick={() => setLink(false)}
                />
                <Button
                  text="Upload"
                  className=" !py-[6px] !px-4"
                  onClick={() => router.push("/onboarding/create-vehicle")}
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
