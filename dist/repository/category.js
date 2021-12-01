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
exports.updateCategory = exports.deleteCategory = exports.fetchCategoryById = exports.fetchCategoryName = exports.fetchCategory = exports.createCategory = void 0;
const categories_1 = require("../db-init/model/categories");
/**
 * @description mongoose method for creating a category
 * @param categoryDetails
 * @returns
 */
exports.createCategory = (categoryDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield categories_1.Category.create(categoryDetails);
        return true;
    }
    catch (error) {
        console.log(error);
    }
});
/**
 * @description mongoose method for fetching all the categories
 * @returns
 */
exports.fetchCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield categories_1.Category.find({});
        return { data: result, success: true };
    }
    catch (error) {
        console.log(error);
    }
});
/**
 * @description mongoose method for fetching category by category name
 * @param name
 * @returns
 */
exports.fetchCategoryName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield categories_1.Category.findOne({ name: name });
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
/**
 * @description mongoose method for fetching category by category id
 * @returns
 */
exports.fetchCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield categories_1.Category.findById({ id: id });
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
/**
 * @description mongoose emthod for deleting category
 * @param id
 * @returns
 */
exports.deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield categories_1.Category.findByIdAndDelete(id);
        return true;
    }
    catch (error) {
        console.log(error);
    }
});
/**
 * @description mongoose method for updating category
 * @param categoryDetails
 * @returns
 */
exports.updateCategory = (categoryDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield categories_1.Category.findByIdAndUpdate(categoryDetails.id, {
            name: categoryDetails.name,
        });
        return true;
    }
    catch (error) {
        console.log(error);
    }
});
//# sourceMappingURL=category.js.map