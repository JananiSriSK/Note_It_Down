
import React from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Searchbar = ({ value, onChange, handleSearch, clearSearch }) => {
  return (
    <div className="flex items-center justify-start gap-2 ml-[-50px]">

      <img
        className="w-12 h-12 object-contain rounded-sm"
        src="https://media.tenor.com/apGSV-Mt_bgAAAAj/tkthao219-bubududu.gif"
        alt="cat gif"
      />

      {/* Search Bar */}
      <div className="w-40 sm:w-60 md:w-80 flex items-center justify-center px-4 bg-slate-100 rounded-md">
        <input
          type="text"
          placeholder="Search Notes..."
          className="w-full text-sm bg-transparent py-[11px] outline-none"
          value={value}
          onChange={onChange}
        />

        {value && (
          <IoMdClose
            className="text-slate-500 text-xl cursor-pointer hover:text-black mr-2"
            onClick={clearSearch}
          />
        )}

        <FaMagnifyingGlass
          className="text-slate-500 text-xl cursor-pointer hover:text-black"
          onClick={handleSearch}
        />
      </div>

      <img
        className="w-12 h-12 object-contain rounded-sm"
        src="https://media.tenor.com/apGSV-Mt_bgAAAAj/tkthao219-bubududu.gif"
        alt="cat gif"
      />
    </div>
  );
};

export default Searchbar;
