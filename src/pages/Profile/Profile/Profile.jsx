import React from "react";
import { Link } from "react-router-dom";
import Settings from "../../../Icons/Settings/Settings";
import LinkIcon from "../../../Icons/LinkIcon/LinkIcon";
import highlightData from "../HighlightsData";
// import Post from "../Post";

const Profile = () => {
  return (
    <>
      <div className="lg:w-[88%] md:w-[88%] sm:w-full w-full h-auto lg-block md:block sm:hidden hidden">
        {/* Info section */}
        <div className="w-full h-auto flex items-center lg:gap-x-20 md:gap-x-16 sm:gap-x-12 gap-x-8 justify-center mb-10">
          <img
            src="https://images.unsplash.com/photo-1520986606214-8b456906c813?w=500"
            alt="profile img"
            className="rounded-full lg:w-44 md:w-44 sm:w-36 w-32 lg:h-44 md:h-44 sm:h-36 h-36 object-cover"
          />
          <div className="flex items-start flex-col">
            <div className="flex items-center gap-x-5 mb-4">
              <Link to="/profile" className="text-lg text-gray-200 font-normal">
                username
              </Link>
              <div className="flex items-center gap-x-2">
                <button className="bg-[#1d1d1d] rounded-lg px-4 py-1.5 text-base text-white font-normal hover:bg-[#2f2f2f] ease-out duration-150">
                  Edit Profile
                </button>
                <button className="bg-[#1d1d1d] rounded-lg px-4 py-1.5 text-base text-white font-normal hover:bg-[#2f2f2f] ease-out duration-150">
                  View archive
                </button>
                <Settings />
              </div>
            </div>
            {/* post, follower, following */}
            <div className="flex items-center gap-x-6 mb-4">
              <h6 className="text-lg text-gray-100 font-normal">10 posts</h6>
              <Link to="/" className="text-lg text-gray-100 font-normal">
                627k followers
              </Link>
              <Link to="/" className="text-lg text-gray-100 font-normal">
                14 following
              </Link>
            </div>
            {/* full name */}
            <p className="text-lg text-gray-100 font-medium">Abdufattokhov_s</p>
            {/* bio */}
            <p className="text-lg text-gray-100 font-normal">
              I do not have any info to write <br />
              Lorem, ipsum. <br />
              Lorem ipsum dolor sit amet.
            </p>
            {/* Link */}
            <p className="text-lg text-gray-100 font-normal flex items-center gap-x-2">
              <LinkIcon />
              <Link to="/" className="hover:underline font-medium text-blue-50">
                www.lorem.com
              </Link>
            </p>
          </div>
        </div>
        {/* Highlights section */}
        <div className="w-full h-auto flex items-center  gap-x-9 mb-10">
          <div className="max-w-61vw w-full h-auto flex justify-center gap-x-3.5 overflow-x-scroll">
            {highlightData.map((data) => (
              <Link
                to="/"
                key={data.id}
                className="flex justify-between items-center flex-col flex-shrink-0"
              >
                <div className="w-28 h-28 rounded-full object-cover p-[2px] bg-gradient-to-r from-[#1d1d1d] to-[#1d1d1d]">
                  <img
                    src={data.img}
                    alt={data.name}
                    className="w-full h-full rounded-full object-cover p-[2.5px] bg-black"
                  ></img>
                </div>
                <p className="text-white text-sm mt-1">{data.name}</p>
              </Link>
            ))}
          </div>
        </div>
        {/* Posts */}
        <Post />
      </div>
    </>
  );
};

export default Profile;
