import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      console.log(data);
      setError(null);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="mx-10 ">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        action=""
        className="border px-8 py-10 m-auto max-w-xl rounded-lg  shadow-md flex flex-col gap-y-8 bg-white"
      >
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg "
          id="username"
          onChange={handleChange}
        />
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
        <div className="flex flex-col sm:flex-row h-20 gap-2 pb-3">
        <button
          disabled={loading}
          className=" text-white px-3 sm:px-8 py-3 w-[10rem] sm:w-[15rem] m-auto rounded-md hover:bg-cyan-600 bg-sky-700 sm:py-4  text-xs sm:text-[15px]">
              
            {loading ? "LOADING..." : "Sign Up"}
        </button>
        <OAuth />
        </div>
      </form>
      <div className="mt-6 flex gap-5 m-auto max-w-xl ">
        <p>Have an account?</p>
        <Link className="text-blue-900 hover:underline ease-in" to={"/Signin"}>
          Sign In
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignUp;
