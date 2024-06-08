import React from "react";
import { useSelector } from "react-redux";
import { BiSolidEdit } from "react-icons/bi";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col w-screen justify-center items-center mt-10">
      <h1 className="mb-10 font-bold text-3xl text-sky-700"> Profile</h1>
      <form action="">
        <div className="bg-white max-w-lg p-8 flex flex-col items-center hover:shadow-xl border-2 shadow-sm rounded-md">
          <img src={currentUser.avatar} alt="" className="w-36" />
          <div className="flex items-center justify-between font-semibold  w-full text-center gap-4 mt-3 ">
            <input
              placeholder={currentUser.username}
              className="font-semibold px-4 py-2 rounded-lg bg-[#f1f1f1] w-full"
              id="username"
            />

            <button className="w-fit">
              <BiSolidEdit className=" h-10 w-10 bg-[#f1f1f1] text-sky-900 rounded-full p-2 hover:opacity-70 disabled:opacity:60" />
            </button>
          </div>
          <div className="flex items-center justify-between font-semibold  w-full text-center gap-4 mt-3 ">
            <input
              placeholder={currentUser.email}
              className="font-semibold px-4 py-2 rounded-lg bg-[#f1f1f1] w-full"
              id="email"
            />

            <button className="w-fit">
              <BiSolidEdit className="h-10 w-10 bg-[#f1f1f1] text-sky-900 rounded-full p-2 hover:opacity-70 disabled:opacity:60" />
            </button>
          </div>

          <div className="flex items-center justify-between font-semibold  w-full text-center gap-4 mt-3 ">
            <input
              placeholder={currentUser.password}
              className="font-semibold px-4 py-2 rounded-lg bg-[#f1f1f1] w-full"
              id="password"
            />

            <button className="w-fit">
              <BiSolidEdit className="h-10 w-10 bg-[#f1f1f1] text-sky-900 rounded-full p-2 hover:opacity-70 disabled:opacity:60" />
            </button>
          </div>
        </div>
      </form>

      <div className="flex justify-between max-w-lg gap-10 mt-5">
        <span className="bg-red-700 text-white p-3 rounded-lg hover:bg-red-500 cursor-pointer">Delete Account</span>
        <span className="bg-sky-700 text-white p-3 rounded-lg hover:opacity-80 cursor-pointer">Sign Out</span>
      </div>

    </div>
  );
};

export default Profile;
