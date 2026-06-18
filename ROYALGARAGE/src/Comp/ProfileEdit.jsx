import { useNavigate } from "react-router";
import me from "/src/assets/profile.png";
import x from "/src/assets/x.png";
import { useState } from "react";
export default function ProfileEdit() {
  const [confirms, Setconfirms] = useState(false);
  const navigate = useNavigate();
  function Confirm() {
    Setconfirms(true);
    navigate("/dashboard");
  }
  return (
    <>
      <section className=" container-main  flex flex-col w-full   min-h-dvh items-center md:flex-row">
        <div className=" flex flex-col flex-1 h-screen justify-center items-center ">
          <div className="  rounded-[50%] w-72 h-72 overflow-hidden shadow-md ">
            <img src={me} alt="userimage" />
          </div>
          <button
            type="submit"
            className="mt-8 w-1/2 h-11 rounded-md text-white bg-blue-400 hover:opacity-90 transition-opacity"
          >
            Edit
          </button>
        </div>
        <div className=" section flex flex-col flex-1 h-screen  justify-center ">
          <div className="w-full flex justify-between">
            <h1 className="p-3.5 font-bold text-blue-400"> My profile </h1>
          </div>

          <div className=" flex-col  h-3/4 ">
            <form action="">
              <div className=" w-full flex   ">
                <div className="flex items-center mt-6 w-1/2 bg-transparent border border-gray-300/60 h-12 rounded-md overflow-hidden pl-6 gap-2">
                  <input
                    type="email"
                    placeholder="Email"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>
              </div>

              <div className=" w-full flex gap-2.5   ">
                <div className="flex items-center mt-6 w-1/2 bg-transparent border border-gray-300/60 h-12 rounded-md overflow-hidden pl-6 gap-2">
                  <input
                    type="Text"
                    placeholder="First Name"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>
                <div className="flex items-center mt-6 w-1/2 bg-transparent border border-gray-300/60 h-12 rounded-md overflow-hidden pl-6 gap-2">
                  <input
                    type="Text"
                    placeholder="Last Name"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>
              </div>
              <div className=" w-full flex gap-2.5  ">
                <div className="flex items-center mt-6 w-1/2 bg-transparent border border-gray-300/60 h-12 rounded-md overflow-hidden pl-6 gap-2">
                  <input
                    type="password"
                    placeholder="Password"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>
                <div className="flex items-center mt-6 w-1/2 bg-transparent border border-gray-300/60 h-12 rounded-md overflow-hidden pl-6 gap-2">
                  <input
                    type="password"
                    placeholder="confirm Password"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>
              </div>
              <div className=" w-full flex   ">
                <div className="flex items-center mt-6 w-1/2 bg-transparent border border-gray-300/60 h-12 rounded-md overflow-hidden pl-6 gap-2">
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>
              </div>

              <div className="w-full flex  justify-center">
                <button
                  onClick={Confirm}
                  type="submit"
                  className="mt-8 w-1/2 h-11 rounded-md text-white bg-blue-400 hover:opacity-90 transition-opacity"
                >
                  confrim
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
