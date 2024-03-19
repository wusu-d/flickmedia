import React from "react";
import DailyWeatherIcon from "@/components/DailyWeatherIcon";
import { useEffect, useState } from "react";
import { weatherService } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCity,
  selectCountry,
  selectDaily,
  selectHourly,
  selectHumidity,
  selectTemp,
  selectVisibility,
  selectWeatherArr,
  selectWindKMH,
  selectWindMPH,
  setCity,
  setCountry,
  setWeatherArray,
} from "@/redux/weatherSlice";
import { format, isToday, parseISO } from "date-fns";
import { WiHumidity } from "react-icons/wi";
import { MdVisibility } from "react-icons/md";
import { FiWind } from "react-icons/fi";
import { weatherHelper } from "@/utils/weatherHelper";
import Overlay from "./Overlay";

//MAIN APPLICATION PAGE
const WeatherPage = ({ longitude, latitude }) => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const city = useSelector(selectCity);
  const country = useSelector(selectCountry);
  const temp = useSelector(selectTemp);
  const humidity = useSelector(selectHumidity);
  const windKMH = useSelector(selectWindKMH);
  const visibility = useSelector(selectVisibility);
  const hourArray = useSelector(selectHourly);
  const dailyArray = useSelector(selectDaily);
  const weatherObject = useSelector(selectWeatherArr);
  const [searchInput, setSearchInput] = useState("");
  const [unit, setUnit] = useState("metric");

  const closeOverlay = () => {
    setIsError(false);
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSelectChange = (e) => {
    setUnit(e.target.value);
  };

  const handleSearchClick = async () => {
    if (!searchInput.trim()) return;
    try {
      setIsLoading(true);

      const response = await weatherService.getGeocoding({
        params: {
          q: searchInput.trim(),
          limit: 1,
          appid: "d5e94a1f4f612332937d877c2fe1fb23",
        },
      });
      if (response.status === 200) {
        const lat = response.data[0].lat;
        const long = response.data[0].lon;
        try {
          const response = await weatherService.getDailyForecast({
            params: {
              lat: lat,
              lon: long,
              appid: "d5e94a1f4f612332937d877c2fe1fb23",
              cnt: 40,
              units: unit,
            },
          });
          if (response.data.cod === "200") {
            dispatch(setCity(response.data.city.name));
            dispatch(setCountry(response.data.city.country));
            dispatch(setWeatherArray(response.data.list));
          }
        } catch (error) {
          setIsError(true);
        }
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setSearchInput("");
    }
  };

  //GET THE WEATHER DATA AND STORE IN A REDUX SLICE
  useEffect(() => {
    const fetchDailyForecast = async () => {
      try {
        setIsLoading(true);
        const response = await weatherService.getDailyForecast({
          params: {
            lat: latitude,
            lon: longitude,
            appid: "d5e94a1f4f612332937d877c2fe1fb23",
            cnt: 40,
            units: unit,
          },
        });
        if (response.data.cod === "200") {
          dispatch(setCity(response.data.city.name));
          dispatch(setCountry(response.data.city.country));
          dispatch(setWeatherArray(response.data.list));
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDailyForecast();
  }, [latitude, dispatch, longitude, unit]);

  return (
    <>
      {isLoading && <Overlay isLoading={isLoading} />}
      {isError && (
        <Overlay
          isError={isError}
          closeOverlay={closeOverlay}
          message="Something went wrong"
        />
      )}
      <div className="flex flex-col gap-4 bg-[#4a919e] text-white py-4 px-2  md:px-4 rounded-md shadow-md">
        <div>
          <div className="flex gap-4">
            <div>
              {city}, {country}
            </div>
            <select
              value={unit}
              onChange={handleSelectChange}
              className="text-black"
            >
              <option value="metric">Celcius</option>
              <option value="imperial">Farenheit</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between gap-1 items-center ">
          <div className="flex flex-col gap-4 justify-between">
            <h5 className="text-3xl md:text-4xl basis-1/3">
              {Math.floor(temp)}°{unit === "metric" ? "C" : "F"}
            </h5>
            <div>
              <span className="text-xs md:text-base font-light capitalize flex flex-col-reverse gap-1">
                {weatherObject?.description}{" "}
                <span className="font-normal">
                  {weatherHelper(weatherObject?.id).icon}
                </span>
              </span>
            </div>
          </div>

          <div className="flex gap-2 basis-2/3 ">
            <div className="bg-[#212e53] basis-1/3 py-4 px-2 text-white text-xs rounded-2xl flex flex-col items-center text-center ">
              <span className="mb-3 flex items-center justify-center shadow-md rounded-sm">
                <WiHumidity color="#ce6a6b" size={20} />
              </span>
              <span>Humidity</span>
              <span className="text-sm">{humidity}%</span>
            </div>
            <div className="bg-[#212e53] basis-1/3 py-4 px-2 text-white text-xs rounded-2xl flex flex-col items-center text-center ">
              <span className="mb-3 flex items-center justify-center shadow-md rounded-sm">
                <MdVisibility color="#ce6a6b" size={20} />
              </span>
              <span>Visibility</span>
              <span className="text-sm">{visibility}km</span>
            </div>
            <div className="bg-[#212e53] basis-1/3 py-4 px-2 text-white text-xs rounded-2xl flex flex-col items-center text-center ">
              <span className="mb-3 flex items-center justify-center shadow-md rounded-sm">
                <FiWind color="#ce6a6b" size={20} />
              </span>
              <span className="text-xs">Wind </span>
              <span className="text-sm">{Math.round(windKMH)}km/h</span>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 flex items-center">
        <input
          value={searchInput}
          onChange={handleInputChange}
          className="grow h-full px-2"
          placeholder="Search for a city"
        />
        <button
          onClick={handleSearchClick}
          className="bg-purple-800 p-2 text-white rounded"
        >
          Search
        </button>
      </div>
      <div className="rounded-md px-2 md:px-4 py-4 bg-white shadow-md flex flex-col h-auto">
        <span className="font-medium">Hourly Forecast</span>

        <div className="flex justify-between mt-4 gap-2">
          {hourArray.map((arrayItem) => {
            const time = format(new Date(arrayItem.dt_txt), "h a");
            return (
              <DailyWeatherIcon
                key={arrayItem.dt_txt}
                deg={`${Math.floor(arrayItem.main.temp)}°`}
                weatherId={arrayItem.weather[0].id}
                day={time}
              />
            );
          })}
          {/* <DailyWeatherIcon deg={"21*"} weatherIcon={"🌧"} day={"17 Mar"} />
          <DailyWeatherIcon deg={"21*"} weatherIcon={"🌧"} day={"17 Mar"} />
          <DailyWeatherIcon deg={"21*"} weatherIcon={"🌧"} day={"17 Mar"} />
          <DailyWeatherIcon deg={"21*"} weatherIcon={"🌧"} day={"17 Mar"} /> */}
        </div>
      </div>
      <div className="rounded-md mt-4 px-2 md:px-4 py-4 bg-white shadow-md flex flex-col h-auto">
        <span className="font-medium">Daily Forecast</span>

        <div className="flex justify-between mt-4 gap-2">
          {dailyArray.map((arrayItem) => {
            const date = parseISO(arrayItem.dt_txt);
            const time = isToday(date) ? "Today" : format(date, "EEE");
            return (
              <DailyWeatherIcon
                key={arrayItem.dt_txt}
                deg={`${Math.floor(arrayItem.main.temp)}°`}
                weatherId={arrayItem.weather[0].id}
                // weatherIcon={icon}
                // desc={desc}
                day={time}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default WeatherPage;
