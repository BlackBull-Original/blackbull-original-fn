import Image from "next/image";
import Button from "./Button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { deleteUser, getAllUser } from "@/network-request/user/createUser";
import CommonUI from "@/pages/onboarding/utility/CommonUI";
import { getAllCustomer } from "@/network-request/customer/customerApi";

const CustomerDetails = () => {
  const [deletePopUp, setDelete] = useState(false);
  const router = useRouter();
  const token = getCookie("token");
  const [userToDelete, setUserToDelete] = useState("");

  const [customers, setCustomers] = useState([]);

  const getUsers = async () => {
    const data = await getAllCustomer(token || "");
    if (data) {
      setCustomers(data.data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async () => {
    const response = await deleteUser(token || "", userToDelete);
    if (response) {
      setUserToDelete("");
      setDelete(false);
      getUsers();
    } else {
      setDelete(false);
      setUserToDelete("");
    }
  };

  console.log("customers :", customers);

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  return (
    <>
      <div className="mr-4">
        <div>
          <div className="mt-4 mb-20 bg-white p-4 rounded-md items-center ">
            <div className="flex items-center justify-between">
              <h3 className="leading-loose font-semibold">
                Existing Customer List
              </h3>
              <div className="flex gap-2 relative">
                <button className="text-[#2B36D9] font-semibold mx-2">
                  Bulk Upload
                </button>
                <Button
                  text="Add Customer"
                  className="px-4 rounded-full"
                  onClick={() => router.push("/onboarding/add-customer")}
                />
              </div>
            </div>
            <div>   
              <div className="grid items-center text-center grid-cols-[12%_12%_12%_12%_12%_12%_12%_12%] bg-[#EFF2F3] justify-center p-4 rounded-md mt-4">
                {customerDetailsHeading?.map((value, index) => {
                  return (
                    <>
                      <div className="font-semibold text-sm" key={index}>
                        {value.heading}
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="grid items-center text-center grid-cols-[12%_12%_12%_12%_12%_12%_12%_12%] p-4 border justify-center">
                {customers?.map((item: any, ind: number) => {
                  return (
                    <React.Fragment key={item?._id}>
                      <p className="mb-4">{item?.customerId || "TempID"}</p>
                      <p className="mb-4">{item?.companyName}</p>
                      <p className="mb-4">{item?.tradingName}</p>
                      <p className="mb-4">
                        {item?.abnNumber}
                      </p>
                      <p className="mb-4">
                        {item?.legalName || "Entire Fleet"}
                      </p>
                      <p className="mb-4">
                        {item?.firstName}
                      </p>
                      <p className="mb-4">
                        {item?.lastName}
                      </p>
                      <p className="mb-4">
                        <CommonUI status="Active" />
                      </p>
                      {/* <div className="flex justify-center gap-2 mb-4">
                        <Image
                          src={"/edit.svg"}
                          alt="edit"
                          width={18}
                          height={18}
                          onClick={() => {
                            router.push({
                              pathname: "/onboarding/edit-user",
                              query: { id: item?._id },
                            });
                          }}
                          className="cursor-pointer"
                        />
                        <Image
                          src={"/trash.svg"}
                          alt="edit"
                          width={18}
                          height={18}
                          className="cursor-pointer"
                          onClick={() => {
                            setDelete(true);
                            setUserToDelete(item?._id);
                          }}
                        />
                      </div> */}
                    </React.Fragment>
                  );
                })}
              </div>
              {deletePopUp === true ? (
                <>
                  <div className="w-screen h-screen  fixed top-0 left-0 backdrop-blur-md flex">
                    <div className="w-[440px] h-[120px] bg-white m-auto rounded-xl relative border">
                      <p className="text-center mt-4 mb-2">
                        Are you sure you want to delete this user details?
                      </p>
                      <div className="flex justify-end absolute bottom-4 right-4 gap-2">
                        <Button
                          text="Cancel"
                          className="!bg-transparent border !text-[#000] !py-[4px] !px-[8px]"
                          onClick={() => {
                            setDelete(false);
                            setUserToDelete("");
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
              <div>Showing 1 to 6 of 56 entries</div>
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
      </div>
    </>
  );
};
export default CustomerDetails;
const customerDetailsHeading = [
  {
    heading: "Customer ID",
  },
  {
    heading: "Company Name",
  },
  {
    heading: "Trading Name",
  },
  {
    heading: "ABN",
  },
  {
    heading: "Legal Name",
  },
  {
    heading: "First Name",
  },
  {
    heading: "Last Name",
  },
  {
    heading: "Status",
  },
];
