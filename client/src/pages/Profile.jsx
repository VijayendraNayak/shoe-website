import React from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Link } from "react-router-dom";
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
  const params = useParams();
  const [updatedSuccess, setUpdatedSuccess] = useState(false);
  const [userlisting, setUserlisting] = useState([]);
  const [listingerror, setListingerror] = useState(false);

  useEffect(() => {
    const fetchlisting = async () => {
      const id =await params.id;
      console.log(id);
    };
    fetchlisting();
  }, []);

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
  const handleshowlisting = async () => {
    try {
      await fetch(`api/user/getlisting/${currentUser._id}`).then(
        async (data) => {
          const res = await data.json();
          if (res.success === false) {
            setListingerror(true);
            return;
          } else {
            setUserlisting(res);
            setListingerror(false);
          }
        }
      );
    } catch (error) {
      setListingerror(true);
    }
  };
  const handledeletelisting = async (listingid) => {
    try {
      await fetch(`/api/listing/delete/${listingid}`, {
        method: "DELETE",
      }).then(async (data) => {
        const res = await data.json();
        if (res.success === true) {
          setUserlisting((prev) =>
            prev.filter((listing) => listing._id !== listingid)
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

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
      <p className="text-green-500 mt-4">
        {updatedSuccess ? "User updated successfully" : " "}
      </p>
      <p className="text-red-500 mt-4">{err ? err : ""}</p>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleshowlisting}
          className="text-green-500 text-sm  "
        >
          Show listing
        </button>

        <p className="text-red-500 mt-4">{listingerror ? listingerror : ""}</p>
      </div>
      {userlisting && userlisting.length > 0 && (
        <div>
          <h1 className="text-center p-4 mt-4 font-semibold text-3xl">
            Your listings
          </h1>
          {userlisting.map((listing) => (
            <div
              key={listing._id}
              className="flex justify-between border border-orange-200 rounded-lg gap-4 text-center items-center p-3 m-4 "
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="image"
                  className="mt-3 w-20 h-12 border border-orange-200 object-contain"
                />
              </Link>
              <Link
                className=" font-semibold hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col">
                <button
                  onClick={() => handledeletelisting(listing._id)}
                  className="text-red-500 p-1 hover:opacity-70"
                >
                  Delete
                </button>
                <Link to={`/updatelisting/${listing._id}`}>
                  <button className="text-green-500 p-1 hover:opacity-70">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
