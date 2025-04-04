import React from "react";
import { Link } from "react-router-dom";
import InstagramLogo from "../../../assets/logo/instagram.png";
import SearchLogo from "../../../assets/navlogo/search.png";
import MessageLogo from "../../../assets/navlogo/message.png";

function TopNav() {
  return (
    <>
      <div className="w-full h-auto mb-5 lg:hidden md:hidden sm:block block">
        <div className="w-full h-auto flex items-center justify-between">
          <Link to="/">
            <img
              src={InstagramLogo}
              alt="instagram logo"
              className="w-32 h-auto object-contain"
            />
          </Link>
          <div className="flex items-center gap-x-4 pe-2">
            <Link to="/">
              <img src={SearchLogo} alt="search logo" className="w-8 h-8" />
            </Link>
            <Link to="/" className="relative">
              <img src={MessageLogo} alt="message logo" className="w-8 h-8" />
              <div className="absolute -right-2 -top-2 bg-red-600 text-base text-white rounded-full w-5 h-5 flex items-center justifiy-center">
                +9
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopNav;
