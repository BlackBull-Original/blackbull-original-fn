import Image from "next/image";
import { useState } from "react";

interface passWordField {
  createPassword?: any;
  confirmPassword?: boolean;
  createId?: any;
  confirmId?: any;
  state?: any;
  setState?: any;
  errorMessageOfPassword?: any;
  errorMessageOfConfirm?: any;
  error?: any;
  setError?: any;
}
const PasswordField = ({
  createPassword,
  confirmPassword,
  createId,
  confirmId,
  state,
  setState,
  errorMessageOfPassword,
  errorMessageOfConfirm,
  error,
  setError,
}: passWordField) => {
  const openEye = "/open-eye.svg";
  const closedEye = "/closed-eye.svg";
  const [eyeIcon, setEyeIcon] = useState(openEye);
  const [eyeIconConfirm, setEyeIconConfim] = useState(openEye);

  return (
    <>
      <div className=" grid grid-cols-3 gap-4 pt-[6px] pb-[6px] rounded-md h-fit leading-none">
        <div className="relative">
          <div className="bg-[#EFF2F3] py-2 px-1 rounded-md relative">
            <label className="text-[12px] block pl-[15px] text-[#57727E] leading-none">
              Create Password
            </label>
            <input
              type={eyeIcon === openEye ? "password" : "text"}
              id={createId}
              className="pl-[15px] text-black bg-[#EFF2F3] outline-none w-[300px] placeholder:text-[12px] text-[12px] font-medium leading-none"
              placeholder={"Enter password"}
              value={state.password}
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
            />
            <Image
              src={eyeIcon}
              alt="eye"
              width={24}
              height={24}
              className="absolute right-2 bottom-2 cursor-pointer"
              onClick={() =>
                eyeIcon === openEye
                  ? setEyeIcon(closedEye)
                  : setEyeIcon(openEye)
              }
            />
          </div>
          {errorMessageOfPassword && (
            <div className="text-red-500 text-[12px] mt-1">
              {errorMessageOfPassword}
            </div>
          )}
        </div>

        {confirmPassword && (
          <div className="relative">
            <div className="bg-[#EFF2F3] py-2 px-1 rounded-md relative">
              <label className="text-[12px] block pl-[15px]  text-[#57727E] leading-none">
                Confirm Password
              </label>
              <input
                type={eyeIconConfirm === openEye ? "password" : "text"}
                id={confirmId}
                className="pl-[15px] text-black bg-[#EFF2F3] outline-none w-[300px] placeholder:text-[12px] text-[12px] font-medium leading-none"
                placeholder={"Confirm Password"}
                value={state.confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const confirmValue = e.target.value;
              
                  setState({
                    ...state,
                    confirmPassword: confirmValue,
                  });
              
                  // Check if confirm password matches the password
                  if (confirmValue !== state.password) {
                    setError({
                      ...error,
                      confirmPasswordError: "Passwords do not match",
                    });
                  } else {
                    setError({
                      ...error,
                      confirmPasswordError: "",
                    });
                  }
                }} 
              />
              <Image
                src={eyeIconConfirm}
                alt="eye"
                width={24}
                height={24}
                className="absolute right-2 bottom-2 cursor-pointer"
                onClick={() =>
                  eyeIconConfirm === openEye
                    ? setEyeIconConfim(closedEye)
                    : setEyeIconConfim(openEye)
                }
              />
            </div>
            {errorMessageOfConfirm && (
              <div className="text-red-500 text-[12px] mt-1">
                {errorMessageOfConfirm}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex gap-4 mt-2">
        <div className="flex">
          <Image src={"/green-check.svg"} alt="" width={20} height={20} />
          <span className="text-sm text-coolGrey-500">
            Minimum 6 characters
          </span>
        </div>
        <div className="flex">
          <Image src={"/red-cross.svg"} alt="" width={20} height={20} />
          <span className="text-sm text-coolGrey-500">One number</span>
        </div>
        <div className="flex">
          <Image src={"/red-cross.svg"} alt="" width={20} height={20} />
          <span className="text-sm text-coolGrey-500">
            One uppercase letter
          </span>
        </div>
        <div className="flex">
          <Image src={"/green-check.svg"} alt="" width={20} height={20} />
          <span className="text-sm text-coolGrey-500">
            One special character
          </span>
        </div>
      </div>
    </>
  );
};
export default PasswordField;
