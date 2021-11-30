import express, { Request, Response, NextFunction } from "express";
import { authenticateToken } from "../helpers/helperFile";
import categoryController from "../controller/category";
import slugify from "slugify";
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
      const { id } = req.params;
      if (!id) {
        throw {
          statusCode: 400,
          customMessage: "Category not available",
        };
      }

      const result: any = categoryController.deleteCategory(id);
      if (result.isError) {
        throw result.error;
      }

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
    const { id, name } = req.body;
    if (!id || !name) {
      throw {
        statusCode: 400,
        customMessage: " All parameters are required",
      };
    }

    const result: any = await categoryController.updateCategory(req.body);
    if (result.isError) {
      throw result.isError;
    }

    res.status(200).json({
      statusCode: 200,
      customMessage: "Category updated successfully!",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
