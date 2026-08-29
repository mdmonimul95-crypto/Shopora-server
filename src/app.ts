import cors from "cors"
import express from "express";
import productsRouter from "./routes/products";
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

export default app