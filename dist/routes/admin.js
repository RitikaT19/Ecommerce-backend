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
const admin_1 = __importDefault(require("../controller/admin"));
const router = express_1.default.Router();
router.post("/sign_up", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield admin_1.default.registerAdmin(req.body);
        // will throw an error if error is received
        if (result.isError) {
            throw result.error;
        }
        // will throw success status if process is successful
        res.status(200).json({
            status: 200,
            message: "Admin registered successfully!",
        });
    }
    catch (error) {
        next(error);
    }
}));
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield admin_1.default.login(req.body);
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
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=admin.js.map