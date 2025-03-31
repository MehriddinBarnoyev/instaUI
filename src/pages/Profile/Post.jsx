// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Post = () => {
//   const [posts, setPosts] = useState([]);
//   const userId = 1; // Foydalanuvchi ID si (o'zgartiring)

//   useEffect(() => {
//     axios.get("http://localhost:5000/posts")
//       .then(res => setPosts(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="max-w-2xl mx-auto py-10">
//       <h1 className="text-2xl font-bold text-center mb-5">Instagram Clone</h1>
//       {posts.map(post => (
//         <div key={post.post_id} className="bg-white shadow-lg rounded-lg mb-5 p-5">
//           <div className="flex items-center mb-3">
//             <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
//             <h2 className="font-bold">{post.author}</h2>
//           </div>
//           <p className="mb-3">{post.post_text}</p>
//           <div className="flex justify-between text-sm text-gray-500">
//             <span>{post.like_count} Likes</span>
//             <Link to={`/post/${post.post_id}`} className="text-blue-500">View Details</Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Post;
