import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { useSelector } from "react-redux";

export const ProfileScreen = () => {
  const { username, displayName } = useSelector((state) => state.auth);
  const [user] = useAuthState(auth);
  return (
    <div className="container mx-auto max-w-lg space-y-3">
      <h1 className="text-2xl text-center font-semibold tracking-wider">
        {username || displayName || user?.displayName}'s Profile
      </h1>
      <form className="flex flex-col space-y-3 max-sm:px-10">
        <img
          src={user?.photoURL}
          alt="profile picture"
          className="self-center h-24 w-24 object-contain rounded-3xl cursor-pointer"
        />
        <input
          type="text"
          placeholder="username"
          className="rounded "
          required
          autoComplete="on"
        />
        <input
          type="email"
          placeholder="email"
          className="rounded "
          required
          autoComplete="on"
        />
        <input
          type="password"
          placeholder="password"
          className="rounded "
          required
          autoComplete="on"
        />
        <button className="font-medium text-lg bg-yellow-400 p-1 text-black">
          Update{" "}
        </button>
        <button className="font-medium text-lg bg-green-600 p-1 text-white">
          Create Listing
        </button>
        <div className="flex justify-between ">
          <span className="text-red-600 cursor-pointer">Delete Account</span>
          <span className="text-red-600 cursor-pointer">Sign Out</span>
        </div>
        <div className="text-center text-blue-900 font-semibold hover:text-blue-500">Show Listing</div>
      </form>
    </div>
  );
};
