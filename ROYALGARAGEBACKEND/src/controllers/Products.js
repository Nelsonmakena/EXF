import express from "express";

const app = express();
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
// getting all products
const getallproducts = (res, req) => {
  res.json(products);
};
// geting a single product by id
const getsingleproduct = (res, req) => {};

export default { getallproducts, getsingleproduct };
