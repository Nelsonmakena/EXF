import { adminLogin } from "@/store/authslice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function SystemLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());

    dispatch(adminLogin(data)).then((results) => {
      if (results?.payload?.success) {
        toast(results?.payload?.message);
        navigate("/misc");
      } else {
        toast.error(results?.payload?.message);
      }
    });
  };
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="flex h-screen w-full  ">
        <div className="w-full flex flex-col items-center justify-center ">
          <form
            onSubmit={login}
            className="md:w-96 w-80 flex flex-col items-center justify-center "
          >
            <h2 className="text-4xl text-green-700 font-medium">Welcome </h2>

            <div className="flex items-center gap-4 w-full my-5">
              <div className="w-full h-px bg-gray-300/90"></div>
            </div>

            <div className="flex items-center w-full bg-transparent border border-green-600 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="bg-transparent text-gray-500/80 placeholder-green-400 outline-none text-sm w-full h-full"
                required
              />
            </div>

            <div className="flex items-center mt-6 w-full bg-transparent border border-green-600 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="bg-transparent text-gray-500/80 placeholder-green-400 outline-none text-sm w-full h-full"
                required
              />
            </div>

            <div className="w-full flex items-center justify-between mt-8 text-gray-500/80"></div>

            <button
              type="submit"
              className="mt-8 w-full h-11 rounded-full text-white bg-green-700 hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
