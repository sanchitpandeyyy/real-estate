import React from "react";
import Signin from "./Signin";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="mx-10 ">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form
        action=""
        className="border px-8 py-10 m-auto max-w-xl  rounded-lg  shadow-md flex flex-col gap-y-8"
      >
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button class=" w-fit m-auto relative inline-flex items-center justify-start px-8 py-3 overflow-hidden font-medium transition-all bg-white rounded-md hover:bg-white group border-2">
          <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-1000 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span class="relative w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white text-center">
            Sign Up
          </span>
        </button>
      </form>
      <div className="mt-6 flex gap-5 m-auto max-w-xl">
        <p>Have an account?</p>
        <Link className="text-blue-900 hover:underline ease-in" to={"/Signin"}>
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
