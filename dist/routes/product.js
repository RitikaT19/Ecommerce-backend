"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helperFile_1 = require("../helpers/helperFile");
const product_1 = __importDefault(require("../controller/product"));
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const router = express_1.default.Router();
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(path.dirname(__dirname), "uploads"));
        console.log("hello");
        // console.log(path.dirname(__dirname))
    },
    filename: (req, file, callback) => {
        callback(null, shortid.generate() + "-" + file.originalName);
    },
});
const upload = multer({ storage });
router.post("/", helperFile_1.authenticateToken, upload.single("productPicture"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productObj = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
            productPicture: req.file,
        };
        const result = yield product_1.default.createProduct(productObj);
        if (result.isError) {
            throw result.error;
        }
        res.status(200).json({
            customCode: 200,
            customMessage: "product created successfully",
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=product.js.map