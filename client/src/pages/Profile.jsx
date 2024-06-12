import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BiSolidEdit } from "react-icons/bi";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePer, setFilePer] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);

  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePer(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className="flex flex-col w-screen justify-center items-center mt-10">
      <h1 className="mb-10 font-bold text-3xl text-sky-700"> Profile</h1>
      <form action="">
        <div className="bg-white max-w-lg p-8 flex flex-col items-center hover:shadow-xl border-2 shadow-sm rounded-md">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            id=""
            ref={fileRef}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <img
            src={formData.avatar || currentUser.avatar}
            alt=""
            className="w-36 h-36 object-cover hover:cursor-pointer rounded-full"
            onClick={() => fileRef.current.click()}
          />

          <p>
            {fileUploadError ? (
              <span className="text-red-700">Error Image Upload (Image must be less than 2 MB)</span>
            ) : filePer > 0 && filePer < 100 ? (
              <span className="text-sky-700">{`Uploading ${filePer}%`}</span>
            ) : filePer === 100 ? (
              <span className="text-sky-700">Image Uploaded Successfully</span>
            ) : (
              ""
            )}
          </p>

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
        <span className="bg-red-700 text-white p-3 rounded-lg hover:bg-red-500 cursor-pointer">
          Delete Account
        </span>
        <span className="bg-sky-700 text-white p-3 rounded-lg hover:opacity-80 cursor-pointer">
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
