import React from "react";

const Search = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row ">
      <div className="flex flex-col p-5 gap-5 border-r-2 md:min-h-screen">
        <div className="flex items-center gap-2">
          <label className="font-semibold">SearchTerm:</label>
          <input
            type="text"
            className="border p-2 rounded-md w-full"
            placeholder="Search..."
          />
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <label className="font-semibold"> Type:</label>
          <div>
            <input type="checkbox" id="rentandsale" />
            <span>Rent and Sale</span>
          </div>
          <div>
            <input type="checkbox" id="rent" />
            <span>Rent </span>
          </div>
          <div>
            <input type="checkbox" id="sale" />
            <span>Sale</span>
          </div>
          <div>
            <input type="checkbox" id="offer" />
            <span>offer</span>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <label className="font-semibold">Ammenities:</label>
          <div>
            <input type="checkbox" id="rentandsale" />
            <span>Furnished</span>
          </div>
          <div>
            <input type="checkbox" id="rent" />
            <span>Parking</span>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <label className="font-semibold">Sorting:</label>
          <select className="border p-2" id="order">
            <option>Low to High</option>
            <option>High to Low</option>
            <option>Latest</option>
            <option>Oldest</option>
          </select>
        </div>
        <button className="w-full bg-orange-400 text-white uppercase p-3 rounded-md hover:opacity-75">
          Search
        </button>
      </div>
      <div className="flex p-3">
      <div>
        <p className="font-semibold text-3xl">
        Loading results....
        </p>
      </div>
      </div>
    </div>
  );
};

export default Search;
