import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signinSuccess(data))
      navigate('/');
    } catch (error) {
      console.log("could not sign in", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className=" text-white px-3 sm:px-8 py-3 sm:py-4 sm:w-fit m-auto rounded-md bg-red-700 hover:bg-red-500 text-xs sm:text-[15px]"
    >
      Continue With Google
    </button>
  );
}
