import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import chevronDown from "../../assets/chevron-down-solid.svg";
import { getLeagues } from "../../features/leagues";

export default function SelectLeague({ handleClick }) {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const leagueState = useSelector((state) => state.leagues);
  const leagues = leagueState.leagues;

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  if (leagues.length < 1) {
    dispatch(getLeagues());
  }

  return (
    <div className="w-full relative mt-2">
      <button
        onClick={toggleMenu}
        className="bg-white px-4 py-4 rounded-lg shadow-md flex justify-between w-full font-semibold items-center"
      >
        <span className="font-light text-black/50">Select League</span>
        <img src={chevronDown} alt="chevron down" className="w-6 h-6" />
      </button>

      {leagues.length > 0 && openMenu && (
        <div className="absolute top-16 w-full bg-white  rounded-lg flex flex-col items-start gap-2 pl-4 py-6 z-50">
          {leagues.map((league) => (
            <button
              key={league.id}
              className="font-medium w-full flex justify-between items-center px-6"
              onClick={(e) => handleClick(league.id)}
            >
              <span>{league.name}</span>
              <img src={league.logo} alt="league logo" className="h-9 w-7" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
