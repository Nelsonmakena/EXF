import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import ProductsRoutes from "./src/Routes/Productsroutes.js";
import ServiceRoutes from "./src/Routes/Servicesroutes.js";
import authRoutes from "./src/Routes/authroutes.js";
import clientRoutes from "./src/Routes/clientroutes.js";
import adminRoutes from "./src/Routes/adminroutes.js";
import workerRoutes from "./src/Routes/workerroutes.js";
import systemRoutes from "./src/Routes/systemroutes.js";
import { ENV } from "./env.js";
import { DbConnection } from "./Db.js";
import initializeSystem from "./src/scripts/initilaztion.js";

const app = express();

const Port = ENV.PORT || 3000;

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: [
      "Content-type",
      "Authorization",
      "cache-control",
      "Expires",
      "pragma",
    ],
    credentials: true,
  }),
);

DbConnection();

app.use("/api/system", systemRoutes);
app.use("/api/products", ProductsRoutes);
app.use("/api/services", ServiceRoutes);
app.use("/api/authentication", authRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/worker", workerRoutes);

const startServer = async () => {
  await initializeSystem();
  app.listen(Port, () => {
    console.log(`Sever is running  at port ${Port}`);
  });
};

startServer();
