import express, { Request, Response, NextFunction } from "express";
import { authenticateToken } from "../helpers/helperFile";
import productController from "../controller/product";
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

      // call controller
      const result: any = await productController.createProduct(productObj);
      // if result is not received, throw error
      if (result.isError) {
        throw result.error;
      }
      // if process is successful, give success code
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
    // call controller to fetch product
    const result: any = await productController.fetchProduct();
    // if result is not received, throw error
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
    // get id into params
    const {id} = req.params;
    // call controller 
    const result: any = await productController.fetchProductByCategoryId(id)
    // if result is not received, throw error
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


router.get("/prod/:id", async(req: Request, res: Response, next: NextFunction)=>{
  try{
    // take id in params
    const {id} = req.params;
    const result: any = await productController.fetchProductById(id)
    // if result is not received, throw error
    if(result.isError){
      throw result.error; 
    }
    res.status(200).json({
      statusCode: 200,
      customMessage: "Product fetched successfully",
      data: result,
    })
  }catch(error){
    next(error)
  }
})

router.delete("/:id", async(req:Request, res: Response, next:NextFunction)=>{
  try{
    // take id in params
    const {id} = req.params
    const result: any = await productController.deleteProduct(id);
    // if result is not received, then throw an error
    if(!result){
      throw{
        statusCode: 400,
        customMessage: "Unable to delete product"
      }
    }

    res.status(200).json({
      statusCode: 200,
      customMessage: "Product deleted successfully!"
    })
  }catch(error){
    next(error)
  }
})

router.put("/", async(req:Request, res: Response, next: NextFunction)=>{
  try{
    const {id, name, price, quantity, description, category} = req.body;
    if(!(id || name || price || quantity || description || category)){
      throw{
        statusCode: 400,
        customMessage: "All parameters are required"
      }
    }
    const result:any = await productController.updateProduct(req.body);
    if(!result){
      throw{
        statusCode: 400,
        customMessage: "could not update the product"
      }
    }

    res.status(200).json({
      statusCode: 200,
      customMessage: "Product updated successfully"
    })
  }catch(error){
    next(error)
  }
})

export default router;
