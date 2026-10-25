import RolesCard from "@/Comp/roleCard";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { newPosition, positionList } from "@/store/wokerslice";
export default function EmployeePositions() {
  const { positions } = useSelector((state) => state.worker);
  const [open, SetOPen] = useState(false);
  const dispatch = useDispatch();
  console.log(positions);

  const newPositionData = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    dispatch(newPosition(data)).then((results) => {
      if (results?.payload.success) {
        toast(results?.payload.message);
        SetOPen(false);
      }
      toast(results?.payload.message);
      SetOPen(true);
    });
  };

  useEffect(() => {
    dispatch(positionList());
  }, []);

  return (
    <section className="section-sm">
      <div className="grid grid-cols-3 gap-normal">
        <div className="rounded-xl  p-4 transition cursor-pointer flex items-center justify-center ">
          <Sheet open={open} onOpenChange={SetOPen}>
            <SheetTrigger
              render={
                <Button className={"h-11 w-30 tracking-widest"}>
                  + position
                </Button>
              }
            />
            <SheetContent>
              <SheetHeader>
                <SheetTitle className={"text-header heading-normal"}>
                  position
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>

              <form onSubmit={newPositionData}>
                <div className="flex  flex-col  gap-normal px-3.5">
                  <Input
                    className={"h-12"}
                    placeholder=" position name "
                    name="position_name"
                  ></Input>
                  <Input
                    className={"h-12"}
                    placeholder=" position description "
                    name="position_description"
                  ></Input>
                </div>
                <div className="mt-3.5 flex items-center justify-center">
                  <Button type="submit" className={"w-2xs h-12"}>
                    add Role
                  </Button>
                </div>
              </form>
              <SheetFooter>
                <SheetClose render={<Button variant="outline">Close</Button>} />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        {positions.map((position) => (
          <RolesCard item={position} />
        ))}
      </div>
    </section>
  );
}
