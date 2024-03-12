import Image from "next/image";
import Button from "../../../components/Button";

const Dashboard = () => {
  return (
    <>
      <div className="flex bg-[#E9EFFF] text-black h-[90vh]">
        <div className="ml-[316px] w-full mt-4">
          <div className="text-center grid content-center items-center h-full">
            <div>
              <Image
                src={"/truck.svg"}
                alt="truck"
                width={367}
                height={160}
                className="m-auto"
              />
            </div>
            <p className="text-blueGrey-800 text-xl mt-4">
              Get started now! Add drivers and customers to unlock <br />
              insightful charts for better delivery management.
            </p>
            <Button
              text="Show dummy data"
              className="!w-fit px-6 m-auto mt-6"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
