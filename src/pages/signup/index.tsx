import React, { useState } from "react";
import InputField from "../../../components/InputField";
import Image from "next/image";
import Button from "../../../components/Button";
import { useRouter } from "next/router";
import { createUser } from "@/network-request/api";
import toast, { Toaster } from "react-hot-toast";

const correctStateName = (stateName: string): string => {
  const nameMapping: { [key: string]: string } = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    number: "Number",
    designation: "Designation",
    companyName: "Company Name",
    profEmail: "Email",
    address: "Address",
    password: "Password",
  };

  return nameMapping[stateName] || stateName;
};

const SignUp = () => {
  const router = useRouter();
  const [state, setState] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    designation: "",
    companyName: "",
    profEmail: "",
    address: "",
    password: "",
  });

  const [error, setError] = useState<any>({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    numberError: "",
    designationError: "",
    companyNameError: "",
    profEmailError: "",
    addressError: "",
    passwordError: "",
  });

  const regexOfPhoneNumber = /^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$/;

  const regexOfEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.+([a-zA-Z0-9-]+)2*$/;

  const checkValidation = () => {
    const newErrors = { ...error };
    let hasErrors = false;
    Object.keys(state).forEach((key) => {
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
        if (!state[key]) {
          newErrors[key + "Error"] = `${correctStateName(key)} is required`;
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

  const handleSubmit = () => {
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
    } else {
      onSignup(state);
    }
  };

  const onSignup = React.useCallback(async (values: any) => {
    try {
      const response = await createUser(values);
      const result = response?.data;
      console.log({ result });
      if (result) {
        toast("Congratulations! You have successfully signed up.", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setTimeout(() => {
          router.push("/redirect");
        }, 3000);
      }
    } catch (error: any) {
      console.log({ error });
    }
  }, []);

  const [visibel, SetVisible] = React.useState(false);
  return (
    <React.Fragment>
      <div>
        <div className=" pt-4 pl-6 absolute">
          <Image src="/black-bull-logo.svg" alt="logo" width={150} height={150} />
        </div>
        <div>
          <Toaster />
        </div>
        <div className="grid grid-cols-2 items-center">
          <div>
            <div className="max-w-[440px] ml-auto mr-auto text-center pt-10">
              <h1 className="font-bold text-3xl tracking-wide text-black">
                Join the Journey
              </h1>
              <p className="mt-2 text-black">
                Your route to hassle-free logistics begins here.
              </p>
              <div className="flex flex-col mt-11">
                <div className="flex gap-2 items-center">
                  <Image
                    src={"/image.svg"}
                    alt="userIcon"
                    width={16}
                    height={16}
                  />
                  <h1 className="text-left font-semibold text-black">
                    Personal Information
                  </h1>
                </div>
                <div className="grid grid-cols-2 gap">
                  <InputField
                    type="text"
                    placeholder="First Name"
                    className="bg-cool-gray pl-0 text-black"
                    name={"firstName"}
                    id={"firstName"}
                    value={state?.firstName}
                    onChange={(e: any) => {
                      setState({
                        ...state,
                        firstName: e.target.value,
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          firstNameError: "",
                        });
                      }
                    }}
                    alt={""}
                    src={""}
                    svgWidth={0}
                    svgHeight={0}
                    errorMessage={error.firstNameError}
                  />
                  <InputField
                    type="text"
                    placeholder="Last Name"
                    className="bg-cool-gray pl-0 text-black"
                    name={"lastName"}
                    id={"lastName"}
                    value={state?.lastName}
                    onChange={(e: any) => {
                      setState({
                        ...state,
                        lastName: e.target.value,
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          lastNameError: "",
                        });
                      }
                    }}
                    alt={""}
                    src={""}
                    svgWidth={0}
                    svgHeight={0}
                    errorMessage={error.lastNameError}
                  />
                </div>

                <InputField
                  type="text"
                  placeholder="Email"
                  className="bg-cool-gray pl-0 text-black"
                  name={"email"}
                  id={"email"}
                  src=""
                  alt=""
                  svgWidth={0}
                  svgHeight={0}
                  value={state?.email}
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
                    setState({
                      ...state,
                      email: e.target.value,
                    });
                  }}
                  errorMessage={error.emailError}
                />
                <InputField
                  type={"number"}
                  placeholder="Contact Number"
                  className="bg-cool-gray pl-0 text-black"
                  name={"number"}
                  id={"number"}
                  src=""
                  alt=""
                  svgWidth={0}
                  svgHeight={0}
                  value={state?.number}
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
                    setState({
                      ...state,
                      number: e.target.value,
                    });
                  }}
                  errorMessage={error.numberError}
                />
              </div>
              <div className="flex flex-col mt-2">
                <div className="flex gap-2 items-center">
                  <Image
                    src={"/image.svg"}
                    alt="userIcon"
                    width={16}
                    height={16}
                  />
                  <h1 className="text-left font-semibold text-black">
                    Personal Information
                  </h1>
                </div>
                <div className="grid grid-cols-2 gap">
                  <InputField
                    type="text"
                    placeholder="Designation"
                    className="bg-cool-gray pl-0 text-black"
                    name={"designation"}
                    id={"designation"}
                    //
                    value={state?.designation}
                    onChange={(e: any) => {
                      setState({
                        ...state,
                        designation: e.target.value,
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          designationError: "",
                        });
                      }
                    }}
                    alt={""}
                    src={""}
                    svgWidth={0}
                    svgHeight={0}
                    errorMessage={error.designationError}
                  />
                  <InputField
                    type="text"
                    placeholder="Company Name"
                    className="bg-cool-gray pl-0 text-black"
                    name={"companyName"}
                    id={"companyName"}
                    //
                    value={state?.companyName}
                    onChange={(e: any) => {
                      setState({
                        ...state,
                        companyName: e.target.value,
                      });
                      if (e.target.value.length > 0) {
                        setError({
                          ...error,
                          companyNameError: "",
                        });
                      }
                    }}
                    alt={""}
                    src={""}
                    svgWidth={0}
                    svgHeight={0}
                    errorMessage={error.companyNameError}
                  />
                </div>

                <InputField
                  type="text"
                  placeholder="Email"
                  className="bg-cool-gray pl-0 text-black"
                  name={"profEmail"}
                  id={"profEmail"}
                  src=""
                  alt=""
                  svgWidth={0}
                  svgHeight={0}
                  value={state?.profEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;
                    if (!regexOfEmail.test(inputValue)) {
                      setError({
                        ...error,
                        profEmailError: "Please enter a valid email address",
                      });
                    } else {
                      setError({
                        ...error,
                        profEmailError: "", // Clear the error when the input is valid
                      });
                    }
                    setState({
                      ...state,
                      profEmail: e.target.value,
                    });
                  }}
                  errorMessage={error.profEmailError}
                />
                <InputField
                  type={"text"}
                  placeholder="Address"
                  className="bg-cool-gray pl-0 text-black"
                  name={"address"}
                  id={"address"}
                  src=""
                  alt=""
                  svgWidth={0}
                  svgHeight={0}
                  value={state?.address}
                  onChange={(e: any) => {
                    setState({
                      ...state,
                      address: e.target.value,
                    });
                    if (e.target.value.length > 0) {
                      setError({
                        ...error,
                        addressError: "",
                      });
                    }
                  }}
                  errorMessage={error.addressError}
                />
              </div>
              <InputField
                type={visibel ? "text" : "password"}
                placeholder="password"
                className="bg-cool-gray text-black"
                value={state?.password}
                onChange={(e: any) => {
                  setState({
                    ...state,
                    password: e.target.value,
                  });
                  if (e.target.value.length > 0) {
                    setError({
                      ...error,
                      passwordError: "",
                    });
                  }
                }}
                name={"password"}
                id={""}
                src="/lock.svg"
                alt="lock"
                svgWidth={16}
                svgHeight={16}
                onClick={() => SetVisible(!visibel)}
                isvisibel={visibel}
                errorMessage={error.passwordError}
              />

              <div className="mt-8 mb-4">
                <Button
                  text="Get Started"
                  onClick={handleSubmit}
                  className="flex justify-center !rounded-full text-white mt-4"
                />
              </div>
              <div>
                <span className="text-[#737373] text-sm mt-10 font-medium cursor-pointer ">
                  Already have an account?
                  <b
                    className="text-black font-medium text-primary"
                    onClick={() => router.push("/login")}
                  >
                    {" "}
                    Login
                  </b>
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/Background.png"
              alt="logo"
              width={500}
              height={700}
              className="w-[80%] h-screen"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SignUp;
