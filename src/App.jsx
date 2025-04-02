import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Auth/Login"
import Signup from "./pages/Auth/Signup"
import Profile from "./pages/Profile/Profile/Profile"
import CreatePostPage from "./pages/create-post"

function App() {
  return (
    <Router>
      <div className="w-full h-screen flex flex-col bg-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreatePostPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

