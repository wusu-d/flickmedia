import { weatherHelper } from "@/utils/weatherHelper";
import React from "react";
import { GiRaining, GiSnowing } from "react-icons/gi";
import { MdSunny, MdWbCloudy } from "react-icons/md";

const DailyWeatherIcon = ({ deg, day, weatherId }) => {
  const condition = weatherId;
  const { icon, desc } = weatherHelper(condition);

  return (
    <div className="w-1/5 px-2 py-2 bg-[#F6F4F1] rounded-sm flex flex-col gap-2 items-center ">
      <span className="font-light">{deg}</span>
      <span>{icon}</span>
      <span className="font-light">{desc}</span>
      <span className="text-sm font-medium">{day}</span>
    </div>
  );
};

export default DailyWeatherIcon;
