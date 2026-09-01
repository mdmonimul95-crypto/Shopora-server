import { Router } from "express";
import { createCategories, deleteCategories, getCategories, updateCategories } from "../services/categories";



const router = Router()


router.get("/" , async(req, res)=>{
    try{
        const categories = await getCategories();

        res.status(200).json({
            success: true,
            message: "Categories Fetched Successfully",
            data:categories
        })
    }catch(err){
        console.error(err)

        res.status(500).json({
            success: false,
            message: "Failed to fetch categories"
        })
    }
})



router.post("/" , async(req, res) =>{
    try{
        const categories = await createCategories(req.body);

        res.status(200).json({
            success: true,
            message: "Category Created Successfully",
            data:categories
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: "Failed to create category",
            error: err?.message
        })
    }
})


router.patch("/:id", async (req, res) => {
  try {
    const category = await updateCategories(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update category"
    });
  }
});


router.delete("/:id" , async(req, res) => {
    try{
        const category = await deleteCategories(req.params.id)

        res.status(200).json({
            success: true, 
            message: "Category deleted successfully",
            data: category
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Failed to delete category",
        })
    }
})


export default router;