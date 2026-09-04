import cors from "cors"
import express from "express";
import productsRouter from "./routes/products";
import categoryRoutes from "./routes/catetories";
import brandRoutes from "./routes/brands";
import searchRouter from "./routes/search";
import ordersRouter  from "./routes/orders";
import sellerOrdersRouter from "./routes/sellerOrders";
const app = express();


app.use(cors())
app.use(express.json())


app.get("/", (req, res) =>{
    res.json({
        success: true,
        message: "welcome"
    })
})

app.use("/api/v1/products", productsRouter);
app.use("/api/v1/categories" , categoryRoutes)
app.use("/api/v1/brands" , brandRoutes)
app.use("/api/v1/search" , searchRouter)
app.use("/api/v1/orders" , ordersRouter)
app.use("/api/v1/seller/orders", sellerOrdersRouter);


export default app