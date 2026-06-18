export default function ProductsItems() {
  const products = [
    {
      name: "Engine Oil 5W-30",
      price: 3500,
      imgUrl: "https://picsum.photos/300?random=1",
    },
    {
      name: "Car Battery 75Ah",
      price: 12000,
      imgUrl: "https://picsum.photos/300?random=2",
    },
    {
      name: "Brake Pads Set",
      price: 4500,
      imgUrl: "https://picsum.photos/300?random=3",
    },
    {
      name: "Air Filter",
      price: 1800,
      imgUrl: "https://picsum.photos/300?random=4",
    },
    {
      name: "Oil Filter",
      price: 1200,
      imgUrl: "https://picsum.photos/300?random=5",
    },
    {
      name: "Spark Plugs Set",
      price: 2500,
      imgUrl: "https://picsum.photos/300?random=6",
    },
    {
      name: "Radiator Coolant",
      price: 1500,
      imgUrl: "https://picsum.photos/300?random=7",
    },
    {
      name: "Windshield Wipers",
      price: 1000,
      imgUrl: "https://picsum.photos/300?random=8",
    },
    {
      name: "Headlight Bulb",
      price: 800,
      imgUrl: "https://picsum.photos/300?random=9",
    },
    {
      name: "Tail Light Bulb",
      price: 700,
      imgUrl: "https://picsum.photos/300?random=10",
    },
    {
      name: "Brake Fluid",
      price: 900,
      imgUrl: "https://picsum.photos/300?random=11",
    },
    {
      name: "Transmission Fluid",
      price: 2200,
      imgUrl: "https://picsum.photos/300?random=12",
    },
    {
      name: "Car Wax",
      price: 1300,
      imgUrl: "https://picsum.photos/300?random=13",
    },
    {
      name: "Tire Pressure Gauge",
      price: 600,
      imgUrl: "https://picsum.photos/300?random=14",
    },
    {
      name: "Car Jack",
      price: 5000,
      imgUrl: "https://picsum.photos/300?random=15",
    },
    {
      name: "Jump Starter Cable",
      price: 1800,
      imgUrl: "https://picsum.photos/300?random=16",
    },
    {
      name: "Steering Wheel Cover",
      price: 1200,
      imgUrl: "https://picsum.photos/300?random=17",
    },
    {
      name: "Seat Covers Set",
      price: 4500,
      imgUrl: "https://picsum.photos/300?random=18",
    },
    {
      name: "Car Floor Mats",
      price: 3000,
      imgUrl: "https://picsum.photos/300?random=19",
    },
    {
      name: "Tire Repair Kit",
      price: 1700,
      imgUrl: "https://picsum.photos/300?random=20",
    },
  ];
  return (
    <section>
      <div className="grid grid-cols-2  md:flex md:flex-wrap items-stretch justify-center gap-5">
        {products.map((item, index) => (
          <div
            key={index}
            className="border-border bg-card shadow-md transition-colors rounded-xl p-2 flex flex-col w-46"
          >
            {/* Top row: badge + bookmark */}
            <div className="flex items-center justify-between mb-2">
              <span className="bg-lime-300 text-neutral-800 text-xs px-2 py-0.5 rounded-full">
                <span className="font-bold">20%</span> off
              </span>
              <div className="size-7 rounded-full border border-zinc-300 flex items-center justify-center cursor-pointer">
                <svg
                  width="9"
                  height="11"
                  viewBox="0 0 9 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.357.5c.303 0 .594.117.808.325s.335.491.335.786v8.334a.54.54 0 0 1-.076.277.584.584 0 0 1-.779.205L5.067 8.995a1.17 1.17 0 0 0-1.134 0l-2.578 1.432a.584.584 0 0 1-.779-.205.54.54 0 0 1-.076-.277V1.61c0-.295.12-.577.335-.786A1.16 1.16 0 0 1 1.643.5z"
                    stroke="#27272a"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

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
                {item.price}
              </span>
              <span className="text-xs text-neutral-500 line-through">
                {item.oldPrice}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
