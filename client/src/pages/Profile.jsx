import React from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [err, setErr] = useState(false);
  const [formdata, setFormdata] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const fileref = useRef(null);
  console.log(file);
  console.log(filePerc);
  console.log(formdata);
  useEffect(() => {
    if (file) {
      handlefileupload(file);
    }
  }, [file]);
  const handlefileupload = (file) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageref = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageref, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setErr(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((DownloadURL) => {
          setFormdata({ ...formdata, photo: DownloadURL });
        });
      }
    );
  };
  return (
    <div className="p-7 max-w-lg mx-auto">
      <form className="flex flex-col gap-4">
        <input
          hidden
          active="image/.*"
          type="file"
          ref={fileref}
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <img
          className="rounded-full w-24 h-24 self-center object-cover cursor-pointer mt-2"
          src={formdata.photo || currentUser.photo}
          alt="profileimage"
          onClick={() => {
            fileref.current.click();
          }}
        />
        <p className="self-center">
          {err ? (
            <span>
              <p className="text-red-700">
                Error upload Image(image should be less than 2 mb)
              </p>
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-orange-500">
              <p>Uploaing image {`${filePerc}`}% done</p>
            </span>
          ) : filePerc === 100 ? (
            <span className="text-green-500">Image uploaded successfully</span>
          ) : (
            " "
          )}
        </p>
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
