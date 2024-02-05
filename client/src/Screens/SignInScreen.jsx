import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/userApiSlice";
import { notifyError, notifySuccess } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import Oauth from "../components/Oauth";

export const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();


  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const fields = [email, password];
    if (fields.some((field) => field === "")) {
      return notifyError("Fields cannot be empty");
    }
    login({ email, password })
      .unwrap()
      .then((res) => {
        if (res?.error) {
          notifyError("Login failed. incorrect email or password");
        }
        dispatch(setCredentials({ ...res }));
        navigate("/");
        notifySuccess("Logged in successfully");
        reset(); // Reset form fields
      });
  };

  return (
    <div className="p-3 mx-auto max-w-lg space-y-5">
      <h1 className="text-3xl font-bold text-gray-8 00 text-center">Sign In</h1>
      <form
        className="flex flex-col md:w-[500px] space-y-7"
        onSubmit={submitHandler}
      >
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
          placeholder="email"
          className="border-1 focus:border-none focus:outline-none  focus:ring-2 focus:ring-blue-500 rounded-lg transition-all duration-100 ease-out transform"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          placeholder="password"
          className="border-1 focus:border-none focus:outline-none  focus:ring-2 focus:ring-blue-500 rounded-lg transition-all duration-100 ease-out transform"
        />
        <button
          disabled={isLoading}
          className=" px-2 p-2 bg-[#294282] hover:bg-[#375297] text-white disabled:bg-gray-500 rounded-md font-bold uppercase"
        >
          {isLoading ? "Loading..." : "Sign In"}
        </button>
        <Oauth/>
      </form>
      <div className="text-sm flex space-x-2">
        <p className="">Don't have an account?</p>{" "}
        <Link to={"/signup"}>
          {" "}
          <span className=" hover:underline text-blue-700 font-bold hover:text-blue-800/70">
            Sign Up
          </span>
        </Link>
      </div>
    </div>
  );
};
