import express from "express";
import Productsroutes from "./src/Routes/Productsroutes.js";

const app = express();

const Port = 3000;

app.use(express.json());

// product routes
app.use("api/products", Productsroutes);

app.listen(Port, () => {
  console.log(`Sever is running ${Port}`);
});
