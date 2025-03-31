import React from "react";
import { Link } from "react-router-dom";
import ProfileNavigation from "./ProfileNavigation";
import recommendUserData from "./RecommendedUserData.jsx";

const RecommendedUser = () => {
  const linkData = [
    { id: 1, link: "/", title: "About" },
    { id: 2, link: "/", title: "Help" },
    { id: 3, link: "/", title: "Press" },
    { id: 4, link: "/", title: "API" },
    { id: 5, link: "/", title: "Jobs" },
    { id: 6, link: "/", title: "Privacy" },
    { id: 7, link: "/", title: "Terms and Imprint" },
    { id: 8, link: "/", title: "Locations" },
    { id: 9, link: "/", title: "Language" },
    { id: 10, link: "/", title: "Meta Verified" },
    { id: 11, link: "/", title: "Cancel contracts here" },
  ];

  return (
    <>
      <div className="w-full h-auto py-3">
        {/* Profile Navigation */}
        <ProfileNavigation />
        {/* Suggested user */}
        <div className="w-full h-auto my-8">
          <div className="w-full h-auto flex items-center justify-between mb-4">
            <h6 className="text-base text-gray-400 font-medium">
              Suggested for you
            </h6>
            <Link
              to="/"
              className="text-base font-semibold text-gray-300 hover:text-gray-600"
            >
              See All
            </Link>
          </div>
          {/* All users */}
          {recommendUserData.map((user) => (
            <div
              key={user.id}
              className="w-full h-auto flex items-center justify-between mb-4"
            >
              <Link
                to="/profile"
                className="w-full h-auto flex items-center gap-x-2"
              >
                <img
                  src={user.profileImg}
                  alt={user.username}
                  className="w-16 h-16 object-covered rounded-full"
                />
                <div className="flex items-center gap-y-0 flex-col">
                  <p className="text-[1.1rem] text-white font-medium mb-0">
                    {user.username}
                  </p>
                  <h6 className="text-[11px] text-gray-500 text-normal">
                    Suggested for you
                  </h6>
                </div>
              </Link>
              <Link
                to="/"
                className="text-[0.855rem] text-blue-500 hover:text-gray-200"
              >
                {user.follow}
              </Link>
            </div>
          ))}
        </div>
        {/* footer links */}
        <div className="w-full h-auto">
          <div className="w-full h-auto flex items-center gap-x-[4px] flex-wrap mb-3">
            {linkData.map((data) => (
              <div
                key={data.id}
                className="w-fit h-auto flex items-center gap-x-[4px]"
              >
                <Link
                  to={data.link}
                  className="text-[0.9rem] font-normal text-[#5b5b5b] hover:underline"
                >
                  {data.title}
                </Link>
                <div className="w-[1.5px] h-[1.5px] bg-[#5b5b5b] rounded-full"></div>
              </div>
            ))}
          </div>
          <div className="text-base text-normal text-[#5b5b5b]">
            &copy; 2025 INSTAGRAM FOR METTA
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendedUser;
