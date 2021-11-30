import express, { Request, Response, NextFunction } from "express";
import * as productRepository from "../repository/product"
import { authenticateToken } from "../helpers/helperFile";
import productController from "../controller/product";
import slugify from "slugify";
const router = express.Router();

router.post(
  "/",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productObj = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
        productPicture: req.file,
        createdBy: req.user._id
      };

      const result: any = await productController.createProduct(productObj);
      if (result.isError) {
        throw result.error;
      }
      res.status(200).json({
        customCode: 200,
        customMessage: "product created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/get_product",
async(req: Request, res: Response, next: NextFunction) =>{
  try{
    const result: any = await productController.fetchProduct();
    if(result.isError){
      throw result.error;
    }
    res.status(200).json({
      status: 200,
      customMessage: "Products fetched successfully",
      data: result.data, 
    })
  }catch(error){
    next(error)
  }
})

router.get("/:id", async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const {id} = req.params;
    const result: any = await productController.fetchProductByCategoryId(id)
    if(result.isError){
      throw result.error; 
    }
    res.status(200).json({
      statusCode: 200,
      customMessage: "Product fetched successfully",
      data: result.data,
    })
  }catch(error){
    next(error)
  }
})

// router.get("/:id", productRepository.getProductsById);

export default router;
