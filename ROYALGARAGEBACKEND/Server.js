import express from "express";
import cors from "cors";
import Productsroutes from "./src/Routes/Productsroutes.js";
import Serviceroutes from "./src/Routes/Servicesroutes.js";
import authroutes from "./src/Routes/authroutes.js";
import clientroutes from "./src/Routes/clientroutes.js";
import { ENV } from "./env.js";
import { DbConnection } from "./Db.js";

const app = express();

const Port = ENV.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

DbConnection();

// product routes
app.use("/api/products", Productsroutes);
app.use("/api/services", Serviceroutes);
app.use("/api/authenication", authroutes);
app.use("/api/client", clientroutes);

app.listen(Port, () => {
  console.log(`Sever is running  at port ${Port}`);
});
