import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: null,
  country: null,
  weatherArray: [],
  temp: null,
  humidity: null,
  windKMH: null,
  windMPH: null,
  visibility: null,
  dailyArray: [],
  weatherArr: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },

    setWeatherArray: (state, action) => {
      state.weatherArray = action.payload;
      state.temp = action.payload[0].main.temp;
      state.humidity = action.payload[0].main.humidity;
      state.windKMH = action.payload[0].wind.speed * 3.6;
      state.windMPH = action.payload[0].wind.speed * 2.23694;
      state.visibility = action.payload[0].visibility / 1000;
      const indices = [0, 9, 19, 29, 39];
      state.dailyArray = indices.map((index) => action.payload[index]);
      state.weatherArr = action.payload[0].weather[0];
    },
  },
});

export const { setCity, setCountry, setWeatherArray } = weatherSlice.actions;

export const selectCity = (state) => state.weather.city;
export const selectCountry = (state) => state.weather.country;
export const selectTemp = (state) => state.weather.temp;
export const selectHumidity = (state) => state.weather.humidity;
export const selectWindKMH = (state) => state.weather.windKMH;
export const selectWindMPH = (state) => state.weather.windMPH;
export const selectVisibility = (state) => state.weather.visibility;
export const selectHourly = (state) => state.weather.weatherArray.slice(0, 5);
export const selectDaily = (state) => state.weather.dailyArray;
export const selectWeatherArr = (state) => state.weather.weatherArr;

export default weatherSlice.reducer;
