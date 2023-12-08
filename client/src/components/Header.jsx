import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
    title: "signin",
    url: "/login",
  },
];

export const Header = () => {
  return (
    <header className="bg-blue-900/40">
      <nav className=" px-7 py-5 flex items-center justify-between">
        <Link to={"/"} className="flex space-x-3 items-center ">
          <img src="/kampalalogo.jpg" alt="logo" className="h-14 w-14 " />
          <h1 className="font-bold tracking-widest text-2xl flex flex-wrap ">
            <span className="text-white">Kampala</span>
            <span className="text-black">Estate</span>
          </h1>
        </Link>
        <form className="flex items-center relative">
          <input
            type="search"
            placeholder="search..."
            className="focus:outline-none w-full bg-transparent focus:border-0 focus:ring-white rounded-2xl focus:text-gray-700"
          />
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-56"/>
        </form>
        <ul className="items-center gap-2 hidden lg:flex lg:space-x-4">
          {links.map((link) => (
            <Link
              to={link.url}
              key={link.id}
              className="hover:border-b border-black ease-linear duration-150 transform transition-all hover:scale-110"
            >
              {link.title}
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
};
