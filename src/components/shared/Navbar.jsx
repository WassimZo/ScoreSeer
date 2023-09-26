import React, { useState } from "react";
import ScoreSeerLogo from "../../assets/eye-solid.svg";
import darkLogo from "../../assets/eye-dark.svg";
import SunIcon from "../../assets/sun.svg";
import MoonIcon from "../../assets/moon-solid.svg";
import { Link } from "react-router-dom";
import DaysBar from "./DaysBar";
import { logout } from "../../lib/supabaseActions";
import useDark from "../../../hooks/useDark";

export default function Navbar({ session }) {
  const [colorTheme, setTheme] = useDark();

  const handleTheme = () => {
    setTheme(colorTheme);
  };

  return (
    <>
      <div className="w-full bg-white h-32 relative top-0 left-0 flex justify-between items-center px-3 dark:bg-slate-700 dark:text-slate-50 ">
        <div>
          <Link to="/" className="w-full h-full flex flex-row items-center">
            <img
              src={colorTheme === "dark" ? ScoreSeerLogo : darkLogo}
              alt="logo"
              className="w-6 h-6"
            />
            <h1 className="text-md font-bold ml-1">ScoreSeer</h1>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="flex items-center justify-center p-2"
            onClick={(e) => handleTheme(e)}
          >
            <img
              src={colorTheme === "dark" ? MoonIcon : SunIcon}
              alt="moon icon"
              className="w-4 h-4"
            />
          </button>

          {session ? (
            <button to="/logout" className="p-2" onClick={(e) => logout()}>
              <h1 className="font-semibold ">logout</h1>
            </button>
          ) : (
            <Link to="/login" className="p-2">
              <h1 className="font-semibold ">login</h1>
            </Link>
          )}
        </div>
      </div>
      <DaysBar />
    </>
  );
}
