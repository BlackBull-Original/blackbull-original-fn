import React, { useEffect, useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { logoutUser } from "@/network-request/api";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import jwt from "jsonwebtoken";
const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const { email, firstName, lastName } = user;
  useEffect(() => {
    // Decode the JWT and set the user state
    const token = parseCookies().token;
    if (token) {
      const decodedToken: any = jwt.decode(token);
      console.log("decodedToken", decodedToken?.user);

      setUser({
        ...user,
        firstName: decodedToken?.user?.firstName,
        lastName: decodedToken?.user?.lastName,
        email: decodedToken?.user?.email,
      });
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const logoutHandler = async () => {
    try {
      const response = await logoutUser();
      if (response.success) {
        toast("You have been logged out successfully.", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setTimeout(() => {
          destroyCookie(null, "token");
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      toast("Something went wrong", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      console.log("error", error);
    }
  };

  return (
    <React.Fragment>
      <div>
        <Toaster />
      </div>
      <header className="flex justify-between items-center p-4 bg-white">
        <div className="flex items-center ms-[19em]">
          <p className="text-[24px] weight">
            <span className="text-black">Welcome back,</span>{" "}
            <span className="text-[#2B36D9]">
              {firstName !== "" ? `${firstName}!` : ""}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center justify-between gap-3 bg-[#F1F1F1] px-2 py-2 rounded-full">
            <div className="relative">
              <div className="bg-[#FFFFFF] px-2 py-2 rounded-full">
                <Image
                  src="/notification-bing.svg"
                  alt="notification"
                  width={20}
                  height={16}
                />
              </div>
              <div className="absolute top-0 right-0 bg-[#2B36D9] w-2 h-2 rounded-full"></div>
            </div>

            <div className=" px-2 py-2 rounded-full">
              <Image
                src="/message-question.svg"
                alt="message"
                width={20}
                height={16}
              />
            </div>

            <div className=" px-2 py-2 rounded-full">
              <Image
                src="/warning-2.svg"
                alt="warning"
                width={20}
                height={16}
              />
            </div>
          </div>

          <div className="flex gap relative">
            <div className="flex items-center gap-4">
              <span className="bg-primary9 w-11 h-11 flex justify-center items-center rounded-full text-sm font-bold text-primary">
                {firstName !== "" ? firstName.charAt(0) : ""}
              </span>
              <div className="flex flex-col ">
                <p className="text-black font-bold">
                  {firstName !== "" && lastName !== ""
                    ? `${firstName} ${lastName}`
                    : ""}
                </p>

                <p className="text-[#6E6E91]">{email !== "" ? email : ""}</p>
              </div>
            </div>

            <Image
              className="cursor-pointer ms-1"
              onClick={toggleDropdown}
              src="/arrow-down-new.svg"
              alt="dropdown"
              width={24}
              height={24}
            />
            {isDropdownOpen && (
              <div className="absolute top-full right-0 bg-white border rounded shadow mt-2">
                <button
                  onClick={logoutHandler}
                  className="text-[red] font-semibold py-2 px-4 block w-full text-left hover:bg-gray-100 focus:outline-none"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;

{
  /* <div className="p-4 bg-white flex items-center justify-end gap-6">
          <Image
            src="/notifications.png"
            alt="notification"
            width={20}
            height={16}
          />
          <div className="flex gap relative">
            <span className="bg-primary9 w-8 h-8 flex justify-center items-center rounded-full text-sm font-bold text-primary">
              R
            </span>
            <Image
              className="cursor-pointer"
              onClick={toggleDropdown}
              src="/dropdown.svg"
              alt="dropdown"
              width={18}
              height={14}
            />
            {isDropdownOpen && (
              <div className="absolute top-full right-0 bg-white border rounded shadow mt-2">
                <button
                  onClick={logoutHandler}
                  className="text-[red] font-semibold py-2 px-4 block w-full text-left hover:bg-gray-100 focus:outline-none"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div> */
}
