import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

import React from "react";

const VehicleDetails = () => {
  return (
    <div className="flex bg-[#F8F8FF]">
      <div>
        <Sidebar />
      </div>
      <Header />
    </div>
  );
};

export default VehicleDetails;
