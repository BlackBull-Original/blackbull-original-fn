import React from "react";

const Maininputfield = (props: any) => {
  return (
    <div className="relative">
      <div className="bg-[#EFF2F3] pt-[6px] pb-[7px] rounded-md h-fit leading-none">
        <label
          className={`text-[12px] block pl-[15px] text-[#57727E] pb-1 leading-none ${props.labelClass}`}
        >
          {props.label}
        </label>
        <input
          type="text"
          id={props.id}
          className={`pl-[15px] leading-[24px] bg-[#EFF2F3] text-[#35454C] outline-none w-[300px] placeholder:text-[16px]  text-[16px] font-medium ${props.className}`}
          placeholder={props.placeholder}
          value={props.value}
          name={props.name}
          onChange={props.onChange}
        />
      </div>
      {props.errorMessage && (
        <div className="text-red-500 text-[12px] mt-1">{props.errorMessage}</div>
      )}
    </div>
  );
};

export default Maininputfield;

