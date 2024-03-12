import Image from "next/image";
import React from "react";

const Button = (props: any) => {
  return (
    <div>
      <button
        type="submit"
        className={`flex items-center rounded-full gap-2 text-white p-2 w-full bg-primary-color ${props.className}`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.signatureIcon && (
          <Image src="/signature.svg" alt="signature" width={20} height={20} />
        )}
        <span className="text-base"> {props.text}</span>
        {props.dropDownIcon ? (
          <Image src="/arrow-down.svg" alt="dropdown" width={14} height={14} />
        ) : (
          ""
        )}
      </button>
    </div>
  );
};

export default Button;
