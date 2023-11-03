import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Contact = (props) => {
  const [landlord, setLandlord] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchlandlord = async () => {
      try {
        await fetch(`/api/user/${props.listing.userRef}`).then(async (data) => {
          const res = await data.json();
          if (res.success === false) {
            console.log(res.message);
          }
          setLandlord(res);
        });
      } catch (error) {
        console.log(res.message);
      }
    };
    fetchlandlord();
  }, [props.listing.userRef]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <p>
          contact <span className="font-semibold">{landlord.username}</span> for{" "}
          <span className="font-semibold">{props.listing.name}</span>
        </p>
        <textarea
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 border"
          placeholder="Enter your message here"
        ></textarea>
        <Link
          to={`mailto:${landlord.email}?subject=Regarding ${props.listing.name}&body=${message}`}
          className="bg-orange-500 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          target="_blank"
        >
          <span>Send Message</span>
        </Link>
      </div>
    </div>
  );
};

export default Contact;
