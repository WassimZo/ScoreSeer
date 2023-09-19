import React from "react";
import { Link } from "react-router-dom";

export default function DaysBar() {
  let date = new Date();
  const days = ["Today", "Tomorrow", "J+2", "J+3", "J+4", "J+5", "J+6", "J+7"];

  return (
    <div className="w-full gap-5 flex justify-between bg-white">
      <ul className="flex overflow-auto">
        {days.map((day) => {
          if (day != "Today") {
            date.setDate(date.getDate() + 1);

            const formatedDate = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

            return (
              <Link
                to={`/?date=${formatedDate}`}
                key={day}
                className="text-md font-bold px-8 py-3 whitespace-nowrap"
              >
                {day}
              </Link>
            );
          } else {
            return (
              <Link
                to="/"
                key={day}
                className="text-md font-bold px-8 py-3 whitespace-nowrap"
              >
                {day}
              </Link>
            );
          }
        })}
      </ul>
    </div>
  );
}
