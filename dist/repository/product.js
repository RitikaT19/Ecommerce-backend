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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchProductByCategoryId = exports.fetchCategoryById = exports.fetchProductById = exports.fetchProductDetails = exports.createProduct = exports.fetchProduct = void 0;
const product_1 = require("../db-init/model/product");
const categories_1 = require("../db-init/model/categories");
/**
 * @description mongoose method for fetching product by name
 * @param name
 * @returns
 */
exports.fetchProduct = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_1.Product.findOne({ name: name });
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
/**
 * @description mongoose method for creating product
 * @param productDetails
 * @returns
 */
exports.createProduct = (productDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_1.Product.create(productDetails);
        return true;
    }
    catch (error) {
        console.log(error);
    }
});
/**
 * @description mongoose method for fetching all the products
 * @returns
 */
exports.fetchProductDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_1.Product.find({});
        return { data: result };
    }
    catch (error) {
        console.log(error);
    }
});
/**
 * @description mongoose method for fetching product by id
 * @param id
 * @returns
 */
exports.fetchProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_1.Product.findById(id);
        //  .select("_id_type")
        return { success: true,
            data: result };
    }
    catch (error) {
        return { success: false };
    }
});
/**
 * @description mongoose emthod for fetching category by id
 * @param id
 * @returns
 */
exports.fetchCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield categories_1.Category.findById(id)
            .select("_id_type");
        return {
            success: true,
            data: result
        };
    }
    catch (error) {
        return { success: false };
    }
});
/**
 * @description mongoose method for fetching category from product
 * @param category
 * @returns
 */
exports.fetchProductByCategoryId = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_1.Product.find({ category: category });
        return {
            success: true,
            data: result
        };
    }
    catch (error) {
        return { success: false };
    }
});
//# sourceMappingURL=product.js.map