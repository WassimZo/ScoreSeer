import React from "react";
import { Link } from "react-router-dom";

export default function DaysBar() {
  const days = ["Today", "Tomorrow", "J+2", "J+3", "J+4", "J+5", "J+6", "J+7"];

  return (
    <div className="w-full gap-5 flex justify-between bg-white">
      <ul className="flex overflow-auto">
        {days.map((day) => (
          <Link
            to="/"
            key={day}
            className="text-md font-bold px-8 py-3 whitespace-nowrap"
          >
            {day}
          </Link>
        ))}
      </ul>
    </div>
  );
}
