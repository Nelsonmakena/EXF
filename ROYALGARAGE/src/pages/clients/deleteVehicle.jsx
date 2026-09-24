import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { removeVehicle } from "@/store/vehicleslice";
import { toast } from "sonner";
export default function DeleteVehicle({ open, setOpenDelete, item }) {
  const dispatch = useDispatch();
  console.log(setOpenDelete);

  return (
    <Dialog open={open} onOpenChange={setOpenDelete}>
      <DialogHeader>
        <DialogTitle className={"flex justify-center"}>
          {item.details.plate}
        </DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <DialogContent className=" bg-card ">
        <h1 className=" w-full flex justify-center">
          Are you sure you want to remove this vehicle
        </h1>
        <p className="px-3.5">
          This action cannot be undone. This will permanently delete your
          vehicle and remove its data from our servers.
        </p>
        <div className="w-full flex   items-center justify-between ">
          <Button
            className={"w-40"}
            onClick={async () => {
              dispatch(removeVehicle(item.vehicle_id)).then((results) => {
                if (results.payload.success) {
                  toast(results.payload.message);
                  setOpenDelete(false);
                } else {
                  toast(results.payload.message);
                  setOpenDelete(true);
                }
              });
            }}
          >
            Confirm
          </Button>
          <DialogClose asChild>
            <Button variant="destructive" className={"w-40"}>
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
