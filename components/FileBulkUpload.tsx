import React from "react";

const FileBulkUpload = (props: any) => {
  return (
    <div className="relative w-full">
      <div>
        <label
          htmlFor={props?.id}
          className="flex gap-2 items-center cursor-pointer"
        >
          <div className="bg-[#EFF2F399] text-[#8097A2] px-10 py-[12px] flex justify-center text-sm font-semibold rounded-md whitespace-nowrap ">
            {props?.fileName !== ""
              ? props?.fileName
              : props?.file !== ""
              ? props?.file
              : "No File Uploded"}
          </div>
          <div className="bg-[#5C3E8E] text-white px-10 py-[12px] flex justify-center text-sm font-semibold rounded-md whitespace-nowrap ">
            Browse
          </div>
        </label>
        <input
          type="file"
          id={props?.id}
          name={props?.name}
          hidden
          accept=".docx,.doc,.pdf,.csv"
          onChange={props?.onChange}
        />
      </div>
      {props?.errorMessage && (
        <div className="text-red-500 text-[12px] mt-1">
          {props?.errorMessage}
        </div>
      )}
    </div>
  );
};

export default FileBulkUpload;
