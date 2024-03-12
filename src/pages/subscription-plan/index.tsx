import Image from "next/image";
import Button from "../../../components/Button";

const SubscriptionPlan = () => {
  return (
    <>
      <div className=" h-screen bg-[#F6F9FF] pt-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Choose your plan</h2>
          <p className="text-blueGrey-700 my-2">
            Discover the right plan for you. Elevate your journey with our
            diverse membership options.
          </p>
          <div>
            <div className="w-fit m-auto flex gap-2 bg-white p-2 rounded-full shadow-md mt-6 text-sm">
              <span className="text-primary font-semibold py-[5px] px-[15px] rounded-full">
                Monthly
              </span>
              <span className="text-primary font-semibold bg-[#FFF5FF] py-[5px] px-[15px] rounded-full">
                Annually
              </span>
            </div>
            <p className="text-primary text-center mt-2 font-semibold">
              save upto 34%
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 px-16 m-6 gap-8">
          {planCollection?.map((value, index) => {
            return (
              <>
                <div
                  className="px-6 pt-10 pb-6 w-fit bg-white rounded-xl overflow-hidden shadow-md"
                  key={index}
                >
                  <div className="border-b border-[#CED7DB] pb-4 relative">
                    <div className="flex leading-[0px]">
                      <h3 className="font-bold text-2xl leading-[0px]">
                        {value.price}
                      </h3>
                      <sub className="text-blueGrey-300">{value.duration}</sub>
                    </div>
                    <div className="mt-8">
                      <h4 className="text-xl font-semibold">
                        {value.planHeading}
                      </h4>
                      <p className="text-blueGrey-800 mt-[5px]">
                        {value.planContent}
                      </p>
                    </div>
                    {value?.planHeading === "Business Plan" && (
                      <div className="bg-primary-color text-white text-center p-2 absolute right-[-180px] top-[-20px] w-full rotate-45">
                        Popular
                      </div>
                    )}
                  </div>
                  <div className="mt-6 grid gap-2">
                    <div className="flex gap-2 ">
                      <Image
                        src="/tick-circle.svg"
                        alt="tick"
                        width={18}
                        height={18}
                      />
                      <span>Contact Management</span>
                    </div>
                    <div className="flex gap-2">
                      <Image
                        src="/tick-circle.svg"
                        alt="tick"
                        width={18}
                        height={18}
                      />
                      <span>Shipment Tracking</span>
                    </div>
                    <div className="flex gap-2">
                      <Image
                        src="/tick-circle.svg"
                        alt="tick"
                        width={18}
                        height={18}
                      />
                      <span>Basic Reporting</span>
                    </div>
                    <div className="flex gap-2">
                      <Image
                        src="/tick-circle.svg"
                        alt="tick"
                        width={18}
                        height={18}
                      />
                      <span>Feature</span>
                    </div>
                    <div className="flex gap-2">
                      <Image
                        src="/tick-circle.svg"
                        alt="tick"
                        width={18}
                        height={18}
                      />
                      <span>Feature</span>
                    </div>
                    <Button
                      text="Get Started"
                      className="!rounded-full grid justify-center mt-8"
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default SubscriptionPlan;
const planCollection = [
  {
    price: "$199",
    duration: "/annually",
    planHeading: "Starter Plan",
    planContent:
      "Essential tools to kickstart your freight management journey.",
    planFeatures: [
      {
        features: "Contact Management",
      },
      {
        features: "Shipment Tracking",
      },
      {
        features: "Basic Reporting",
      },
      {
        features: "Feature",
      },
      {
        features: "Feature",
      },
    ],
  },
  {
    price: "$299",
    duration: "/annually",
    planHeading: "Business Plan",
    planContent:
      "Optimize operations with advanced features for growing businesses.",
    planFeatures: [
      {
        features: "Includes Starter Plan features",
      },
      {
        features: "Advanced Contact Insights",
      },
      {
        features: "Enhanced Shipment Analytics",
      },
      {
        features: "Priority Customer Support",
      },
      {
        features: "Feature",
      },
    ],
  },
  {
    price: "$399",
    duration: "/annually",
    planHeading: "Enterprise Plan",
    planContent:
      "Elevate your freight operations with comprehensive CRM and dedicated support.",
    planFeatures: [
      {
        features: "Includes Starter & Business Plan features",
      },
      {
        features: "Full CRM Functionality",
      },
      {
        features: "Real-time Freight Visibility",
      },
      {
        features: "Custom Reporting and Dashboards",
      },
      {
        features: "Dedicated Account Manager",
      },
    ],
  },
];
