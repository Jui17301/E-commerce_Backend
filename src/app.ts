import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/Product/product.route";
import { OrderRoutes } from "./modules/Order/order.route";
const app = express();

// parsers
app.use(express.json());

//routes
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
