import express, { Request, Response, NextFunction } from "express";
import { authenticateToken } from "../helpers/helperFile";
import cartController from "../controller/cart";
const router = express.Router();

// route for adding products in the cart
router.post(
  "/",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // request body
      const cartObj = { user: req.user._id, cartItems: req.body.cartItems };
      // console.log(cartObj,"cart objecttttttt")
      // calling cartController
      const result: any = await cartController.addToCart(cartObj);
      // if there is error, return error
      if (result.isError) {
        throw result.error;
      }
      // if the process is successful, provide success status
      res.status(200).json({
        statusCode: 200,
        customMessage: "Added to the cart!!",
        data: result.data,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", async(req:Request, res: Response, next: NextFunction) =>{
  try{
    // call controller to fetch cart
    const result: any = await cartController.fetchCart();
    // if result is not received, throw error
    if (result.isError){
      throw result.error
    }
    // if process is successful, give succuss status code
    res.status(200).json({
      statusCode: 200,
      customMessage: "Cart fetched successfully",
      data: result.data, 
    })
  }catch(error){
    next(error)
  }
})

router.get(`/userCart`, authenticateToken, async(req:Request, res: Response, next: NextFunction) =>{
  try{
    const id = req.user._id;
    // call controller to fetch cart by user id
    const result: any = await cartController.fetchCartByUser(id);
    // if result is not received, throw error
    if (result.isError){
      throw result.error
    }
    // if the process is successful, give success status
    res.status(200).json({
      statusCode: 200,
      customMessage: "User Cart fetched successfully",
      data: result.data, 
    })
  }catch(error){
    next(error)
  }
})

export default router;
