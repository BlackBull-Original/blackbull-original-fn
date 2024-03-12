import Image from "next/image";
import Button from "./Button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deleteDriver, getAllDrives } from "@/network-request/driver/driverApi";
import { getCookie } from "cookies-next";
import { deleteUser, getAllUser } from "@/network-request/user/createUser";
import CommonUI from "@/pages/onboarding/utility/CommonUI";

const UserDetails = () => {
  const [deletePopUp, setDelete] = useState(false);
  const router = useRouter();
  const token = getCookie("token");
  const [userToDelete, setUserToDelete] = useState("");

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const data = await getAllUser(token || "");
    if (data) {
      setUsers(data.data);
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

  console.log("Users :", users);

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  return (
    <>
      <div className="mr-4">
        <h2 className="bg-white w-full p-4 rounded-md font-bold">
          User Details
        </h2>
        <div>
          <div className="mt-4 mb-20 bg-white p-4 rounded-md items-center ">
            <div className="flex items-center justify-between">
              <h3 className="leading-loose font-semibold">
                Existing User List
              </h3>
              <div className="flex gap-2 relative">
                <Button
                  text="Add User"
                  className="px-4 rounded-xl"
                  onClick={() => router.push("/onboarding/user")}
                />
              </div>
            </div>
            <div>
              <div className="grid text-center grid-cols-[15%_15%_15%_15%_15%_15%_10%] bg-[#EFF2F3] p-4 rounded-md mt-4">
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
              <div className="grid items-center text-center grid-cols-[15%_15%_15%_15%_15%_15%_10%] p-4 border justify-center">
                {users?.map((item: any, ind: number) => {
                  return (
                    <React.Fragment key={item?._id}>
                      <p className="mb-4">{item?.firstName}</p>
                      <p className="mb-4">{item?.username}</p>
                      <p className="mb-4">{item?.role}</p>
                      <p className="mb-4">{item?.lastLogin || getCurrentDate()}</p>
                      <p className="mb-4">{item?.primaryGroup || "Entire Fleet"}</p>
                      <p className="mb-4">
                        <CommonUI status="Active" />
                      </p>
                      <div className="flex justify-center gap-2 mb-4">
                        {/* <Image
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
                        /> */}
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
                      </div>
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
export default UserDetails;
const driverDetailsHeading = [
  {
    heading: "FULL NAME",
  },
  {
    heading: "USERNAME",
  },
  {
    heading: "ROLE",
  },
  {
    heading: "LAST LOGIN",
  },
  {
    heading: "PRIMARY GROUP",
  },
  {
    heading: "STATUS",
  },
  {
    heading: "ACTION",
  },
];
const userDetailsData = [
  {
    fullName: "Mohd Kaif",
    username: "Kaif",
    role: "Admin",
    lastLogin: "20/02/2024",
    primaryGroup: "Entire Fleet",
    status: "Active",
  },
  {
    fullName: "Mohd Shadab",
    username: "Shadab",
    role: "Admin",
    lastLogin: "20/02/2024",
    primaryGroup: "Entire Fleet",
    status: "Active",
  },
  {
    fullName: "Mohd Sheeban",
    username: "Sheeban",
    role: "Admin",
    lastLogin: "20/02/2024",
    primaryGroup: "Entire Fleet",
    status: "Active",
  },
];
