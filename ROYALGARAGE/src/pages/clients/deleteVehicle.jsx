import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
export default function DeleteVehicle({ open, onOpenChange, item }) {
  console.log(item);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={" bg-card backdrop-blur-md"}>
        <DialogHeader>
          <DialogTitle className={"flex justify-center"}>
            {item.details.plate}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <h1 className=" w-full flex justify-center">
          Are you sure you want to remove this vehicle
        </h1>
        <div className="p-3.5">
          This action cannot be undone. This will permanently delete your
          vehicle and remove its data from our servers.
        </div>
        <div className="w-full flex items-center justify-between h-36">
          <Button
            className={"w-40"}
            onClick={async () => {
              dispatch(removeVehicle(item.vehicle_id)).then((data) => {
                data.payload.success
                  ? toast(data.payload.message)
                  : toast(data.payload.message);
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
