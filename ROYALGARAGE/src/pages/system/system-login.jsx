import { adminLogin } from "@/store/authslice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        navigate("/misc/dashboard");
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
            className="md:w-96 w-80 flex flex-col items-center justify-center gap-normal "
          >
            <h2 className="text-4xl text-muted font-medium">Welcome </h2>

            <div className="flex items-center gap-4 w-full my-5">
              <div className="w-full h-px bg-gray-300/90"></div>
            </div>

            <Input
              type="text"
              placeholder="Username"
              name="username"
              required
              className="h-12"
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              className="h-12"
            />

            <div className="w-full flex items-center justify-between mt-8 text-gray-500/80"></div>

            <Button type="submit" className="w-full h-11 ">
              Login
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
