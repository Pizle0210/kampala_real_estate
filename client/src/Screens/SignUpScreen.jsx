import { Link } from "react-router-dom";

export const SignUpScreen = () => {
  return (
    <div className="p-3 mx-auto max-w-lg space-y-5">
      <h1 className="text-3xl font-bold text-gray-500 text-center">Sign Up</h1>
      <form className="flex flex-col md:w-[500px] space-y-7">
        <input type="text" placeholder="username" className="border-1 focus:border-none focus:outline-none  focus:ring-2 focus:ring-fuchsia-500 rounded-lg transition-all duration-500 ease-out transform"/>
        <input type="text" placeholder="email" className="border-1 focus:border-none focus:outline-none  focus:ring-2 focus:ring-fuchsia-500 rounded-lg transition-all duration-500 ease-out transform"/>
        <input type="text" placeholder="password" className="border-1 focus:border-none focus:outline-none  focus:ring-2 focus:ring-fuchsia-500 rounded-lg transition-all duration-500 ease-out transform"/>
        <button className=" px-2 p-2 bg-fuchsia-500 hover:bg-fuchsia-500/80 text-white font-bold uppercase disabled:bg-gray-500">Sign Up</button>
      </form>
      <div className="text-sm flex space-x-2">
        <p className="">Have an account?</p>{' '} 
        <Link to={'/login'}> <span className="text-gray-500 hover:underline">Sign in</span></Link>
      </div>
    </div>
  );
};
