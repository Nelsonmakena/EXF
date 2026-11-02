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
