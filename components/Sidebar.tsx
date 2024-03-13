import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  // const [state, setState] = useState(false);
  const [sidebarValue, setSidebarValue] = useState("");

  const toggleSidebar = (value: any) => {
    // setState(!state);
    // setSidebarValue(value);
    sidebarValue === "" ? setSidebarValue(value) : setSidebarValue("");
  };

  const [submenu, setSubmenu] = useState("");
  const toggleSubmenu = (option: any) => {
    option === "Vehicle" ? router.push("/onboarding/vehicle-list") : "";
    option === "Driver" ? router.push("/onboarding/driver-list") : "";
    option === "Customer" ? router.push("/onboarding/customer-list") : "";
    option === "Supplier" ? router.push("/onboarding/supplier-list") : "";
    option === "User" ? router.push("/onboarding/user-list") : "";
    option === "Onboarding" ? router.push("/onboarding") : "";
    option === "Dashboard" ? router.push("/dashboard") : "";
    setSubmenu(option);
  };
  return (
    <>
      <div className="text-black flex relative  top-0">
        <nav className="fixed top-0 text-black bg-white p-4 w-[300px] h-screen overflow-y-auto custom-scrollbar">
          <Image
            src="/black-bull-logo.svg"
            alt="logo"
            width={150}
            height={100}
            className="m-auto"
          />
          <div className="!bg-[#F8F8F8] px-[11px] py-1 mt-2  ">
            <ul className="list-none px-3    mx-1  bg-white mb-4 mt-4 max-h-[calc(100% - 170px)] overflow-y-auto">
              {sidebarCollection.map((value, index) => {
                return (
                  <>
                    <li
                      className={`flex items-center justify-between h-14 
                    ${sidebarValue === value.value ? "text-primary" : ""}
                    `}
                      key={index}
                      onClick={() => toggleSidebar(value.value)}
                    >
                      <div className="flex ms-2 justify-between items-center w-full gap-2 cursor-pointer">
                        <div className="flex items-center gap-2">
                          {sidebarValue === value.value ? (
                            <div className="flex justify-end rounded-full ms-[-1.1em] bg-gradient-opacity w-[38px] h-[38px]">
                              <Image
                                src={value.imgUrl}
                                alt={value.imageDesc}
                                width={20}
                                height={20}
                                className=" "
                              />
                            </div>
                          ) : (
                            <Image
                              src={value.imgUrl}
                              alt={value.imageDesc}
                              width={20}
                              height={20}
                              className=""
                            />
                          )}

                          <div className="font-semibold text-md">
                            {value.value}
                          </div>
                        </div>
                        {value?.dropdownIcon ? (
                          <Image
                            src={value.dropdownIcon}
                            alt={value.imageDesc}
                            width={20}
                            height={20}
                            className={
                              sidebarValue === value.value ? "rotate-180" : ""
                            }
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </li>

                    {sidebarValue === "Onboarding" && (
                      <div className="pl-6 font-semibold">
                        {value.submenu?.map((items, ind) => {
                          return (
                            <>
                              <div
                                className={`mb-2 cursor-pointer ${
                                  submenu === items.option ? "text-primary" : ""
                                }`}
                                onClick={() => toggleSubmenu(items.option)}
                                key={index}
                              >
                                {items.option}
                              </div>
                            </>
                          );
                        })}
                      </div>
                    )}
                  </>
                );
              })}
            </ul>
          </div>
          <div>
            <Image
              src="/unlockFeatures.svg"
              alt="logo"
              width={150}
              height={100}
              className="m-auto mt-5"
            />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
const sidebarCollection = [
  {
    imgUrl: "/dashboard.svg",
    imageDesc: "dashboard",
    value: "Dashboard",
  },
  {
    imgUrl: "/calendar.svg",
    imageDesc: "calender",

    value: "Bookings",
    dropdownIcon: "/dropdown.svg",
  },
  {
    imgUrl: "/briefcase.svg",
    imageDesc: "briefcase",

    value: "Operations",
    dropdownIcon: "/dropdown.svg",
  },
  {
    imgUrl: "/truck.svg",
    imageDesc: "truck",

    value: "Dispatch",
    dropdownIcon: "/dropdown.svg",
  },
  {
    imgUrl: "/bank.svg",
    imageDesc: "bank",

    value: "Accounts",
    dropdownIcon: "/dropdown.svg",
  },
  {
    imgUrl: "/note.svg",
    imageDesc: "note",

    value: "Compliances",
  },
  {
    imgUrl: "/profile.svg",
    imageDesc: "profile",

    value: "User Management",
    dropdownIcon: "/dropdown.svg",
  },
  {
    imgUrl: "/personalcard.svg",
    imageDesc: "personalCard",

    value: "Onboarding",
    dropdownIcon: "/dropdown.svg",
    submenu: [
      {
        option: "Vehicle",
      },
      {
        option: "Driver",
      },
      {
        option: "Customer",
      },
      {
        option: "Supplier",
      },
      {
        option: "User",
      },
    ],
  },
  {
    imgUrl: "/message-question.svg",
    imageDesc: "Help",

    value: "Help",
  },
  {
    imgUrl: "/setting.svg",
    imageDesc: "settings",

    value: "Settings",
  },
];
