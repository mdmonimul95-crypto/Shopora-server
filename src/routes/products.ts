import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../services/products";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const product = await createProduct(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error: any) {
  console.error("CREATE PRODUCT ERROR:", error);

  res.status(500).json({
    success: false,
    message: "Failed to create product",
    error: error?.message || "Unknown error",
  });
}
});


//GET /api/v1/products

router.get("/" , async(req, res)=>{
    try{
        const products = await getProducts();

        res.status(200).json({
            success:true,
            message: "Products Fetched Successfully",
            data:products,
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message: "Failed to fetch products"
        })
    }
})


// GET /api/v1/products/:id

router.get("/:id" , async(req, res) => {
    try{
        const  {id} = req.params
        const product = await getProductById(id)

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not Found"
            })
        }

        return  res.status(200).json({
            success: true,
            message: "Product fetched Successfully",
            data:product,
        })
    }catch(err){
        console.log("Get product by id ERROR" , err)

        return res.status(500).json({
            success: false,
            message: "Failed to fetch product",
        })
    }
})


router.patch("/:id" , async(req, res) => {
    try{
        const product = await updateProduct(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Product update successfully",
            data:product
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to update product"
        })
    }
})


router.delete("/:id" , async(req, res) =>{
    try{
        const product = await deleteProduct(req.params.id);

        res.status(200).json({
            success : true,
            message: "Product deleted successfully",
            data:product
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to delete Product"
        })
    }
})

export default router;
