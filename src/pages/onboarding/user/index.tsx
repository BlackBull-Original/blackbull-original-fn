import Image from "next/image";
import Progressbar from "../../../../components/Progressbar";
import Maininputfield from "../../../../components/Maininputfield";
import DropDownMap from "../../../../components/DropDownMap";
import React, { useEffect, useRef, useState } from "react";
import Checkbox from "../../../../components/Checkbox";
import PasswordField from "../../../../components/password-field/PasswordFlied";
import Button from "../../../../components/Button";
import { createUser } from "@/network-request/user/createUser";
import { getCookie } from "cookies-next";
// import { correctUserStateName } from "../utility/utilityMethod";
import { uploadOnboardingPorfile } from "@/network-request/onboarding-user";
// import { regexOfEmail, regexOfPhoneNumber } from "../utility/commonRegex";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
// import { regexOfEmail, regexOfPhoneNumber } from "@/utils";

const correctUserStateName = (stateName: string): string => {
  const nameMapping: { [key: string]: string } = {
    firstName: "First Name",
    lastName: "Last Name",
    displayName: "Display Name",
    email: "Email",
    number: "Number",
    username: "Username",
    domains: "Domains",
    employeeId: "Employee Id",
    accessLevel: "Access Level",
    designation: "Designation",
    role: "Role",
    password: "Password",
    confirmPassword: "Confirm Password",
  };

  return nameMapping[stateName] || stateName;
};
const User = () => {
  const [selectedData, setSelectedData] = useState("");
  const token = getCookie("token");
  const router = useRouter();
  const [error, setError] = useState<any>({
    firstNameError: "",
    lastNameError: "",
    displayNameError: "",
    emailError: "",
    numberError: "",
    usernameError: "",
    domainsError: "",
    employeeIdError: "",
    accessLevelError: "",
    designationError: "",
    roleError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const checkValidation = () => {
    const newErrors = { ...error };
    let hasErrors = false;
    Object.keys(user).forEach((key) => {
      // Handle non-nested fields
      // Auto scroll up for better user experience
      window.scrollTo({
        top: 0,
        behavior: "smooth", // for smooth scrolling
      });

      if (
        key !== "requirePassword" &&
        key !== "sendPassword" &&
        key !== "temporaryPassword" &&
        key !== "avatar"
      ) {
        if (!user[key]) {
          newErrors[key + "Error"] = `${correctUserStateName(key)} is required`;
          hasErrors = true;
        } else {
          newErrors[key + "Error"] = "";
        }
      }
    });
    setError(newErrors);
    // Return the error status
    return hasErrors;
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = React.useState("");
  const [selectedProfile, setSelectedProfile] = React.useState("");

  const handleUploadClick: any = () => {
    if (fileInputRef.current) {
      fileInputRef?.current?.click();
    }
  };

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

  console.log({ selectedProfile });
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState<any>({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    number: "",
    username: "",
    domains: "",
    avatar: "",
    employeeId: "",
    accessLevel: "",
    designation: "",
    role: "",
    temporaryPassword: false,
    password: "",
    confirmPassword: "",
    requirePassword: false,
    sendPassword: false,
  });

  console.log({ user });

  useEffect(() => {
    // Calculate the progress based on the filled form inputs
    const calculateProgress = () => {
      const {
        avatar,
        temporaryPassword,
        requirePassword,
        sendPassword,
        ...rest
      } = user;

      // Count filled inputs (excluding the 'documents' array)
      const filledInputs = Object.values(rest).filter(
        (value) => value !== ""
      ).length;

      // Count total inputs (excluding the 'documents' array)
      const totalInputs = Object.keys(rest).length;
      const newProgress = (filledInputs / totalInputs) * 100;
      setProgress(Math.ceil(newProgress));
    };

    calculateProgress();
  }, [user]);

  const createUserHandler = async () => {
    // Check validation and get error status
    const hasErrors = checkValidation();
    console.log("Errors", error);
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
    const [profileUrl] = await Promise.all([
      Promise.all(
        Object.values(selectedProfile)?.map((imageInfo) =>
          uploadOnboardingPorfile(imageInfo)
        )
      ),
    ]);
    console.log({ profileUrl });

    const customPayload = {
      ...user,
      avatar: profileUrl[0]?.response,
    };
    console.log({ customPayload });

    const response: any = await createUser(customPayload, token || "");
    console.log("FINAL RESPONSE", { response });
    if (response?.status === 200) {
      toast("User has been created successfully", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setTimeout(() => {
        router.push("/onboarding/user-list");
      }, 3000);
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

  function generateTemporaryPassword() {
    const length = 6;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?/{}";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }

    return password;
  }

  const regexOfPhoneNumber = /^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$/;
  const regexOfEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.+([a-zA-Z0-9-]+)2*$/;
  const regexOfWebsite = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

  return (
    <>
      <div className="flex bg-[#F8F8F8]">
        <div>
          <Toaster />
        </div>
        <div className="ml-[316px] w-full mt-4">
          <div className="bg-white mr-4 flex justify-between items-center rounded-md">
            <h2 className=" w-full p-4 rounded-md font-bold text-black">
              Create User
            </h2>
            <div className="h-8 w-8 flex justify-center cursor-pointer text-2xl items-center bg-blueGrey-100 rounded-full mr-4">
              <span className="mt-[-2px] ml-[2px] text-[#292D32] rotate-45">
                +
              </span>
            </div>
          </div>
          <div className="bg-white mr-4 px-4 rounded-md mt-4 p-4 mb-20">
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
            <div className="mt-4">
              <h2 className="font-semibold mb-4 text-black">
                Personal Information
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <Maininputfield
                  label="First Name"
                  value={user.firstName}
                  className="w-full"
                  onChange={(e: any) => {
                    setUser({
                      ...user,
                      firstName: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        firstNameError: "",
                      });
                    }
                  }}
                  errorMessage={error.firstNameError}
                />
                <Maininputfield
                  label="Last Name"
                  value={user.lastName}
                  className="w-full"
                  onChange={(e: any) => {
                    setUser({
                      ...user,
                      lastName: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        lastNameError: "",
                      });
                    }
                  }}
                  errorMessage={error.lastNameError}
                />
                <Maininputfield
                  label="Display Name"
                  value={user.displayName}
                  className="w-full"
                  onChange={(e: any) => {
                    setUser({
                      ...user,
                      displayName: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        displayNameError: "",
                      });
                    }
                  }}
                  errorMessage={error.displayNameError}
                />
                <Maininputfield
                  label="Email Address"
                  value={user.email}
                  className="w-full"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    if (!regexOfEmail.test(inputValue)) {
                      setError({
                        ...error,
                        emailError: "Please enter a valid email address",
                      });
                    } else {
                      setError({
                        ...error,
                        emailError: "", // Clear the error when the input is valid
                      });
                    }
                    setUser({
                      ...user,
                      email: inputValue,
                    });
                  }}
                  errorMessage={error.emailError}
                />
                <Maininputfield
                  label="Contact Number"
                  value={user.number}
                  className="w-full"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    if (!regexOfPhoneNumber.test(inputValue)) {
                      setError({
                        ...error,
                        numberError: "Please enter a valid phone number",
                      });
                    } else {
                      setError({
                        ...error,
                        numberError: "", // Clear the error when the input is valid
                      });
                    }
                    setUser({
                      ...user,
                      number: inputValue,
                    });
                  }}
                  errorMessage={error.numberError}
                />
              </div>
              <div className="grid mt-4 grid-cols-3 gap-4 ">
                <div className="relative">
                  <Maininputfield
                    label="Username"
                    value={user.username}
                    className="w-full"
                    onChange={(e: any) => {
                      setUser({
                        ...user,
                        username: e.target.value,
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          usernameError: "",
                        });
                      }
                    }}
                    errorMessage={error.usernameError}
                  />
                </div>
                <div>
                  <DropDownMap
                    label="Domains"
                    mapOption={domainsCollection}
                    selectedData={selectedData}
                    setSelectedData={selectedData}
                    value={user.domains}
                    onChange={(e: any) => {
                      setUser({
                        ...user,
                        domains: e.target.value,
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          domainsError: "",
                        });
                      }
                    }}
                    errorMessage={error.domainsError}
                  />
                  {user?.domains === "Other" && (
                    <div className="mt-3">
                      <Maininputfield label="Other" className="w-full" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="font-semibold mb-4 text-black">
                Professional Information
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <Maininputfield
                  label="Employee ID"
                  value={user.employeeId}
                  className="w-full"
                  onChange={(e: any) => {
                    setUser({
                      ...user,
                      employeeId: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        employeeIdError: "",
                      });
                    }
                  }}
                  errorMessage={error.employeeIdError}
                />
                <Maininputfield
                  label="Access Level"
                  value={user.accessLevel}
                  className="w-full"
                  onChange={(e: any) => {
                    setUser({
                      ...user,
                      accessLevel: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        accessLevelError: "",
                      });
                    }
                  }}
                  errorMessage={error.accessLevelError}
                />
                <Maininputfield
                  label="Designation"
                  value={user.designation}
                  className="w-full"
                  onChange={(e: any) => {
                    setUser({
                      ...user,
                      designation: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        designationError: "",
                      });
                    }
                  }}
                  errorMessage={error.designationError}
                />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="font-semibold mb-4 text-black">User Role</h2>
              <div>
                <div className="grid grid-cols-3 gap-4">
                  <DropDownMap
                    label="Role Selected"
                    mapOption={roleCollection}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    value={user.role}
                    onChange={(e: any) => {
                      setUser({
                        ...user,
                        role: e.target.value,
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          roleError: "",
                        });
                      }
                    }}
                    errorMessage={error.roleError}
                  />
                </div>
                {user?.role === "Other" && (
                  <div className="mt-3 grid grid-cols-3 gap-4">
                    <Maininputfield label="Other" className="w-full" />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-8">
              <Checkbox
                content="Auto create a temporary password"
                checked={user.temporaryPassword}
                className="w-full"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const isChecked = e.target.checked;

                  setUser((prevUser: any) => {
                    let newPassword = isChecked
                      ? generateTemporaryPassword()
                      : "";

                    return {
                      ...prevUser,
                      temporaryPassword: isChecked,
                      password: newPassword,
                      confirmPassword: newPassword,
                    };
                  });
                }}
              />
            </div>
            <div className="mt-4">
              <PasswordField
                state={user}
                setState={setUser}
                confirmPassword={true}
                error={error}
                setError={setError}
                errorMessageOfPassword={error.passwordError}
                errorMessageOfConfirm={error.confirmPasswordError}
              />
            </div>
            <div className="mt-4 grid gap-2">
              <Checkbox
                content="Require a password change for this user upon their initial login"
                checked={user.requirePassword}
                className="w-full"
                onChange={(e: any) => {
                  setUser({
                    ...user,
                    requirePassword: e.target.checked,
                  });
                }}
              />
              <Checkbox
                content="Send a password in email upon completion"
                checked={user.sendPassword}
                className="w-full"
                onChange={(e: any) => {
                  setUser({
                    ...user,
                    sendPassword: e.target.checked,
                  });
                }}
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                text="Cancel"
                className="!bg-transparent !text-black border border-[#e5e5e5] px-6"
              />
              <Button
                onClick={createUserHandler}
                text="Create"
                className="px-6"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default User;
const domainsCollection = [
  {
    value: "blackbulltrans.com.au",
  },
  {
    value: "domain1",
  },
  {
    value: "domain2",
  },
  {
    value: "Other",
  },
];
const roleCollection = [
  {
    value: "Global Administrator",
  },
  {
    value: "Account Administrator",
  },
  {
    value: "Operations Administrator",
  },
  { value: "Booking Administrator" },
  {
    value: "Dispatch Administrator",
  },
  {
    value: "User Administrator",
  },
  {
    value: "Compliance Administrator",
  },
  {
    value: "Supplier Administrator",
  },
  {
    value: "Customer Administrator",
  },
  {
    value: "Custom Access",
  },
  {
    value: "Other",
  },
];
