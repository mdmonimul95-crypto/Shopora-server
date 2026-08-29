import { Router } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../services/products";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const product = await createProduct(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create product",
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
