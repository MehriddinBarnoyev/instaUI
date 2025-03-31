import React from "react";
import { Link } from "react-router-dom";
import storiesData from "./StoriesDate";
import TextEllipse from "./TextEllipse/TextEllipse";

function Stories() {
  return (
    <>
      <div className="w-full h-auto flex overflow-x-auto px-3">
        <div className="lg:max-w-[41vw] md:max-w-[70vw] sm:max-w-full max-w-full w-full h-auto flex items-center gap-x-5">
          <Link
            to="/"
            key="1"
            className="flex items-center justify-center flex-col flex-shrink-0"
          >
            <div className="w-20 h-20 rounded-full object-cover p-[2px] bg-green-600">
              <img
                src="https://loremflickr.com/200/200?random=1"
                alt="story img"
                className="rounded-full w-full h-full object-cover p-[2.5px] bg-black"
              />
            </div>
            <TextEllipse username="beautyofnature" maxLength={8} />
          </Link>
          {storiesData.map((story) => (
            <Link
              to="/"
              key={story.id}
              className="flex items-center justify-center flex-col flex-shrink-0"
            >
              <div className="w-20 h-20 rounded-full object-cover p-[2px] bg-gradient-to-r from-[#f02aa6] to-[#ff6f48]">
                <img
                  src={story.imageUrl}
                  alt="story img"
                  className="rounded-full w-full h-full object-cover p-[2.5px] bg-black"
                />
              </div>
              <TextEllipse username={story.username} maxLength={8} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Stories;
