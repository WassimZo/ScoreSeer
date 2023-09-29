import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getWeekFormattedDate } from "../../lib/supabaseActions";

export default function DaysBar() {
  let date = new Date();
  const days = getWeekFormattedDate();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsDate = searchParams.get("date");

  return (
    <div className="w-full gap-5 flex justify-between bg-white dark:bg-slate-700 dark:text-slate-50">
      <ul className="flex overflow-x-auto min-w-full h_scrollbar">
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
                className={`w-full text-center font-bold px-8 py-3 whitespace-nowrap ${
                  paramsDate
                    ? paramsDate === formatedDate
                      ? "text-blue-500  dark:text-blue-300 "
                      : ""
                    : ""
                }`}
              >
                {day}
              </Link>
            );
          } else {
            return (
              <Link
                to="/"
                key={day}
                className={`w-full text-center font-bold px-8 py-3 whitespace-nowrap ${
                  !paramsDate ? "text-blue-500  dark:text-blue-300" : ""
                }`}
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
