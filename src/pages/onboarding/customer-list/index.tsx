import CustomerDetails from "../../../../components/CustomerDetails";

const CustomerList = () => {
  return (
    <>
      <div className="flex ml-[301px] ps-4 rounded-2xl bg-[#F8F8F8] text-black">
        <div className="w-full mt-1.4">
          <CustomerDetails/>
        </div>
      </div>
    </>
  );
};
export default CustomerList;
