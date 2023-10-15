import React from "react";

export default function SignIn() {
  return (
    <div>
      <div className="p-3 max-w-lg mx-auto my-7 border-2 border-orange-200 rounded-lg">
        <h1 className="text-orange-500 text-center text-3xl font-bold">
          Sign Up
        </h1>
        <form className="flex flex-col gap-4 p-3  ">
          <input
            type="text"
            placeholder="username"
            id="username"
            className="border rounded-lg p-3"
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            className="border rounded-lg p-3"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            className="border rounded-lg p-3"
          />
          <button className="bg-orange-500 text-white p-3 uppercase hover:opacity-80">
            Sign Up
          </button>
        </form>
        <div className="gap-4 mt-4 flex">
          <p>Have an account?</p>
          <span className="text-orange-500">sign In</span>
        </div>
      </div>
    </div>
  );
}
