import express, { Request, Response, NextFunction } from "express";
import adminController from "../controller/admin";
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

      // calling the adminController
      const result: any = await adminController.registerAdmin(req.body);
      // will throw an error if error is received
      if (result.isError) {
        throw result.error;
      }
      // will throw success status if process is successful
      res.status(200).json({
        status: 200,
        message: "Admin registered successfully!",
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
        // getting request body
        const { email, password } = req.body;
        // if either of the parameter is missing, throw an error
        if (!email || !password) {
          throw {
            statusCode: 400,
            customMessage: "All parameters are required",
          };
        }
        // call controller to fetch result
        const result: any = await adminController.login(req.body);
        // if result is not available, throw error
        if (result.isError) {
          throw result.error;
        }
  
        // will throw success code if process id successful
        res.status(200).json({
          statusCode: 200,
          customMessage: "Admin successfully logged in!",
          result: result.data
        });
      } catch (error) {
        next(error);
      }
    }
  );
  
export default router;