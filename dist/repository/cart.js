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
exports.updateCart = exports.fetchCart = exports.addToCart = void 0;
const cart_1 = require("../db-init/model/cart");
exports.addToCart = (cartDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cart_1.Cart.create(cartDetails);
        return { data: result };
    }
    catch (error) {
        console.error(error);
    }
});
exports.fetchCart = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cart_1.Cart.findOne({ user: user });
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateCart = (cartDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cart_1.Cart.findOneAndUpdate({ cartDetails }, {
            "$push": {
                cartItems: cartDetails.cartItems
            }
        });
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
//# sourceMappingURL=cart.js.map