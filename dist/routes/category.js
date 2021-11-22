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
const category_1 = __importDefault(require("../controller/category"));
const slugify_1 = __importDefault(require("slugify"));
const router = express_1.default.Router();
router.post("/", helperFile_1.authenticateToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // getting the request body
        const categoryObj = {
            name: req.body.name,
            slug: slugify_1.default(req.body.name),
        };
        // calling the categoryController
        const result = yield category_1.default.createCategory(categoryObj);
        if (result.isError) {
            throw result.error;
        }
        // will throw success status if process is successful
        res.status(200).json({
            status: 200,
            customMessage: "Category created successfully!",
        });
    }
    catch (error) {
        next(error);
    }
}));
router.get("/get_category", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // calling category controller
        const result = yield category_1.default.fetchCategory();
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
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=category.js.map