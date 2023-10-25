import React from "react";

const CreateListing = () => {
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
              />
              <button className="bg-green-500 px-8 text-white uppercase rounded-lg hover:opacity-70">
                Upload
              </button>
            </div>
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
