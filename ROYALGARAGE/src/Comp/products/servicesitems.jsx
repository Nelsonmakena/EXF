export default function ServicesItems() {
  const services = [
    {
      name: "Oil Change Service",
      price: 1500,
      imgUrl: "https://picsum.photos/300?random=21",
    },
    {
      name: "Engine Diagnostics",
      price: 2500,
      imgUrl: "https://picsum.photos/300?random=22",
    },
    {
      name: "Brake Inspection",
      price: 2000,
      imgUrl: "https://picsum.photos/300?random=23",
    },
    {
      name: "Wheel Alignment",
      price: 3000,
      imgUrl: "https://picsum.photos/300?random=24",
    },
    {
      name: "Wheel Balancing",
      price: 2500,
      imgUrl: "https://picsum.photos/300?random=25",
    },
    {
      name: "Battery Testing",
      price: 1000,
      imgUrl: "https://picsum.photos/300?random=26",
    },
    {
      name: "Battery Replacement",
      price: 1800,
      imgUrl: "https://picsum.photos/300?random=27",
    },
    {
      name: "Radiator Flush",
      price: 2200,
      imgUrl: "https://picsum.photos/300?random=28",
    },
    {
      name: "AC System Repair",
      price: 4500,
      imgUrl: "https://picsum.photos/300?random=29",
    },
    {
      name: "Engine Tune-Up",
      price: 5000,
      imgUrl: "https://picsum.photos/300?random=30",
    },
    {
      name: "Transmission Service",
      price: 6500,
      imgUrl: "https://picsum.photos/300?random=31",
    },
    {
      name: "Suspension Repair",
      price: 7000,
      imgUrl: "https://picsum.photos/300?random=32",
    },
    {
      name: "Tire Replacement",
      price: 2500,
      imgUrl: "https://picsum.photos/300?random=33",
    },
    {
      name: "Car Wash",
      price: 500,
      imgUrl: "https://picsum.photos/300?random=34",
    },
    {
      name: "Interior Detailing",
      price: 3500,
      imgUrl: "https://picsum.photos/300?random=35",
    },
    {
      name: "Exterior Polishing",
      price: 3000,
      imgUrl: "https://picsum.photos/300?random=36",
    },
    {
      name: "Headlight Restoration",
      price: 1200,
      imgUrl: "https://picsum.photos/300?random=37",
    },
    {
      name: "Pre-Purchase Inspection",
      price: 4000,
      imgUrl: "https://picsum.photos/300?random=38",
    },
    {
      name: "Fuel System Cleaning",
      price: 2800,
      imgUrl: "https://picsum.photos/300?random=39",
    },
    {
      name: "Full Vehicle Service",
      price: 12000,
      imgUrl: "https://picsum.photos/300?random=40",
    },
  ];
  return (
    <section className="   ">
      <div className=" grid grid-cols-2  s md:flex md:flex-wrap  md:items-stretch  justify-center  gap-5   ">
        {services.map((item, index) => (
          <div
            key={index}
            className=" bg-card border-border  rounded-xl p-2 flex flex-col w-46  shadow-md hover:-translate-y-1 transition duration-400"
          >
            {/* Product Image */}
            <div className="flex items-center justify-center h-30 mb-2">
              <img
                src={item.image}
                alt={item.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Product Name */}
            <p className="text-sm text-neutral-500 mb-2 px-2">{item.name}</p>

            {/* Price */}
            <div className="flex items-center gap-2 px-2">
              <span className="text-sm font-semibold text-neutral-800">
                ksh {item.price}
              </span>
              <span className="text-xs text-neutral-500 line-through">
                {item.oldPrice}
              </span>
            </div>
            <div className=" w-3/4 m-2.5 flex items-center justify-center  h-12 ">
              <button className="w-full h-full  text-white rounded-md   bg-blue-400 shadow-md ">
                {" "}
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
