<Select
  onValueChange={(plate) => {
    const vehicle = vehicles.find((item) => item.details.plate === plate);
    setJobData((prev) => ({
      ...prev,
      vehicle_id: vehicle.vehicle_id,
    }));
  }}
  className=" border  shadow-2xl"
>
  <SelectTrigger className="w-2xs shadow-2xl ">
    <SelectValue placeholder="Select vehicle" />
  </SelectTrigger>
  <SelectContent className="bg-none backdrop-blur-md">
    {vehicles.map((item) => (
      <SelectItem
        className={"tracking-wide font-bold"}
        name="vehicle_id"
        key={item.details.plate}
        value={item.details.plate}
      >
        {item.details.plate} {item.details.brand}
      </SelectItem>
    ))}
  </SelectContent>
</Select>;

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger
    render={
      <Button
        onClick={() => {
          vehicles.length > 0
            ? setJobData((prev) => ({
                ...prev,
                service_id: service.service_id,
              }))
            : (toast("please add a vehicle to continue"),
              navigate("/client/vehicles"));
        }}
        className=" text-white rounded-b-xl  rounded-t-none  h-12   "
      >
        {" "}
        Book Now
      </Button>
    }
  ></DialogTrigger>
  <DialogContent className={"bg-card"}>
    <DialogHeader>
      <DialogTitle>{service.service_name}</DialogTitle>
      <DialogDescription></DialogDescription>
    </DialogHeader>
    <form>
      <div className="flex flex-col w-full justify-center items-center   gap-normal">
        <label htmlFor="select vehicle "> choose vehicle to be serviced</label>

        <CustomDropDown
          item={convertArray(vehicles, "vehicle-id", "details")}
        />

        <div className="flex w-full justify-between p-3.5">
          {" "}
          <h1> pick day of service </h1> <Calendar1 />{" "}
        </div>

        <Input
          className={"p-3.5 w-2xs"}
          type="date"
          min={new Date().toISOString().split("T")[0]}
          name="appointment_day"
          // onChange={handleChange}
          // value={jobData.appointment_day}
          required
        />
        <button
          type="submit"
          className="w-2xs h-12 text-white rounded-md   bg-primary"
        >
          Confirm
        </button>
      </div>
    </form>
  </DialogContent>
</Dialog>;
