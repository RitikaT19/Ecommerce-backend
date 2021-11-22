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
exports.fetchSlug = exports.fetchCategory = exports.createCategory = void 0;
const categories_1 = require("../db-init/model/categories");
exports.createCategory = (categoryDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield categories_1.Category.create(categoryDetails);
        return true;
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield categories_1.Category.find({});
        return { data: result, success: true };
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchSlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield categories_1.Category.findOne({ slug: slug });
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
//# sourceMappingURL=category.js.map