import React from "react";
import { useSelector } from "react-redux";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-7 max-w-lg mx-auto">
      <form className="flex flex-col gap-4">
        <img
          className="rounded-full w-16 h-16 self-center object-cover"
          src={currentUser.photo}
          alt="profileimage"
        />
        <input
          className="p-3 rounded-lg bg-orange-50"
          placeholder="username"
          type="text"
          id="username"
        />
        <input
          className="p-3 rounded-lg bg-orange-50"
          placeholder="email"
          type="text"
          id="email"
        />
        <input
          className="p-3 rounded-lg bg-orange-50"
          placeholder="password"
          type="text"
          id="password"
        />
        <button className="p-3 rounded-lg bg-orange-500 text-white">
          UPDATE
        </button>
      </form>

      <div className="flex justify-between mt-4">
        <span className="text-red-500 cursor-pointer hover:text-red-700">
          Delete account
        </span>
        <span className="text-red-500 cursor-pointer hover:text-red-700">
          SignOut
        </span>

      </div>
    </div>
  );
}
