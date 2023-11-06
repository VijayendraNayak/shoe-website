import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchstate, setSearchstate] = useState(" ");
  const navigate = useNavigate();

  const searchsubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchstate);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    // console.log(searchTermFromUrl)
    if (searchTermFromUrl) {
      setSearchstate(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-orange-100">
      <div className="flex justify-between p-3 max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-orange-300">Shoe</span>
            <span className="text-orange-500">Shop</span>
          </h1>
        </Link>
        <form
          onSubmit={searchsubmit}
          className="bg-orange-200 rounded-lg flex items-center px-3 "
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 "
            onChange={(e) => {
              setSearchstate(e.target.value);
            }}
            value={searchstate}
          />
          <button>
            <FaSearch className="text-orange-600"></FaSearch>
          </button>
        </form>
        <ul className="flex  gap-4">
          <Link to="/">
            <li className="hidden sm:inline  hover:underline text-orange-700">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline  hover:underline text-orange-700">
              About
            </li>
          </Link>
          <Link to="/profile">
            {/* {console.log(currentUser.photo)} */}
            {currentUser ? (
              <img
                className="w-7 h-7 rounded-full object-cover"
                src={currentUser.photo}
                alt="yourimage"
              />
            ) : (
              <li className="hover:underline text-orange-700">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
