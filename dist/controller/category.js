"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategory = exports.deleteCategory = void 0;
const categoryRepository = __importStar(require("../repository/category"));
const createCategory = (categoryDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingSlug = yield categoryRepository.fetchCategoryName(categoryDetails.name);
        if (existingSlug) {
            throw {
                statusCode: 400,
                customMessage: "Category name already exists",
            };
        }
        const result = yield categoryRepository.createCategory(categoryDetails);
        if (!result) {
            throw {
                statusCode: 400,
                customMessage: "Some error occurred",
            };
        }
        return { isError: false };
    }
    catch (error) {
        return { isError: true, error };
    }
});
const fetchCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield categoryRepository.fetchCategory();
        if (!result.success) {
            throw {
                statusCode: 400,
                customMessage: "Unable to fetch categories",
            };
        }
        return {
            isError: false,
            data: result.data,
        };
    }
    catch (error) {
        return { isError: true, error };
    }
});
exports.deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield categoryRepository.fetchCategoryById(id);
        if (result) {
            throw {
                statusCode: 400,
                customMessage: "Category not found",
            };
        }
        const categoryDeleted = yield categoryRepository.deleteCategory(id);
        if (!categoryDeleted) {
            throw {
                statusCode: 400,
                customMessage: "Unable to delete category",
            };
        }
    }
    catch (error) {
        return { isError: true, error };
    }
});
exports.updateCategory = (categoryDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield categoryRepository.fetchCategoryById(categoryDetails.id);
        if (!result) {
            throw {
                statusCode: 400,
                customMessage: "category not found"
            };
        }
        // await categoryRepository.updateCategory(categoryDetails);
        // const updatedCategory: any = await categoryRepository.fetchCategoryById(categoryDetails.id)
        // const categoryUpdate  = ({
        //     _id: updatedCategory._id,
        //     name: updatedCategory.name
        // })
        return { isError: false, data: result };
    }
    catch (error) {
        return { isError: true, error };
    }
});
exports.default = {
    createCategory,
    fetchCategory,
    deleteCategory: exports.deleteCategory,
    updateCategory: exports.updateCategory,
};
//# sourceMappingURL=category.js.map