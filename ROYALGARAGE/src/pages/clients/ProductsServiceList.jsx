import ServicesItems from "@/Comp/products/servicesitems";
import { getServices } from "@/Comp/store/serviceslice";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch, useSelector } from "react-redux";
import { getVehiclelist } from "@/Comp/store/vehicleslice";
export default function ProductServiceList({ NewServiceTab }) {
  const dispatch = useDispatch();
  const { availableServiceList, loading } = useSelector(
    (state) => state.services,
  );
  const { vehicles } = useSelector((state) => state.vehicle);

  useEffect(() => {
    dispatch(getServices());
    dispatch(getVehiclelist());
  }, []);
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        {" "}
        <Spinner />
      </div>
    );
  }
  return (
    <section className=" absolute top-24 z-50 bg-none backdrop-blur-2xl w-full max-h-screen  overflow-hidden">
      <ScrollArea className={"h-screen"}>
        <div className="container-main grid grid-cols-2  s md:flex md:flex-wrap  md:items-stretch  justify-center  gap-5  ">
          {availableServiceList.map((item) => (
            <div
              key={item.service_id}
              className="border-border  rounded-xl  flex flex-col w-46  shadow-md hover:-translate-y-1 transition duration-400"
            >
              {/* Product Image */}
              <div className="flex items-center justify-center h-30 mb-2 ">
                <img
                  src={`/assets/images/${item.service_image}.jpg`}
                  alt={item.name}
                  className="max-h-full w-full rounded-t-xl  "
                />
              </div>

              {/* Product Name */}
              <p
                onClick={() => {
                  Setselectedproduct(item);
                  Setisitemviewopen(!isitemviewopen);
                }}
                className="text-sm text-neutral-500 mb-2 px-2 cursor-pointer"
              >
                {item.service_name}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 px-2">
                <span className="text-sm font-semibold text-neutral-800">
                  ksh {Number(item.service_price)}
                </span>
              </div>

              {/* getting the service logic*/}
              <div className=" w-3/4 m-2.5 flex items-center justify-center  h-12 ">
                <Sheet>
                  <SheetTrigger
                    render={
                      <button className="w-full h-full  text-white rounded-md   bg-blue-400 shadow-md ">
                        {" "}
                        Book Now
                      </button>
                    }
                  />
                  <SheetContent side="bottom">
                    <SheetHeader>
                      <SheetTitle className={"text-header heading-normal"}>
                        {item.service_name}
                      </SheetTitle>
                      <SheetDescription></SheetDescription>
                    </SheetHeader>

                    <form>
                      <div className="flex w-full justify-center items-center ">
                        <h1>Select Vehicle</h1>
                        <Select>
                          <SelectTrigger className="w-[180px]"></SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {vehicles.map((item) => (
                                <SelectItem
                                  key={item.liscence_plate}
                                  value={item.liscence_plate}
                                >
                                  {item.liscence_plate}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="card flex flex-col gap-2.5 justify-center">
                        {/** close the side sheet and also get the form data
                         */}
                        <SheetClose
                          render={
                            <button
                              type="submit"
                              className=" bg-primary rounded-2xl h-14 w-2xs"
                            >
                              {" "}
                              update{" "}
                            </button>
                          }
                        />
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
          ))}
        </div>
      </ScrollArea>
    </section>
  );
}
