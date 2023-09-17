import React from "react";
import searchIcon from "../../assets/magnifying-glass-solid.svg";

export default function SearchBar() {
  return (
    <form className="mt-4 py-2 w-full rounded-lg flex items-center bg-white shadow-md">
      <input
        type="text"
        placeholder="Search for a team..."
        className="outline-none w-full ml-4"
      />
      <button
        type="submit"
        className="py-2 px-4 flex justify-center items-center"
      >
        <img src={searchIcon} alt="search icon" className="w-6 h-6" />
      </button>
    </form>
  );
}
