import React from "react";
import { MdWbCloudy } from "react-icons/md";
const WelcomePage = () => {
  return (
    <div className="h-full flex flex-col gap-2 items-center justify-center ">
      <span className="font-light">Welcome</span>
      <div className="text-emerald-600 text-sm font-semibold flex relative z-10">
        <span className="self-start">FlickMedia</span>
        <span className="text-cyan-500  text-3xl">Weather</span>
        <MdWbCloudy
          className="absolute -top-5 right-2"
          color="#22d3ee"
          size={40}
        />
      </div>
    </div>
  );
};

export default WelcomePage;
