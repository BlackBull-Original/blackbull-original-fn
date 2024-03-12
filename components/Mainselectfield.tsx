import React from "react";

interface ProposFrence {
  mapOption?: any;
  label?: string;
  id?: string;
  option?: any;
}

const Mainselectfield = ({ mapOption, label, id }: ProposFrence) => {
  // console.log("check kr", mapOption);

  // const optionCollection = options.value;

  // const xyz = option?.map((item) => {
  //   console.log("new", { item });
  //   return item;
  // });

  return (
    <div className="bg-[#EFF2F3]  pt-[5px] pb-[5px] rounded-md">
      <label className="text-[12px] block pl-[15px] text-[#57727E]">
        {label}
      </label>
      <select
        id={id}
        className="pl-[10px] bg-[#EFF2F3] outline-none w-[97%] h-[70%] text-[12px] text-[#8097A2]"
      >
        {/* {option?.map((item , index)=>{

        })} */}
        {/* {option?.map((items,index) => {
          return (
            <>
              <option value={items.value}>{items.value}</option>
            </>
          );
        })} */}
        {/* <h1>{option}</h1> */}
      </select>
    </div>
  );
};

export default Mainselectfield;
