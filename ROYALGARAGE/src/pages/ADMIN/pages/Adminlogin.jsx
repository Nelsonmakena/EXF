import { useContext } from "react";
import { useNavigate } from "react-router";
import { Globalcontext } from "../../../context";

export default function Adminlogin() {
  const navigate = useNavigate();
  const { SetIsloggedin, SetRole } = useContext(Globalcontext);
  return (
    <>
      <main>
        <section className="w-full h-screen flex items-center justify-center">
          <div className="flex h-screen w-full ">
            <div className="w-full flex flex-col items-center justify-center ">
              <form className="md:w-96 w-80 flex flex-col items-center justify-center ">
                <h2 className="text-4xl text-gray-900 font-medium">Admin</h2>

                <div className="flex items-center gap-4 w-full my-5">
                  <div className="w-full h-px bg-gray-300/90"></div>
                </div>

                <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <input
                    type="text"
                    placeholder="Username"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>

                <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <input
                    type="password"
                    placeholder="Password"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>

                <div className="w-full flex items-center justify-between mt-8 text-gray-500/80"></div>

                <button
                  onClick={() => {
                    navigate("/admin/home");
                    SetIsloggedin(true);
                    SetRole("admin");
                  }}
                  type="submit"
                  className="mt-8 w-full h-11 rounded-full text-white bg-orange-700 hover:opacity-90 transition-opacity"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
