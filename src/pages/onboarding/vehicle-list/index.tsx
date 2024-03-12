import VehiDetails from "../../../../components/VehiDetails";

const VehicleList = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="flex bg-[#F8F8F8] text-black">
        {/* <div className="sticky top-0">
          <Sidebar />
        </div> */}
        <div className="ml-[316px] w-full mt-4">
          <VehiDetails />
        </div>
      </div>
    </>
  );
};
export default VehicleList;
