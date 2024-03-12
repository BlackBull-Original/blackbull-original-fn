import Image from "next/image";

const MobileInput = () => {
  return (
    <>
      <div>
        <div className="flex gap-2 border border-[#CED7DB] rounded-md">
          <div className="flex gap-2 py-2 px-4 bg-blueGrey-50 cursor-pointer">
            <Image src="/flagSvg/Au.svg" alt="flag" width={28} height={20} />
            <Image src="/dropdown.svg" alt="flag" width={20} height={20} />
          </div>
          <div className=" px-4">
            <label
              htmlFor="phone"
              className="text-blueGrey-600 text-sm font-semibold"
            >
              Phone Number
            </label>{" "}
            <br />
            <span className="text-blueGrey-300 font-semibold">+61 </span>
            <input id="phone" value={"123456789"} className="font-semibold" />
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};
export default MobileInput;
