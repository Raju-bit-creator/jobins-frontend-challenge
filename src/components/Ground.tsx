// import React from "react";
import Counts from "./Count";
import Profile from "./Profile";
import Salestable from "./Table";

interface GroundProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

const Ground = ({ isExpanded }: GroundProps) => {
  return (
    <div
      className={`bg-[#f5f5f5] transition-all duration-300 w-full min-h-screen ${
        isExpanded ? "mt-[62px]" : "mt-[54px]"
      }`}
    >
      <div className="space-y-6 px-3 sm:px-6 lg:px-8 pb-8">
        <Counts />
        <Profile />
        <Salestable />
      </div>
    </div>
  );
};
export default Ground;
