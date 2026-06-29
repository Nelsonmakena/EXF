import express from "express";
import cors from "cors";
import Productsroutes from "./src/Routes/Productsroutes.js";
import Serviceroutes from "./src/Routes/Servicesroutes.js";
import { ENV } from "./env.js";
import { DbConnection } from "./Db.js";

const app = express();

const Port = ENV.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: ENV.FRONTEND_URL }));

DbConnection();

// product routes
app.use("/api/products", Productsroutes);
app.use("/api/services", Serviceroutes);

app.listen(Port, () => {
  console.log(`Sever is running  at port ${Port}`);
});
