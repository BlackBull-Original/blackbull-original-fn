// components/ImageUpload.js

import Image from "next/image";
import { useState } from "react";
import Button from "../Button";
import React from "react";
import { addDriver } from "@/network-request/driver-api";
import DriverDetails from "../DriverDetails";


const ImageUpload = ({handleSubmit}:any) => {
  const [image, setImage] = useState("");

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };



  return (
    <div className="grid gap-4 justify-end mt-4">
      {/* <div>
        <div className="bg-white border border-[#e5e5e5] rounded-md w-[343px] h-[180px]">
          {image && (
            <Image
              src={image}
              alt="Preview"
              width={200}
              height={200}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </div>
      </div> */}
      <div className="relative">
        {/* <label
          htmlFor="file-upload"
          className="flex gap-2 bg-[#2B36D9] w-fit text-white items-center py-2 px-4 rounded-md absolute right-0"
        >
          <Image src={"/signature.svg"} alt="signature" width={25} height={8} />
          <span>Upload Signature</span>
        </label>
        <input
          type="file"
          style={{
            visibility: "hidden",
          }}
          id="file-upload"
          onChange={handleImageChange}
        /> */}
        <div className="flex justify-end my-6 gap-2">
          <Button
            text="Save"
            className="!bg-transparent !text-black border border-[#e5e5e5] !px-8"
          />
          <Button onClick={()=>handleSubmit()} text="Create" className="!px-8 bg-[#2B36D9]" />
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
