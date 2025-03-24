import React from "react";
import { useSelector, useDispatch } from "react-redux";

function SearchPageForMObile() {
  return (
    <div className="absolute top-0 w-full h-full">
      <form
        onSubmit={handleSearch}
        className="relative flex items-center md:bg-[var(--smallcard)] gap-1 p-1 rounded-md h-full"
      >
        <button type="submit" onClick={handleSearchForMobile}>
          <IoSearchOutline className="text-[var(--text)] mt-[2px] text-3xl translate-x-32 md:translate-x-0" />
        </button>
        <input
          type="search"
          placeholder="Search blog"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="hidden md:flex items-center border-none focus:outline-none bg-transparent text-[var(--text)]"
        />
      </form>
    </div>
  );
}

export default SearchPageForMObile;
