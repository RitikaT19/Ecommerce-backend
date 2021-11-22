import express, { Request, Response, NextFunction } from "express";
import { authenticateToken } from "../helpers/helperFile";
import productController from "../controller/product";
import slugify from "slugify";
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req: Request, file: any, callback: any) => {
    callback(null, path.join(path.dirname(__dirname), "uploads"));
    console.log("hello");
    // console.log(path.dirname(__dirname))
  },
  filename: (req: Request, file: any, callback: any) => {
    callback(null, shortid.generate() + "-" + file.originalName);
  },
});

const upload = multer({ storage });

router.post(
  "/",
  authenticateToken,
  upload.single("productPicture"),
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

export default router;
