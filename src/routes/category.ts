import express, { Request, Response, NextFunction } from "express";
import { authenticateToken } from "../helpers/helperFile";
import categoryController from "../controller/category";
const router = express.Router();

router.post(
  "/",
  authenticateToken,

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // getting the request body
      const categoryObj = {
        name: req.body.name,
      };

      // calling the categoryController
      const result: any = await categoryController.createCategory(categoryObj);
      if (result.isError) {
        throw result.error;
      }
      // will throw success status if process is successful
      res.status(200).json({
        status: 200,
        customMessage: "Category created successfully!",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/get_category",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // calling category controller
      const result: any = await categoryController.fetchCategory();
      // will throw an error if there's any error in result
      if (result.isError) {
        throw result.error;
      }
      // will give success status if the process is successful
      res.status(200).json({
        status: 200,
        customMessage: "Categories fetched successfully",
        data: result.data,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // take id in params
      const { id } = req.params;
      // if id is not given, throw error
      if (!id) {
        throw {
          statusCode: 400,
          customMessage: "Category not available",
        };
      }
      // if result is not rerceived, throw error
      const result: any = categoryController.deleteCategory(id);
      if (result.isError) {
        throw result.error;
      }
      // if the process is successful, give success code
      res.status(200).json({
        statusCode: 200,
        customMessage: "Category deleted successfully!",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get request body
    const { id, name } = req.body;
    // if either of the parameter is missing, throw error
    if (!id || !name) {
      throw {
        statusCode: 400,
        customMessage: "All parameters are required",
      };
    }
    // call controller
    const result: any = await categoryController.updateCategory(req.body);
    if (result.isError) {
      throw result.isError;
    }
    // if process is successful, give status code
    res.status(200).json({
      statusCode: 200,
      customMessage: "Category updated successfully!",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
