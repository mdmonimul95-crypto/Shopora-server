import cors from "cors"
import express from "express";
import productsRouter from "./routes/products";
import categoryRoutes from "./routes/catetories";
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


export default app