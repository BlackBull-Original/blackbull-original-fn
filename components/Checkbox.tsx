import React from "react";

const Checkbox = (props: any) => {
  return (
    <div className={`flex gap-2 mt-2 font-medium ${props.className}`}>
      <input
        checked={props.checked}
        type="checkbox"
        className="bg-[#D9D9D9] "
        onChange={props.onChange}
      />
      <label className="text-sm">
        <span className={`text-[#151515] ${props.color}`}>
          {" "}
          {props.content}
        </span>
        <b className="font-medium"></b>
      </label>
    </div>
  );
};

export default Checkbox;
