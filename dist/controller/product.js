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
exports.fetchProductByCategoryId = exports.fetchProductById = exports.fetchProduct = void 0;
const productRepository = __importStar(require("../repository/product"));
const createProduct = (productDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // call repo to fetch product name
        const existingProduct = yield productRepository.fetchProduct(productDetails.name);
        // if product name exists, throw an error
        if (existingProduct) {
            throw {
                statusCode: 400,
                customMessage: "Product already exists",
            };
        }
        // if product name does not exists, call repo to create a new product
        const result = yield productRepository.createProduct(productDetails);
        // if result is not received, throw an errror
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
exports.fetchProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // call repo to fetch product details
        const result = yield productRepository.fetchProductDetails();
        // if result is not received, throw an error
        if (!result) {
            throw {
                statusCode: 400,
                customMessage: "Some error occured while fetching products",
            };
        }
        return { isError: false, data: result.data };
    }
    catch (error) {
        return { isError: true };
    }
});
exports.fetchProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // call repo to fetch product by id
        const result = yield productRepository.fetchProductById(id);
        // if result is not found, throw error
        if (!result) {
            throw {
                statusCode: 400,
                customMessage: "Some error occured while fetching products",
            };
        }
        return { isError: false, data: result.data };
    }
    catch (error) {
        return { isError: true };
    }
});
exports.fetchProductByCategoryId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // call repo to fetch category id
        const result = yield productRepository.fetchCategoryById(id);
        // if result is not received, throw an error
        if (!result.success) {
            throw {
                statusCode: 400,
                customMessage: "category not found",
            };
        }
        // if category id is found, then call the repo to fetch the product
        const productInformation = yield productRepository.fetchProductByCategoryId(id);
        // if productInformation is not success, throw an error
        if (!productInformation.success) {
            throw {
                statusCode: 400,
                customMessage: "products not found",
            };
        }
        return { isError: false, data: productInformation.data };
    }
    catch (error) {
        return { isError: true, error };
    }
});
exports.default = {
    createProduct,
    fetchProduct: exports.fetchProduct,
    fetchProductByCategoryId: exports.fetchProductByCategoryId,
    fetchProductById: exports.fetchProductById,
};
//# sourceMappingURL=product.js.map