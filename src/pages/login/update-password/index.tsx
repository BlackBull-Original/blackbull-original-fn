import Image from "next/image";
import InputField from "../../../../components/InputField";
import Button from "../../../../components/Button";
import React from "react";

const UpdatePassword = () => {
  const [visibel, SetVisible] = React.useState(false);

  return (
    <>
      <div>
        <div className=" pt-6 pl-8 absolute">
          <Image src="/black-bull-logo.svg" alt="logo" width={130} height={50} />
        </div>
        <div className="grid grid-cols-2 items-center">
          <form>
            <div className="max-w-[440px] ml-auto mr-auto text-center pt-10">
              <h1 className="font-bold text-3xl tracking-wide">
                Update your password
              </h1>
              <p className="mt-2">
                You need to reset your temporary password as this is your
                first-time sign-in.
              </p>
              <div className="flex flex-col mt-11">
                <InputField
                  type={"password"}
                  name={"password"}
                  placeholder={"New Password"}
                  value={""}
                  className={"bg-[#F1F5F9]"}
                  onChange={function (e: any): void {
                    throw new Error("Function not implemented.");
                  }}
                  id={"password"}
                  alt={"password"}
                  src={"/lock.svg"}
                  svgWidth={18}
                  svgHeight={18}
                />
                <InputField
                  type={"password"}
                  name={"ConfirmPass"}
                  placeholder={"Confirm Password"}
                  value={""}
                  className={"bg-[#F1F5F9]"}
                  onChange={function (e: any): void {
                    throw new Error("Function not implemented.");
                  }}
                  id={"ConfirmPass"}
                  alt={"password"}
                  src={"/lock.svg"}
                  svgWidth={18}
                  svgHeight={18}
                />
              </div>

              <div className="mt-6 mb-4">
                <Button
                  //   visible={isValidVisibility}
                  text="Login"
                  className="!rounded-[30px] justify-center"
                />
              </div>
            </div>
          </form>
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
    </>
  );
};
export default UpdatePassword;
