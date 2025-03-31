import React from "react";
import TopNav from "../../../components/Header/TopNav/TopNav";
import Stories from "../Stories/Stories";
import FeedCard from "./FeedCard";
import RecommendedUser from "../RecommendedUser/RecommendedUser";

const Feed = () => {
  return (
    <>
      <div className="w-full max-w-[1200px] h-screen flex flex-col justify-start items-center lg:pl-60 md:pl-10 lg:py-4 md:py-4 sm:py-3 py-2 mx-auto">
        {/* Feed + Story section */}
        <div className="w-full flex items-start gap-x-10">
          <div className="lg:w-[60%] md:w-full sm:w-full w-full h-auto relative">
            {/* Top Navbar (only visible on small screen) */}
            <TopNav />
            {/* Stories section */}
            <Stories />
            {/* Feed section */}
            <div className="w-full h-auto flex items-center justify-center mt-6">
              <div className="lg:w-[85%] md:w-[90%] sm:w-[95%] w-[95%] h-auto">
                <FeedCard />
              </div>
            </div>
          </div>
          {/* Recommended user section */}
          <div className="lg:w-[25%] md:w-[30%] sm:hidden hidden md:block">
            <RecommendedUser />
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;

