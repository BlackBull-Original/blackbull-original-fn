import React from 'react';

const FileUpload = (props: any) => {
  return (
    <div className="relative w-full">
      <div>
        <label
          htmlFor={props?.id}
          className="flex gap-2 items-center cursor-pointer"
        >
          <div className="bg-[#2B36D9] text-white px-10 py-[12px] flex justify-center text-sm font-semibold rounded-full whitespace-nowrap ">
            {props?.fileName !== "" ? props?.fileName : (props?.file !== "" ? props?.file : "Browse")}
          </div>
        </label>
        <input
          type="file"
          id={props?.id}
          name={props?.name}
          hidden
          accept=".docx,.doc,.pdf"
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

export default FileUpload;
