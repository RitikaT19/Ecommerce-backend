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
const cart_1 = __importDefault(require("../controller/cart"));
const router = express_1.default.Router();
// route for adding products in the cart
router.post("/", helperFile_1.authenticateToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // request body
        const cartObj = { user: req.user._id, cartItems: req.body.cartItems };
        console.log(cartObj, "cart objecttttttt");
        // calling cartController
        const result = yield cart_1.default.addToCart(cartObj);
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
    }
    catch (error) {
        next(error);
    }
}));
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // call controller to fetch cart
        const result = yield cart_1.default.fetchCart();
        // if result is not received, throw error
        if (result.isError) {
            throw result.error;
        }
        // if process is successful, give succuss status code
        res.status(200).json({
            statusCode: 200,
            customMessage: "Cart fetched successfully",
            data: result.data,
        });
    }
    catch (error) {
        next(error);
    }
}));
router.get(`/userCart`, helperFile_1.authenticateToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user._id;
        // call controller to fetch cart by user id
        const result = yield cart_1.default.fetchCartByUser(id);
        // if result is not received, throw error
        if (result.isError) {
            throw result.error;
        }
        // if the process is successful, give success status
        res.status(200).json({
            statusCode: 200,
            customMessage: "User Cart fetched successfully",
            data: result.data,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=cart.js.map