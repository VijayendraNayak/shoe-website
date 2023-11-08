import React from "react";
import { Link } from "react-router-dom";
import{ MdLocationOn} from "react-icons/md";
const Listingitem = ({ listing }) => {
  return (
    <div className="shadow-md hover:shadow-lg bg-white transition-shadow overflow-hidden w-[240px] rounded-lg">
      <Link to={`/listing/${listing._id}`}>
        {/* {console.log(listing.imageUrls[0])} */}
        <img
          src={listing.imageUrls[0]}
          alt="cover image"
          className="md:h-[140px] sm:h-[100px] object-cover w-full hover:scale-105 transition-scale duration-300"
        />
        <div className="flex flex-col gap-2 p-3">
          <div className="font-semibold truncate">{listing.name}</div>
          <div className="flex items-center gap-2">
            <MdLocationOn className="w-4 h-4 text-green-400" />
            <p className="truncate w-full">{listing.address}</p>
          </div>
          <div className="text-sm line-clamp-2">{listing.description}</div>
          <div> ${listing.discountPrice?listing.discountPrice:listing.regularPrice}</div>
          <div className="flex gap-2">
            <div className="text-sm">{listing.bedrooms} beds</div>
            <div className="text-sm">{listing.bathrooms} bathrooms</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Listingitem;
