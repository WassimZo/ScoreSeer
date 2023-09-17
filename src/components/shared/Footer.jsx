import React from "react";
import { Link } from "react-router-dom";
import xLogo from "../../assets/twitter.svg";
import githubLogo from "../../assets/github.svg";

export default function Footer() {
  return (
    <div className="fixed bottom-0 bg-white w-full h-20">
      <div className="flex justify-between items-center w-24 mx-auto mt-4">
        <Link to="https://twitter.com/Wassimzo_12">
          <img src={xLogo} alt="x-logo" className="w-5 h-5" />
        </Link>
        <Link to="https://github.com/WassimZo">
          <img src={githubLogo} alt="github-logo" className="w-6 h-6" />
        </Link>
      </div>
      <div className="w-full text-center mt-2">
        <span className="text-xs font-extralight text-black/50">
          @ 2023 ScoreSeer. All rights reserved
        </span>
      </div>
    </div>
  );
}
