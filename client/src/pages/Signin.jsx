import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStaart,
  signinSuccess,
  signinFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStaart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signinFailure(data.message));
        return;
      }

      dispatch(signinSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signinFailure(error.message));
      return;
    }
  };

  return (
    <div className="mx-10 ">
      <h1 className="text-3xl text-center font-bold my-7 text-sky-800">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        action=""
        className="border px-8 py-10 m-auto max-w-xl rounded-lg  shadow-md flex flex-col gap-y-8 bg-white"
      >
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <div className="flex flex-col sm:flex-row h-20 gap-2 pb-3 ">
        <button
          disabled={loading}
          class=" text-white px-3 sm:px-8 py-3 w-[10rem] sm:w-[15rem] m-auto rounded-md hover:bg-cyan-600 bg-sky-700 sm:py-4  text-xs sm:text-[15px]">
            {loading ? "LOADING..." : "Sign In"}
        </button>
        <OAuth />
        </div>
      </form>
      <div className="mt-6 flex gap-5 m-auto max-w-xl">
        <p>Don't have an account?</p>
        <Link className="text-blue-900 hover:underline ease-in" to={"/Signup"}>
          Sign Up
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5 max-w-xl m-auto">{error}</p>}
    </div>
  );
};

export default Signin;
