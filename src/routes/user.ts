import express, { Request, Response, NextFunction } from "express";
import userController from "../controller/userController";
const router = express.Router();

router.post(
  "/sign_in",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // getting the request body
      const { firstName, lastName, email, hash_password } = req.body;
      // if any parameter is unavailable, throw an error
      if (!firstName || !lastName || !email || !hash_password) {
        throw {
          statusCode: 400,
          customMessage: "All parameters are required",
        };
      }

      // calling the userController
      const result: any = await userController.registerUser(req.body);
      // will throw an error if error is received
      if (result.isError) {
        throw result.error;
      }
      // will throw success status if process is successful
      res.status(200).json({
        status: 200,
        message: "User registered successfully!",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
