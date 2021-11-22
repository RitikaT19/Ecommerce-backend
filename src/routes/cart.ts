import express, { Request, Response, NextFunction } from "express";
import { authenticateToken } from "../helpers/helperFile";
import cartController from "../controller/cart";
const router = express.Router();

router.put(
  "/",
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cartObj = { user: req.user._id, cartItems: req.body.cartItems };

      const result: any = await cartController.addToCart(cartObj);
      if (result.isError) {
        throw result.error;
      }
      res.status(200).json({
        statusCode: 200,
        customMessage: "Added to the cart!!",
        data: result.data
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
