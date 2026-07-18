import axios from "axios";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function WorkerView() {
  const [workerList, SetworkerList] = useState();
  const [isloading, Setisloading] = useState(true);
  const token = localStorage.getItem("token");
  //fething worker list
  const getWokerLists = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/workers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      SetworkerList(response.data.data);
      Setisloading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getWokerLists();
  }, []);
  console.log(workerList);
  if (isloading) {
    return <h1>loading</h1>;
  }
  return (
    <section className="container-main">
      <div className="section flex gap-normal ">
        {/**admin to add a new worker  */}
        <div className="bg-card w-46  rounded-xl  shadow-md  card ">
          <div className=" flex items-center justify-center h-full   heading-bold ">
            <Sheet>
              <SheetTrigger
                render={
                  <button className="bg-primary w-full   rounded-xl">
                    {" "}
                    <h1 className="text-body text-card"> New emmployee</h1>
                  </button>
                }
              />
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className={"text-header heading-normal"}>
                    {" "}
                    New Employee{" "}
                  </SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>

                <form>
                  <div className=" card flex  flex-col justify-center border  h-full">
                    <div className="grid gap-3">
                      <label> Email </label>
                      <Input name="email" required type={"email"} />
                    </div>
                    <div className="grid gap-3">
                      <label> password </label>
                      <Input name="password" required />
                    </div>
                  </div>
                  <div className="card flex justify-center">
                    <button
                      type="submit"
                      className=" bg-primary w-full rounded-2xl h-14"
                    >
                      Add
                    </button>
                  </div>
                </form>
                <SheetFooter>
                  <SheetClose
                    render={<Button variant="outline">Close</Button>}
                  />
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {workerList.map((item) => {
          return (
            <div className="  card  bg-card rounded-xl w-80 h-96  shadow-2xl">
              <div className="flex w-full h-1/2 justify-center items-center ">
                <div className="rounded-full w-30 h-30 border flex justify-center items-center overflow-hidden ">
                  name
                </div>
              </div>
              {/**deatls section */}
              <div>
                <h1>name</h1>
                <h1>postion</h1>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
