import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/userApiSlice";
import { notifyError, notifySuccess } from "../App";
// import { setCredentials } from "../slices/authSlice";

export const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();
  // const { userInfo } = useSelector((state) => state.auth);

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const fields = [email, password];
    if (fields.some((field) => field === "")) {
      // Use global notification system or context to display error message
      return notifyError("Fields cannot be empty");
    }
    login({ email, password })
      .unwrap()
      .then((res) => {
        if (res?.error) {
          notifyError("Login failed. incorrect email or password");
        }
        notifySuccess("Logged in successfully");
        reset(); // Reset form fields
        navigate("/");
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
          className=" px-2 p-2 bg-blue-500 hover:bg-blue-500/80 text-white font-bold uppercase disabled:bg-gray-500 rounded-md"
        >
          {isLoading ? "Loading..." : "Sign In"}
        </button>
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
