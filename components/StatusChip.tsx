import CommonUI from "@/pages/onboarding/utility/CommonUI";
import React, { useState } from "react";

interface StatusChipProps {
  chipColor: (value: any) => void;
}


const StatusChip = ({ chipColor }: StatusChipProps) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [flag, setFlag] = useState(true);
  const options = [
    { label: "Select", value: "" },
    { label: "Approved", value: "Approved" },
    { label: "Under Review", value: "Under Review" },
    { label: "Rejected", value: "Rejected" },
  ];

  const toggleColor = (value: any) => {
    setSelectedOption(value);
    chipColor(value);
    setFlag(false);
  };

  return (
    <div className="relative mt-[-4px]">
      <div className="relative">
        {flag && (
          <select
            name="status"
            id="status"
            className={`focus:outline-none appearance-none pt-[5px] pb-[5px] text-center pl-4 pr-8 rounded-full text-black ${
              selectedOption ? "bg-white text-black" : "border text-black"
            }`}
            onChange={(e) => toggleColor(e.target.value)}
            value={selectedOption}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {!flag && (
          <div
            onClick={() => {
              setSelectedOption("");
              chipColor("");
              setFlag(true);
            }}
            className="cursor-pointer"
          >
            <CommonUI status={selectedOption} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusChip;
