import React from "react";

const CommonUI = (props: any) => {
  const { status } = props;

  if (status === 'Active' || status === 'Approved') {
    return (
      <p className="bg-[#D9F2DD] text-[#359742] w-fit px-4 py-[5px] rounded-full m-auto flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#359742] block"></span>{" "}
        {status}
      </p>
    );
  } 
  else if (status === 'Under Review') {
    return (
      <p className="bg-[#EAEDFA] text-[#5872DA] w-fit px-4 py-[5px] rounded-full m-auto flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#5872DA] block"></span>{" "}
        {status}
      </p>
    );
  } 
  else if (status === 'Rejected') {
    return (
      <p className="bg-[#FFE5E5] text-[#FF6666] w-fit px-4 py-[5px] rounded-full m-auto flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#FF6666] block"></span>{" "}
        {status}
      </p>
    );
  }else {
    // Handle other cases or provide a default
    return <p>status</p>;
  }
};

export default CommonUI;
