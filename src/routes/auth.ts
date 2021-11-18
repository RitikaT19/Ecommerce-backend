import express, { Request, Response, NextFunction, request } from "express";
import userController from "../controller/auth";
const router = express.Router();

router.post(
  "/sign_up",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // getting the request body
      const { firstName, lastName, email, password } = req.body;
      // if any parameter is unavailable, throw an error
      if (!firstName || !lastName || !email || !password) {
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

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw {
          statusCode: 400,
          customMessage: "All parameters are required",
        };
      }

      const result: any = await userController.login(req.body);
      if (result.isError) {
        throw result.error;
      }

      // will throw success code if process id successful
      res.status(200).json({
        statusCode: 200,
        customMessage: "User successfully logged in!",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
