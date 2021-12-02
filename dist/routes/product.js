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
const router = express_1.default.Router();
router.post("/", helperFile_1.authenticateToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield product_1.default.createProduct(productObj);
        // if result is not received, throw error
        if (result.isError) {
            throw result.error;
        }
        // if process is successful, give success code
        res.status(200).json({
            customCode: 200,
            customMessage: "product created successfully",
        });
    }
    catch (error) {
        next(error);
    }
}));
router.get("/get_product", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // call controller to fetch product
        const result = yield product_1.default.fetchProduct();
        // if result is not received, throw error
        if (result.isError) {
            throw result.error;
        }
        res.status(200).json({
            status: 200,
            customMessage: "Products fetched successfully",
            data: result.data,
        });
    }
    catch (error) {
        next(error);
    }
}));
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get id into params
        const { id } = req.params;
        // call controller 
        const result = yield product_1.default.fetchProductByCategoryId(id);
        // if result is not received, throw error
        if (result.isError) {
            throw result.error;
        }
        res.status(200).json({
            statusCode: 200,
            customMessage: "Product fetched successfully",
            data: result.data,
        });
    }
    catch (error) {
        next(error);
    }
}));
router.get("/prod/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // take id in params
        const { id } = req.params;
        const result = yield product_1.default.fetchProductById(id);
        // if result is not received, throw error
        if (result.isError) {
            throw result.error;
        }
        res.status(200).json({
            statusCode: 200,
            customMessage: "Product fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // take id in params
        const { id } = req.params;
        const result = yield product_1.default.deleteProduct(id);
        // if result is not received, then throw an error
        if (!result) {
            throw {
                statusCode: 400,
                customMessage: "Unable to delete product"
            };
        }
        res.status(200).json({
            statusCode: 200,
            customMessage: "Product deleted successfully!"
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=product.js.map