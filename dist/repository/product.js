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
exports.createProduct = exports.fetchProduct = void 0;
const product_1 = require("../db-init/model/product");
exports.fetchProduct = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_1.Product.findOne({ name: name });
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
exports.createProduct = (productDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_1.Product.create(productDetails);
        return true;
    }
    catch (error) {
        console.log(error);
    }
});
//# sourceMappingURL=product.js.map