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
const userController_1 = __importDefault(require("../controller/userController"));
const router = express_1.default.Router();
router.post("/sign_in", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield userController_1.default.registerUser(req.body);
        // will throw an error if error is received
        if (result.isError) {
            throw result.error;
        }
        // will throw success status if process is successful
        res.status(200).json({
            status: 200,
            message: "User registered successfully!",
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=user.js.map