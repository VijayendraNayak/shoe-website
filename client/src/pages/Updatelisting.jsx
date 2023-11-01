import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React from "react";
import { useState, useEffect } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const CreateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [imageuploaderror, setImageuploaderror] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const [formdata, setFormdata] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  useEffect(() => {
    const fetchlisting = async () => {
      const id = await params.id;
      await fetch(`/api/listing/get/${id}`).then(async (data) => {
        const res = await data.json();
        if (res.success === false) {
          console.log(res.message);
        }
        setFormdata(res);
      });
    };
    fetchlisting();
  }, []);

  const handleimagesubmit = () => {
    setUploading(true);
    if (files.length > 0 && files.length + formdata.imageUrls.length < 7) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storefiles(files[i]));
      }
      Promise.all(promises)
        .then((Urls) => {
          setFormdata({
            ...formdata,
            imageUrls: formdata.imageUrls.concat(Urls),
          });
          setUploading(false);
          setImageuploaderror(false);
        })
        .catch((error) => {
          setImageuploaderror(
            "Image upload error each file should be less than 2mb"
          );
          setUploading(false);
        });
    } else {
      setImageuploaderror("Only six images can be uploaded");
      setUploading(false);
    }
  };

  const storefiles = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageref = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageref, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress} done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((Downloadurl) => {
            resolve(Downloadurl);
          });
        }
      );
    });
  };
  const handledeleteimage = (index) => {
    setFormdata({
      ...formdata,
      imageUrls: formdata.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleonchange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormdata({ ...formdata, type: e.target.id });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "offer" ||
      e.target.id === "furnished"
    ) {
      setFormdata({ ...formdata, [e.target.id]: e.target.checked });
    }
    if (
      e.target.type === "text" ||
      e.target.type === "textarea" ||
      e.target.type === "number"
    ) {
      setFormdata({ ...formdata, [e.target.id]: e.target.value });
    }
  };
  const submithandler = async (e) => {
    e.preventDefault();
    if (+formdata.regularPrice < +formdata.discountPrice) {
      return setError("Discount price should be less than the regular price");
    }
    if (formdata.imageUrls.length < 1) {
      // Check the length of imageUrls array
      return setError("There should be at least one image");
    }
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(`/api/listing/update/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formdata,
          userRef: currentUser._id,
        }),
      });

      const data = await response.json(); // Parse the response JSON
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      } else {
        // Check for existence of _id in the response
        if (data._id) {
          navigate(`/listing/${data._id}`);
        } else {
          setError("Listing creation failed.");
        }
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="gap-4">
      <h1 className="text-center mt-6 font-semibold text-4xl">
        Update a Listing
      </h1>
      <form
        onSubmit={submithandler}
        className="flex flex-col sm:flex-row m-auto p-3 max-w-6xl mt-6 border border-orange-100"
      >
        <div className="flex-1 flex flex-col px-10 gap-4">
          <input
            type="text"
            id="name"
            maxLength="62"
            minLength="10"
            placeholder="Name"
            className=" border border-orange-300 rounded-lg p-3 required"
            onChange={handleonchange}
            value={formdata.name}
          />
          <textarea
            type="textarea"
            id="description"
            placeholder="Description"
            className=" border border-orange-300 rounded-lg p-3 required"
            onChange={handleonchange}
            value={formdata.description}
          />
          <input
            type="text"
            id="address"
            maxLength="62"
            minLength="10"
            placeholder="Adress"
            className=" border border-orange-300 rounded-lg p-3 required"
            onChange={handleonchange}
            value={formdata.address}
          />
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="sale"
                onChange={handleonchange}
                checked={formdata.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="rent"
                onChange={handleonchange}
                checked={formdata.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="parking"
                onChange={handleonchange}
                checked={formdata.parking === true}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="furnished"
                onChange={handleonchange}
                checked={formdata.furnished === true}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="offer"
                onChange={handleonchange}
                checked={formdata.offer === true}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className=" flex flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bathrooms"
                className="p-3 border border-orange-200 w-24"
                onChange={handleonchange}
                value={formdata.bathrooms}
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bedrooms"
                className="p-3 border border-orange-200 w-24"
                required
                onChange={handleonchange}
                value={formdata.bedrooms}
              />
              <p>Bedrooms</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="1000000"
                className="p-3 border border-orange-200 w-24"
                required
                onChange={handleonchange}
                value={formdata.regularPrice}
              />
              <div className="flex flex-col">
                <p>Regular price</p>
                {formdata.type !== "sale" && (
                  <span className="text-sm ${}"> ($ / month)</span>
                )}
              </div>
            </div>
            {formdata.offer && (
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="1000000"
                  className="p-3 border border-orange-200 w-24"
                  required
                  onChange={handleonchange}
                  value={formdata.discountPrice}
                />
                <div className="flex flex-col">
                  <p>Discount price</p>
                  {formdata.type !== "sale" && (
                    <span className="text-sm ${}"> ($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4 px-3">
          <div className="flex gap-4 flex-col">
            <p className="font-medium">
              Image:maximum 6, 1st image will be the cover
            </p>
            <div className="flex gap-4">
              <input
                type="file"
                id="file"
                accept="image/*"
                multiple
                className="border border-orange-300 p-3"
                onChange={(e) => setFiles(e.target.files)}
              />
              <button
                type="button"
                onClick={handleimagesubmit}
                disabled={uploading}
                className="bg-green-500 px-8 text-white uppercase rounded-lg hover:opacity-70"
              >
                {uploading ? "UPLOADING..." : "UPLOAD"}
              </button>
            </div>
            <p className="text-red-500 text-sm">
              {imageuploaderror && imageuploaderror}
            </p>
            {formdata.imageUrls.length > 0 &&
              formdata.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between border border-orange-300 p-3 gap-4"
                >
                  <img
                    src={url}
                    alt="listing image"
                    className=" w-24 h-20 rounded-lg"
                  />
                  <button
                    type="button"
                    className=" text-red-500 uppercase hover:opacity-75 p-3"
                    onClick={() => handledeleteimage(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button
              disabled={loading || uploading}
              className=" uppercase rounded-lg p-3 bg-orange-500 text-white text-center hover:opacity-80"
            >
              {loading ? "updating..." : "Update Listing"}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
