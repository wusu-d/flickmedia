import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const getDailyForecast = (extraConfig) => {
  return axios.get("http://api.openweathermap.org/data/2.5/forecast", {
    ...config,
    ...extraConfig,
  });
};

const getGeocoding = (extraConfig) => {
  return axios.get("http://api.openweathermap.org/geo/1.0/direct", {
    ...config,
    ...extraConfig,
  });
};

export const weatherService = {
  getDailyForecast,
  getGeocoding,
};
