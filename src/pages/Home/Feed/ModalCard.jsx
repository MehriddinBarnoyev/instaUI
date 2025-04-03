import React, { useState, useEffect } from "react";

const ModalCard = ({ isOpen, onClose, post }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const BASE_URL = "http://localhost:5000";

  // Background skrollni o'chirish
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Komponent o'chirilganda (unmount) asl holatga qaytarish
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Postning izohlarini olish
  useEffect(() => {
    if (!post) return;

    const fetchComments = async () => {
      try {
        const response = await fetch(`${BASE_URL}/comments/${post.id}`);
        const data = await response.json();
        // Har bir izohga like sonini qo'shamiz (agar backenddan kelmagan bo'lsa, 0 deb taxmin qilamiz)
        const commentsWithLikes = data.map((comment) => ({
          ...comment,
          likes: comment.likes || 0,
          isLiked: false, // Foydalanuvchi like bosganligini saqlash uchun
        }));
        setComments(commentsWithLikes);
      } catch (error) {
        console.error("Izohlarni yuklashda xatolik:", error);
      }
    };
    fetchComments();
  }, [post]);

  // Yangi izoh qo'shish
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const userId = 1; // Haqiqiy foydalanuvchi ID'si bo'lishi kerak (masalan, auth orqali)
      const response = await fetch(`${BASE_URL}/comments/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: post.id,
          text: newComment,
        }),
      });
      const newCommentData = await response.json();
      setComments([
        ...comments,
        { ...newCommentData, likes: 0, isLiked: false },
      ]);
      setNewComment("");
    } catch (error) {
      console.error("Izoh qo'shishda xatolik:", error);
    }
  };

  // Izohga like bosish
  const handleLikeComment = async (commentId, index) => {
    try {
      // Backendga like so'rovini yuborish (taxminiy API endpoint)
      const response = await fetch(`${BASE_URL}/comments/${commentId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1, // Haqiqiy foydalanuvchi ID'si bo'lishi kerak
        }),
      });

      if (response.ok) {
        // Frontendda like holatini yangilash
        const updatedComments = [...comments];
        if (updatedComments[index].isLiked) {
          updatedComments[index].likes -= 1;
          updatedComments[index].isLiked = false;
        } else {
          updatedComments[index].likes += 1;
          updatedComments[index].isLiked = true;
        }
        setComments(updatedComments);
      }
    } catch (error) {
      console.error("Izohga like bosishda xatolik:", error);
    }
  };

  if (!isOpen || !post) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-black rounded-lg w-[900px] h-[600px] flex shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chap qism: Post rasmi */}
        <div className="w-1/2 h-full">
          <img
            src={post.postImg}
            alt="Post content"
            className="w-full h-full object-cover"
          />
        </div>

        {/* O'ng qism: Izohlar bo'limi */}
        <div className="w-1/2 h-full flex flex-col bg-black">
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b border-gray-800">
            <div className="flex items-center">
              <img
                src={post.profileImg}
                alt="User avatar"
                className="w-8 h-8 rounded-full mr-2 object-cover"
              />
              <span className="font-bold text-white">{post.username}</span>
            </div>
            <button
              className="text-2xl text-gray-400 hover:text-white"
              onClick={onClose}
            >
              ×
            </button>
          </div>

          {/* Caption va izohlar */}
          <div className="flex-1 overflow-y-auto p-3">
            {/* Caption */}
            <div className="mb-4">
              <span className="font-bold text-white">{post.username}</span>{" "}
              <span className="text-gray-300">{post.caption}</span>
            </div>

            {/* Izohlar */}
            {comments.map((comment, index) => (
              <div key={index} className="mb-2 flex items-start">
                <img
                  src={
                    comment.userAvatar ||
                    "https://ui-avatars.com/api/?name=User"
                  }
                  alt="User avatar"
                  className="w-6 h-6 rounded-full mr-2"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white">
                        {comment.username}
                      </span>{" "}
                      <span className="text-gray-300">{comment.text}</span>
                    </div>
                    <button
                      onClick={() => handleLikeComment(comment.id, index)}
                      className={`text-sm ${
                        comment.isLiked ? "text-red-500" : "text-gray-400"
                      } hover:text-red-500 flex items-center`}
                    >
                      ❤️ {comment.likes}
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(comment.created_at).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Izoh qo'shish formasi */}
          <div className="p-3 border-t border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <button className="text-gray-400 hover:text-red-500">
                ❤️ {post.likeCount}
              </button>
              <button className="text-gray-400 hover:text-blue-400">
                💬 {post.commentCount}
              </button>
            </div>
            <form onSubmit={handleAddComment} className="flex items-center">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full bg-transparent border-none outline-none text-gray-300 placeholder-gray-500"
              />
              <button
                type="submit"
                className="text-blue-400 font-medium"
                disabled={!newComment.trim()}
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
