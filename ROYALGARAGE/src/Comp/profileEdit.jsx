import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";

export default function ProfileEdit({ account }) {
  const dispatch = useDispatch();
  const updateProfile = async () => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
  };
  return (
    <div className="container-main flex items-center justify-center w-full h-screen">
      {" "}
      <form onSubmit={updateProfile}>
        <div className="flex flex-col gap-normal w-2xs">
          <Input name="first_name" placeholder="first name" />
          <Input name="second_name" placeholder="second name" />
          <Input name="last_name" placeholder="last name" />
          <Input name="address" placeholder="address" />
          <Button type="submit" className={"h-12"}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
