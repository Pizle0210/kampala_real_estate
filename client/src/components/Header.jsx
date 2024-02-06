import { Link, useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import logo from "../../public/kampalalogo.jpg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "About",
    url: "/about",
  },
  {
    id: 3,
    title: "Signin",
    url: "/login",
  },
];

export const Header = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="header">
      <nav className=" px-7 py-5 flex items-center justify-between">
        <Link to={"/"} className="flex space-x-3 items-center ">
          <img src={logo} alt="logo" className="h-14 w-14 " />
          <h1 className="font-bold tracking-widest text-2xl flex flex-wrap ">
            <span className="text-white">Kampala</span>
            <span className="bg-white px-2 rounded-md text-blue-950 font-extrabold">
              Estate
            </span>
          </h1>
        </Link>
        <form className="flex items-center relative">
          <input
            type="search"
            placeholder="search..."
            className="focus:outline-none w-full bg-transparent focus:border-0 focus:ring-white rounded-2xl focus:text-gray-700"
          />
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-56" />
        </form>
        {user || userInfo ? (
          <div className="flex items-center space-x-3">
            {user && userInfo ? (
              <img
                src={user?.photoURL}
                alt={user?.displayName || user?.email}
                className="rounded-full h-6 w-6"
              />
            ) : null}
            <button
              to={"/"}
              onClick={handleLogout}
              className="px-4 p-2 bg-[#02202c] text-white font-bold hover:scale-95 ease-in-out duration-200 transition-transform transform rounded shadow-xl"
            >
              {user || userInfo ? "Sign Out" : "Sign In"}
            </button>
          </div>
        ) : (
          <ul className="items-center gap-2 hidden lg:flex lg:space-x-4">
            {links.map((link) => (
              <Link
                to={link.url}
                key={link.id}
                className="hover:border-b text-white font-medium hover:font-semibold tracking-wide hover:border-white ease-linear duration-150 transform transition-all hover:scale-110"
              >
                {link.title}
              </Link>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
};
