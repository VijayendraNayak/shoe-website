import React from "react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setformData] = useState({});
  const [Error, setError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const changeHandler = (event) => {
    setformData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      setError(null);
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
navigate('sign-in')

    } catch (error) {
      setLoading(false);
      setError(Error.message);
    }
  };
  return (
    <div>
      <div className="p-3 max-w-lg mx-auto my-7 border-2 border-orange-200 rounded-lg">
        <h1 className="text-orange-500 text-center text-3xl font-bold">
          Sign Up
        </h1>
        <form className="flex flex-col gap-4 p-3  " onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="border rounded-lg p-3"
            onChange={changeHandler}
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="border rounded-lg p-3"
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border rounded-lg p-3"
            onChange={changeHandler}
          />
          <button
            disabled={Loading}
            className="bg-orange-500 text-white p-3 uppercase hover:opacity-80"
          >
            {Loading ? "Loading..." : "Sign-Up"}
          </button>
        </form>
        <div className="gap-4 mt-4 flex">
          <p>Have an account?</p>
          <Link to={"/sign-in"}>
          <span className="text-orange-500">Sign-In</span>
          </Link>
        </div>
        {Error && <p className="text-red-500 mt-5"> {Error} </p>}
      </div>
    </div>
  );
}
