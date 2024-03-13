import React from "react";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";

const SuperAdminEmail = () => {
  return (
    <React.Fragment>
      <div>
        <div className=" pt-4 pl-6 absolute">
          {/* <Image src="/black-bull-logo.svg" alt="logo" width={150} height={150} /> */}
        </div>
        <div className="grid grid-cols-2 items-center">
          <form>
            <div className="max-w-[440px] ml-auto mr-auto text-center pt-10">
              <h1 className="font-bold text-3xl tracking-wide">
                Join the Journey
              </h1>
              <p className="mt-2">
                Your route to hassle-free logistics begins here.
              </p>
              <div className="flex flex-col mt-11">
                <div className="flex gap-2 items-center">
                  {/* <Image
                    src={"/image.svg"}
                    alt="userIcon"
                    width={16}
                    height={16}
                  /> */}
                  <h1 className="text-left font-semibold">
                    Personal Information
                  </h1>
                </div>
                <div className="grid grid-cols-2 gap">
                  <InputField
                    type="text"
                    placeholder="First Name"
                    className="bg-cool-gray pl-0"
                    name={"firstName"}
                    id={"firstName"}
                    required={"required"}
                    onBlur={()=>{}}
                    value={""}
                    onChange={()=>{}}
                    alt={""}
                    src={""}
                    svgWidth={0}
                    svgHeight={0}
                  />
                  <InputField
                    type="text"
                    placeholder="Last Name"
                    className="bg-cool-gray pl-0"
                    name={"lastName"}
                    id={"lastName"}
                    onBlur={()=>{}}
                    required={"required"}
                    value={""}
                    onChange={()=>{}}
                    alt={""}
                    src={""}
                    svgWidth={0}
                    svgHeight={0}
                  />
                </div>

                <InputField
                  required={"required"}
                  type="text"
                  placeholder="Email"
                  className="bg-cool-gray pl-0"
                  name={"email"}
                  id={"email"}
                  src=""
                  alt=""
                  svgWidth={0}
                  svgHeight={0}
                  onBlur={()=>{}}
                  value={""}
                  onChange={()=>{}}
                />

                <InputField
                  type={"number"}
                  placeholder="Contact Number"
                  className="bg-cool-gray pl-0"
                  name={"number"}
                  id={"number"}
                  src=""
                  alt=""
                  svgWidth={0}
                  // required={"required"}
                  svgHeight={0}
                  value={""}
                  onChange={()=>{}}
                />
              </div>
              <div className="flex flex-col mt-2">
                <div className="flex gap-2 items-center">
                  {/* <Image
                    src={"/image.svg"}
                    alt="userIcon"
                    width={16}
                    height={16}
                  /> */}
                  <h1 className="text-left font-semibold">
                    Personal Information
                  </h1>
                </div>
                <div className="grid grid-cols-2 gap">
                <InputField
                  type={"text"}
                  placeholder="Address"
                  className="bg-cool-gray pl-0"
                  name={"address"}
                  id={"address"}
                  src=""
                  alt=""
                  svgWidth={0}
                  // required={"required"}
                  svgHeight={0}
                  value={''}
                  onChange={()=>{}}
                />
                  <InputField
                  type={"text"}
                  placeholder="Address"
                  className="bg-cool-gray pl-0"
                  name={"address"}
                  id={"address"}
                  src=""
                  alt=""
                  svgWidth={0}
                  // required={"required"}
                  svgHeight={0}
                  value={''}
                  onChange={()=>{}}
                />
                </div>

                <InputField
                  type={"text"}
                  placeholder="Address"
                  className="bg-cool-gray pl-0"
                  name={"address"}
                  id={"address"}
                  src=""
                  alt=""
                  svgWidth={0}
                  // required={"required"}
                  svgHeight={0}
                  value={''}
                  onChange={()=>{}}
                />

                <InputField
                  type={"text"}
                  placeholder="Address"
                  className="bg-cool-gray pl-0"
                  name={"address"}
                  id={"address"}
                  src=""
                  alt=""
                  svgWidth={0}
                  // required={"required"}
                  svgHeight={0}
                  value={''}
                  onChange={()=>{}}
                />
              </div>
              {/* <InputField
                type= "password"
                placeholder="password"
                className="bg-cool-gray "
                onChange={()=>{}}
                required={"required"}
                onBlur={handleBlur}
                value={values?.password}
                hasError={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
                name={"password"}
                id={""}
                src="/lock.svg"
                alt="lock"
                svgWidth={16}
                svgHeight={16}
                onClick={() => SetVisible(!visibel)}
                isvisibel={visibel}
              /> */}

              <div className="mt-8 mb-4">
                <Button
                  text="Get Started"
                  type="submit"
                  className="flex justify-center !rounded-full text-white mt-4"
                />
                {/* <Button
                  // visible={isValidVisibility}
                  type="submit"
                  text="Get Started"
                  className="!rounded-[30px]  justify-center"
                //onClick={() => router.push("/login")}
                /> */}
              </div>
              <div>
                <span className="text-[#737373] text-sm mt-10 font-medium cursor-pointer ">
                  Already have an account?
                  <b
                    className="text-black font-medium text-primary"
                    // onClick={() => router.push("/login")}
                  >
                    {" "}
                    Login
                  </b>
                </span>
              </div>
            </div>
          </form>
          <div className="flex justify-center">
            {/* <Image
              src="/Background.svg"
              alt="logo"
              width={700}
              height={700}
              className="w-full h-screen"
            /> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SuperAdminEmail;
