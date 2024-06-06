import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        <button
          disabled={loading}
          class=" w-fit m-auto relative inline-flex items-center justify-start px-8 py-3 overflow-hidden font-medium transition-all bg-white rounded-md hover:bg-white group border-2"
        >
          <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-1000 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span class="relative w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white text-center">
            {loading ? "LOADING..." : "Sign Up"}
          </span>
        </button>
      </form>
      <div className="mt-6 flex gap-5 m-auto max-w-xl">
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
