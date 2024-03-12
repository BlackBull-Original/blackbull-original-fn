import React from "react";
import CalendarIcon from "./svg/CalendarIcon";
import Image from "next/image";

const Maindatefield = (props: any) => {
  return (
    <div className="relative">
      <div className="bg-[#EFF2F3] pt-[6px] pb-[6px] rounded-md  relative flex gap-2 pl-[10px]">
        <Image src="/calendarInput.svg" alt="calender" width={18} height={18} />
        <div>
          <label className="text-[12px] block text-[#57727E]" htmlFor="cal">
            {props.label}
          </label>

          <input
            type="date"
            id="cal"
            className="bg-[#EFF2F3] text-[#35454C] outline-none placeholder:text-[16px] text-[16px] font-medium "
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            min={props.min} // Add min attribute
          />
        </div>
      </div>
      {props.errorMessage && (
        <div className="text-red-500 text-[12px] mt-1">
          {props.errorMessage}
        </div>
      )}
    </div>
  );
};

export default Maindatefield;


