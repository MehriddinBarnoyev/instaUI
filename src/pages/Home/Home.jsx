import React from "react";
import { Routes, Route } from "react-router-dom";
import LargeNav from "../../components/Header/LargeNav/LargeNav";
import MobileNav from "../../components/Header/MobileNav/MobileNav";
import Feed from "./Feed/Feed";
import Main from "../Profile/Main";

function Home() {
  return (
    <>
      <div className=" w-full h-auto flex items-start justify-between lg:gap-x-32 md:gap-x-16 sm:gap-x-8 gap-x-4 relative">
        {/* Sidebar section */}
        <div className="bg-blue-300">
          <div className="lg:w-[16%] md:w-[17%] sm:w-none w-none h-[100vh] pt-10 px-3 pr-0 border-r  border-r-[#333333] fixed top-0 left-0 lg:block md:block sm:hidden hidden">
            <LargeNav />
          </div>
        </div>
        {/* Bottom Navbar dor small screen */}
        <div className="w-full h-auto py-1 px-3 border-t border-t-[#1d1d1d] fixed bottom-0 left-0 lg:hidden md:hidden sm:block block bg-black z-50">
          <MobileNav />
        </div>
        {/* Feed and profile routing section */}
        <Routes>
          <Route exact path="/" element={<Feed />} />
          {/* Profile section */}
          <Route exact path="/profile" element={<Main />} />
          
        </Routes>
      </div>
    </>
  );
}

export default Home;
