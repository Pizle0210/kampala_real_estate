import { signInWithPopup } from "firebase/auth";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { auth, provider } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useLoginWithGoogleMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
export default function Oauth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginWithGoogle, { isLoading }] = useLoginWithGoogleMutation();

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      loginWithGoogle({
        name: result?.user?.displayName,
        email: result?.user?.email,
        photo: result?.user?.photoURL,
      }).unwrap();
      dispatch(setCredentials({ ...result }));
      navigate("/");
      console.log(result);
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };
  return (
    <div className="flex justify-center p-3 bg-slate-400">
      <button
        onClick={handleGoogleAuth}
        type="button"
        className="flex items-center gap-2 group"
        disabled={isLoading}
      >
        <p className="text-white font-bold group-hover:text-blue-800 disabled:bg-slate-800 group-hover:transition-all group-hover:transform group-hover:duration-300 group-hover:ease-in-out ">
          {isLoading ? "loading" : "Continue with Google"}
        </p>
        <FaGoogle className="h-6 w-6 text-red-700/80 font-extrabold group-hover:text-white group-hover:transition-all group-hover:transform group-hover:duration-300 group-hover:ease-in-out " />
      </button>
    </div>
  );
}
