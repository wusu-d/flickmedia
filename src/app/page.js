"use client";
import Overlay from "@/components/Overlay";
import WeatherPage from "@/components/WeatherPage";
import WelcomePage from "@/components/WelcomePage";

import { useEffect, useState } from "react";

export default function Home() {
  const [step, setStep] = useState(0);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [coords, setCoords] = useState({ longitude: "", latitude: "" });

  const closeOverlay = () => {
    setIsError(false);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
          setStep(1);
        },
        (error) => {
          setIsError(true);
          setErrorMsg("Allow app to access location");
        }
      );
    } else {
      setIsError(true);
      setErrorMsg("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <main className="grow bg-[#F6F4F1] h-full px-2 md:px-4 py-6 flex flex-col">
      {isError && (
        <Overlay
          isError={isError}
          closeOverlay={closeOverlay}
          message={errorMsg}
        />
      )}
      {step === 0 && <WelcomePage />}
      {step === 1 && (
        <WeatherPage longitude={coords.longitude} latitude={coords.latitude} />
      )}
    </main>
  );
}
