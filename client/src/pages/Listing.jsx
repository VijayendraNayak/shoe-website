import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null); // Initialize listing as null, not an array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchlisting = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/listing/get/${params.id}`);
        const data = await response.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setLoading(false);
        setError(false);
        setListing(data);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchlisting();
  }, [params.id]);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls && listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[300px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
};

export default Listing;
