import { GiRaining, GiSnowing } from "react-icons/gi";
import { MdSunny, MdWbCloudy, MdThunderstorm } from "react-icons/md";
import { RiFoggyFill } from "react-icons/ri";
import { BsCloudDrizzleFill } from "react-icons/bs";
export const weatherHelper = (condition) => {
  let icon;
  let desc;
  if (condition === 800) {
    icon = <MdSunny color="#ffff00" size={24} />;
    desc = "Sunny";
  } else if (condition >= 200 && condition < 232) {
    icon = <MdThunderstorm color="#22d3ee" size={20} />;
    desc = "Thunderstorms";
  } else if (condition >= 300 && condition < 321) {
    icon = <BsCloudDrizzleFill color="#22d3ee" size={20} />;
    desc = "Drizzle";
  } else if (condition >= 500 && condition < 531) {
    icon = <GiRaining color="#22d3ee" size={20} />;
    desc = "Rainy";
  } else if (condition >= 600 && condition < 622) {
    icon = <GiSnowing color="#22d3ee" size={20} />;
    desc = "Snowing";
  } else if (condition >= 701 && condition < 781) {
    icon = <RiFoggyFill color="#22d3ee" size={20} />;
    desc = "Foggy";
  } else {
    icon = <MdWbCloudy color="#22d3ee" size={20} />;
    desc = "Cloudy";
  }

  return { icon, desc };
};
