import { Link } from "react-router-dom"
import InstagramLogo from "../../../assets/logo/instagram.png"
import InstagramIcon from "../../../assets/logo/icon.png"
import HomeLogo from "../../../assets/navlogo/home.png"
import SearchLogo from "../../../assets/navlogo/search.png"
import ExploreLogo from "../../../assets/navlogo/explore.png"
import ReelsLogo from "../../../assets/navlogo/reel.png"
import MessagesLogo from "../../../assets/navlogo/message.png"
import NotificationsLogo from "../../../assets/navlogo/like.png"
import CreateLogo from "../../../assets/navlogo/create.png"
import ThreadsLogo from "../../../assets/navlogo/threads.png"
import MoreLogo from "../../../assets/navlogo/more.png"

function LargeNav() {
  const sidebarItems = [
    {
      name: "Search",
      link: "/search",
      icon: SearchLogo,
    },
    {
      name: "Explore",
      link: "/explore",
      icon: ExploreLogo,
    },
    {
      name: "Reels",
      link: "/reels",
      icon: ReelsLogo,
    },
    {
      name: "Messages",
      link: "/messages",
      icon: MessagesLogo,
    },
    {
      name: "Notifications",
      link: "/notifications",
      icon: NotificationsLogo,
    },
    // Create item is handled separately now
  ]

  return (
    <>
      <div className="w-full h-full flex flex-col relative">
        <Link to="/" className="mb-10 px-2 lg:block md:hidden sm:hidden hidden">
          <img src={InstagramLogo || "/placeholder.svg"} alt="instagram logo" className="w-32 h-auto" />
        </Link>
        <Link to="/" className="mb-6 px-2 lg:hidden md:block sm:block block">
          <img src={InstagramIcon || "/placeholder.svg"} alt="instagram logo" className="w-11 h-auto" />
        </Link>
        <div className="w-full h-auto flex items-start flex-col gap-y-2">
          <Link
            to="/"
            className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-800/60 rounded-md ease-out duration-500 group"
          >
            <img
              src={HomeLogo || "/placeholder.svg"}
              alt="home icon"
              className="w-7 h-7 object-contain group-hover:scale-105 ease-out duration-300"
            />
            <p className="text-[16px] font-semibold text-white lg:block md:hidden sm:hidden hidden">Home</p>
          </Link>
          {sidebarItems.map((item) => (
            <Link
              to={item.link}
              key={item.name}
              className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-800/60 rounded-md ease-out duration-500 group"
            >
              <img
                src={item.icon || "/placeholder.svg"}
                alt={`${item.name} icon`}
                className="w-7 h-7 object-contain group-hover:scale-105 ease-out duration-300"
              />
              <p className="text-[16px] font-normal text-white lg:block md:hidden sm:hidden hidden">{item.name}</p>
            </Link>
          ))}
          {/* Create link now navigates to the create post page */}
          <Link
            to="/create"
            className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-800/60 rounded-md ease-out duration-500 group"
          >
            <img
              src={CreateLogo || "/placeholder.svg"}
              alt="create icon"
              className="w-7 h-7 object-contain group-hover:scale-105 ease-out duration-300"
            />
            <p className="text-[16px] font-normal text-white lg:block md:hidden sm:hidden hidden">Create</p>
          </Link>
          <Link
            to="/profile"
            className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-800/60 rounded-md ease-out duration-500 group"
          >
            <img
              src="https://ui-avatars.com/api/?name=User"
              alt="profile icon"
              className="w-7 h-7 rounded-full object-cover group-hover:scale-105 ease-out duration-300"
            />
            <p className="text-[16px] font-normal text-white lg:block md:hidden sm:hidden hidden">Profile</p>
          </Link>
        </div>
        <div className="w-full h-auto absolute bottom-0 left-0 px-o">
          <Link
            to="/"
            className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-800/60 rounded-md ease-out duration-500 group mb-2"
          >
            <img
              src={ThreadsLogo || "/placeholder.svg"}
              alt="threads icon"
              className="w-7 h-7 object-contain group-hover:scale-105 ease-out duration-300"
            />
            <p className="text-[16px] font-normal text-white lg:block md:hidden sm:hidden hidden">Threads</p>
          </Link>
          <Link
            to="/"
            className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-800/60 rounded-md ease-out duration-500 group"
          >
            <img
              src={MoreLogo || "/placeholder.svg"}
              alt="more icon"
              className="w-7 h-7 object-contain group-hover:scale-105 ease-out duration-300"
            />
            <p className="text-[17px] font-medium text-white lg:block md:hidden sm:hidden hidden">More</p>
          </Link>
        </div>
      </div>
    </>
  )
}

export default LargeNav

