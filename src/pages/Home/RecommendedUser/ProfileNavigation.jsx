import React from "react";
import { Link } from "react-router-dom";

const ProfileNavigation = () => {
  return (
    <>
      <div className="w-full h-auto flex items-center justify-between">
        <Link className="w-full h-auto flex items-center gap-x-2">
          <img
            src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500"
            alt=""
            className="w-16 h-16 rounded-full"
          />
          <div className="flex items-start gap-y-0 flex-col">
            <h6 className="text-lg text-medium font-medium mb-0 text-white">
              music_lover
            </h6>
          </div>
        </Link>
        <Link
          to="/"
          className="text-[0.855rem] text-blue-500 hover:text-gray-200"
        >
          Switch
        </Link>
      </div>
    </>
  );
};

export default ProfileNavigation;
