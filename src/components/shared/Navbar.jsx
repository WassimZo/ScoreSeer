import React, { useEffect, useState } from "react";
import ScoreSeerLogo from "/src/assets/eye-solid.svg";
import darkLogo from "/src/assets/eye-dark.svg";
import SunIcon from "/src/assets/sun.svg";
import MoonIcon from "/src/assets/moon-solid.svg";
import { Link } from "react-router-dom";
import DaysBar from "./DaysBar";
import { logout } from "/src/lib/supabaseActions";
import useDark from "/src/../hooks/useDark";

export default function Navbar({ session }) {
  const [colorTheme, setTheme] = useDark();

  useEffect(() => {
    setTheme("light");
  }, []);

  const handleTheme = () => {
    setTheme(colorTheme);
  };

  return (
    <>
      <div className="w-full bg-white h-32 relative top-0 left-0 flex justify-between items-center px-3 sm:px-8 xl:px-12 dark:bg-slate-700 dark:text-slate-50 ">
        <div>
          <Link to="/" className="w-full h-full flex flex-row items-center">
            <img
              src={
                colorTheme === "dark" || colorTheme == undefined
                  ? ScoreSeerLogo
                  : darkLogo
              }
              alt="logo"
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <h1 className="font-bold ml-1 sm:text-xl sm:ml-4">ScoreSeer</h1>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="flex items-center justify-center p-2"
            onClick={(e) => handleTheme(e)}
          >
            <img
              src={
                colorTheme === "dark" || colorTheme == undefined
                  ? MoonIcon
                  : SunIcon
              }
              alt="moon icon"
              className="w-4 h-4"
            />
          </button>

          {session ? (
            <button
              to="/logout"
              className="p-2 sm:p-4"
              onClick={(e) => logout()}
            >
              <h1 className="font-semibold sm:text-lg ">logout</h1>
            </button>
          ) : (
            <Link to="/login" className="p-2 sm:p-4">
              <h1 className="font-semibold sm:text-lg">login</h1>
            </Link>
          )}
        </div>
      </div>
      <DaysBar />
    </>
  );
}
