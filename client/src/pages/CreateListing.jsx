import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React from "react";
import { useState } from "react";
import { app } from "../firebase";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [imageuploaderror, setImageuploaderror] = useState(false);
  const [formdata, setFormdata] = useState({
    imageUrls: [],
  });
  console.log(formdata);
  const handleimagesubmit = () => {
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
          setImageuploaderror(false);
        })
        .catch((error) => {
          setImageuploaderror(
            "Image upload error each file should be less than 2mb"
          );
        });
    } else {
      setImageuploaderror("Only six images can be uploaded");
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
  return (
    <main className="gap-4">
      <h1 className="text-center mt-6 font-semibold text-4xl">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row m-auto p-3 max-w-6xl mt-6 border border-orange-100">
        <div className="flex-1 flex flex-col px-10 gap-4">
          <input
            type="text"
            id="name"
            maxLength="62"
            minLength="10"
            placeholder="Name"
            className=" border border-orange-300 rounded-lg p-3 required"
          />
          <textarea
            type="text"
            id="textarea"
            placeholder="Description"
            className=" border border-orange-300 rounded-lg p-3 required"
          />
          <input
            type="text"
            id="adress"
            maxLength="62"
            minLength="10"
            placeholder="Adress"
            className=" border border-orange-300 rounded-lg p-3 required"
          />
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2 ">
              <input type="checkbox" id="sale" required />
              <span>Sell</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" id="rent" required />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" id="parking" required />
              <span>Parking</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" id="furnished" required />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" id="offer" required />
              <span>Offer</span>
            </div>
          </div>
          <div className=" flex flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bath"
                className="p-3 border border-orange-200 w-24"
                required
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bed"
                className="p-3 border border-orange-200 w-24"
                required
              />
              <p>Bedrooms</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="regp"
                className="p-3 border border-orange-200 w-24"
                required
              />
              <div className="flex flex-col">
                <p>Regular price</p>
                <span className="text-sm"> ($ / month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="disp"
                className="p-3 border border-orange-200 w-24"
                required
              />
              <div className="flex flex-col">
                <p>Discount price</p>
                <span className="text-sm">($ / month)</span>
              </div>
            </div>
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
                required
                id="file"
                accept="image/*"
                multiple
                className="border border-orange-300 p-3"
                onChange={(e) => setFiles(e.target.files)}
              />
              <button
                type="button"
                onClick={handleimagesubmit}
                className="bg-green-500 px-8 text-white uppercase rounded-lg hover:opacity-70"
              >
                Upload
              </button>
            </div>
            <p className="text-red-500 text-sm">
              {imageuploaderror && imageuploaderror}
            </p>
            {formdata.imageUrls.length > 0 &&
              formdata.imageUrls.map((url) => {
                <div className="flex gap-4">
                  <img
                    src={url}
                    alt="listing image"
                    className="border border-orange-300 w-20 h-20 rounded-lg"
                  />
                  <button
                    type="button"
                    className=" text-red-500 uppercase hover:opacity-75 p-3 border border-red-100"
                  >
                    Delete
                  </button>
                </div>;
              })}
            <button className=" uppercase rounded-lg p-3 bg-orange-500 text-white text-center hover:opacity-80">
              Create listing
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
