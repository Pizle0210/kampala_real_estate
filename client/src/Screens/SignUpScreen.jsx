import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/userApiSlice";
import { notifyInfo, notifySuccess } from "../App";
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import Oauth from "../components/Oauth";

export const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const dispatch = useDispatch();

  const reset = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const fields = [username, email, password];
    if (fields.some((field) => field === "")) {
      return notifyInfo("Fields cannot be empty");
    }
    try {
      const data = await register({ username, email, password });
      dispatch(setCredentials({...data}));
      notifySuccess("You have successfully created an account");
      console.log(data);
      reset(); // Reset form fields
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 mx-auto max-w-lg space-y-5">
      <h1 className="text-3xl font-bold text-gray-500 text-center">Sign Up</h1>
      <form
        className="flex flex-col md:w-[500px] space-y-7"
        onSubmit={submitHandler}
      >
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          value={username}
          placeholder="username"
          className="border-1 focus:border-none focus:outline-none  focus:ring-2 focus:ring-blue-500 rounded-lg transition-all duration-100 ease-out transform"
        />
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
          className=" px-2 p-2 bg-[#294282] hover:bg-[#375297] text-white font-bold uppercase disabled:bg-gray-500 rounded-md"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
        <Oauth/>
      </form>
      <div className="text-sm flex space-x-2">
        <p className="">Have an account?</p>{" "}
        <Link to={"/login"}>
          {" "}
          <span className="text-blue-700 hover:underline">Sign in</span>
        </Link>
      </div>
    </div>
  );
};
