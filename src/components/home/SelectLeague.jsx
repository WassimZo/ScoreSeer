import { useState } from "react";
import chevronDown from "../../assets/chevron-down-solid.svg";

export default function SelectLeague() {
  const [openMenu, setOpenMenu] = useState(false);
  const leagues = ["PL", "L1", "Liga"];

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="w-full relative mt-2">
      <button
        onClick={toggleMenu}
        className="bg-white  px-4 py-4  rounded-lg shadow-md flex justify-between w-full font-semibold items-center"
      >
        <span className="font-light text-black/50">Select League</span>
        <img src={chevronDown} alt="chevron down" className="w-6 h-6" />
      </button>

      {openMenu && (
        <div className="absolute top-16 w-full bg-white  rounded-lg flex flex-col items-start gap-2 pl-4 py-6 z-50">
          {leagues.map((league) => (
            <button className="font-medium w-full text-left">{league}</button>
          ))}
        </div>
      )}
    </div>
  );
}
