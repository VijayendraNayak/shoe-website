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
import { Link, useNavigate } from "react-router-dom";
import { app } from "../firebase";
import {
  updateSuccess,
  updateStart,
  updateFailure,
  deleteFailure,
  deleteStart,
  deleteSuccess,
  signoutSuccess,
  signoutFailure,
  signoutStart,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

export default function Profile() {
  const handleOnchange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [err, setErr] = useState(false);
  const [formdata, setFormdata] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileref = useRef(null);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [updatedSuccess, setUpdatedSuccess] = useState(false);

  // console.log(file);
  // console.log(filePerc);
  // console.log(formdata);
  useEffect(() => {
    if (file) {
      handlefileupload(file);
    }
  }, [file]);
  const handleonSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart());

    await fetch(`api/user/update/${currentUser._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.success === true) {
          dispatch(updateSuccess(res));
          // dispatch("/sign-up");
          setUpdatedSuccess(true);
        } else {
          dispatch(updateFailure(res.message));
        }
      })
      .catch((error) => {
        dispatch(updateFailure(error.message));
      });
  };
  const handledeleteuser = async () => {
    try {
      dispatch(deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteFailure(data.message));
        return;
      }
      dispatch(deleteSuccess(data));
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };

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
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((DownloadURL) => {
          setFormdata({ ...formdata, photo: DownloadURL });
        });
      }
    );
  };
  const handlesignout = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutFailure(data.message));
        return;
      }
      dispatch(signoutSuccess(data));
    } catch (error) {
      dispatch(signoutFailure(error.message));
    }
  };
//   await fetch(config.serverUrl + '/user/logout', {
//     method: 'GET',
//     credentials: 'include'
// })
// .then(() => router.push('/login'))
// .catch((err) => console.log('internal server error\n', err) )
  return (
    <div className="p-7 max-w-lg mx-auto">
      <form onSubmit={handleonSubmit} className="flex flex-col gap-4">
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
          onChange={handleOnchange}
          defaultValue={currentUser.username}
        />
        <input
          className="p-3 rounded-lg bg-orange-50"
          placeholder="email"
          type="email"
          id="email"
          onChange={handleOnchange}
          defaultValue={currentUser.email}
        />
        <input
          className="p-3 rounded-lg bg-orange-50"
          placeholder="password"
          type="password"
          id="password"
          onChange={handleOnchange}
        />
        <button
          disabled={loading}
          className="p-3 rounded-lg bg-orange-500 text-white"
        >
          {loading ? "LOADING" : "UPDATE"}
        </button>

        <Link
          to="/createlisting"
          className="p-3 text-white bg-green-500 rounded-lg text-center hover:opacity-80 uppercase"
        >
          Create listing
        </Link>
      </form>

      <div className="flex justify-between mt-4">
        <span
          onClick={handledeleteuser}
          className="text-red-500 cursor-pointer hover:text-red-700"
        >
          Delete account
        </span>
        <span
          onClick={handlesignout}
          className="text-red-500 cursor-pointer hover:text-red-700"
        >
          SignOut
        </span>
      </div>
      <p className="text-red-500 mt-4">{error ? error : ""}</p>
      <p className="text-green-500 mt-4">
        {updatedSuccess ? "User updated successfully" : " "}
      </p>
    </div>
  );
}
