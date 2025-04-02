import React, { useEffect, useState } from "react";
import { fetchAllPosts } from "./FeedData"; // Agar FeedData.js ishlatilsa, shu yerda qoldiring
import { Link } from "react-router-dom";
import Ellipse from "../../../Icons/Ellipse/Ellipse";
import Like from "../../../Icons/Like/Like";
import Comment from "../../../Icons/Comment/Comment";
import Share from "../../../Icons/Share/Share";
import Save from "../../../Icons/Save/Save";
import Emoji from "../../../Icons/Emoji/Emoji";

const FeedCard = () => {
  const [allPosts, setAllPosts] = useState([]);
  const BASE_URL = "http://localhost:5000"; // Server manzili

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await fetchAllPosts(); // Backenddan postlarni olish
        console.log(posts);
        setAllPosts(posts);
      } catch (error) {
        console.error("Postlarni yuklashda xatolik:", error);
      }
    };
    loadPosts();
  }, []);

  // Rasm URLni to'g'ri shakllantirish funksiyasi
  const getImageUrl = (imgPath) => {
    if (!imgPath) return "/placeholder.svg"; // Agar rasm yo'q bo'lsa
    // Agar URL http yoki https bilan boshlansa, uni o'zgartirmaymiz
    if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) {
      return imgPath;
    }
    // Aks holda, lokal yo'l deb hisoblaymiz va BASE_URL qo'shamiz
    return `${BASE_URL}${imgPath}`;
  };

  return (
    <>
      {allPosts.map((feed) => (
        <div key={feed.id} className="w-full h-auto mb-6">
          {/* Profil rasmi va foydalanuvchi nomi, vaqt */}
          <div className="w-full h-auto flex items-center justify-between mb-2">
            <div className="flex items-center gap-x-2">
              <Link
                to="/"
                className="flex items-center justify-center flex-col flex-shrink-0"
              >
                <div className="w-10 h-10 rounded-full object-cover p-[1.5px] bg-gradient-to-r from-[#f02aa6] to-[#ff6f48]">
                  <img
                    src={getImageUrl(feed.profileImg)} // Profil rasm uchun ham tekshiriladi
                    alt={feed.username}
                    className="rounded-full w-full h-full object-cover p-[2.5px] bg-black"
                  />
                </div>
              </Link>
              <div className="flex items-center gap-x-2">
                <p className="text-white text-lg font-medium">{feed.username}</p>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <p className="text-white text-lg font-normal">{feed.time}</p>
              </div>
            </div>
            <Ellipse />
          </div>
          {/* Post rasmi */}
          <div className="w-full lg:mg-h-[75%vh] md:max-h-[70%vh] sm:max-h-[65%vh] max-h-[50%vh] lg:-h-[70%vh] md:h-[60%vh] sm:-h-[50%vh] h-[50%vh] lg:min-h-[50%vh] md:min-h-[65%vh] sm:min-h-[50%vh] min-h-[45%vh] border-gray-300 rounded-overflow-hidden mb-3">
            <img
              src={getImageUrl(feed.postImg)} // Post rasm uchun tekshiriladi
              alt={feed.caption}
              className="w-full h-full rounded object-center"
            />
          </div>
          {/* Foydalanuvchi harakatlari (like, comment, share & save) */}
          <div className="w-full h-auto flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <Like id={feed.id} />
              <Comment />
              <Share />
            </div>
            <Save />
          </div>
          {/* Like soni */}
          <Link
            to="/"
            className="w-full h-auto flex items-center gap-x-2 text-xl text-gray-200 font-medium my-2"
          >
            <div className="flex items-center">
              <img
                src="https://ui-avatars.com/api/?name=Friend1"
                alt="Mutual friend 1"
                className="w-5 h-5 rounded-full object-full p-[1.5px] bg-black"
              />
              <img
                src="https://ui-avatars.com/api/?name=Friend2"
                alt="Mutual friend 2"
                className="w-5 h-5 rounded-full object-full p-[1.5px] bg-black -ml-3"
              />
            </div>
            {feed.likeCount} likes
          </Link>
          {/* Izoh qismi */}
          <div className="w-full h-auto flex items-center gap-x-1">
            <div className="w-full h-auto text-base text-gray-200">
              <Link to="/" className="text-white font-medium text-xl me-1">
                {feed.username}
              </Link>
              {feed.caption}
              <Link to="/" className="text-gray-400 text-base ms-1">
                ko'proq
              </Link>
            </div>
          </div>
          {/* Izohlar soni */}
          <Link to="/" className="text-gray-400 font-normal my-2">
            Barcha {feed.commentCount} izohlarni ko'rish
          </Link>
          {/* Izoh yozish */}
          <div className="w-[100%] h-auto flex items-center justify-between border-b border-b-gray-500">
            <input
              type="text"
              className="w h-auto bg-transparent border-none outline-none focus:outline-none text-base text-gray-400 py-3"
              placeholder="Izoh qo'shish... "
            />
            <Emoji />
          </div>
        </div>
      ))}
    </>
  );
};

export default FeedCard;