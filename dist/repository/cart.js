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
exports.fetchProductDetails = exports.fetchCartByUser = exports.fetchCartDetails = exports.updateCart = exports.fetchCart = exports.addToCart = void 0;
const cart_1 = require("../db-init/model/cart");
const product_1 = require("../db-init/model/product");
/**
 * @description mongoose method for add a cart
 * @param cartDetails
 * @returns
 */
exports.addToCart = (cartDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cart_1.Cart.create(cartDetails);
        return { data: result };
    }
    catch (error) {
        console.error(error);
    }
});
/**
 * @description mongoose method for fetching the cart
 * @param user
 * @returns
 */
exports.fetchCart = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cart_1.Cart.findOne({ user: user });
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
/**
 * @description mongoose method for updating the cart
 * @param cartDetails
 * @returns
 */
exports.updateCart = (cartDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cart_1.Cart.findOneAndUpdate({ cartDetails }, {
            $push: {
                cartItems: cartDetails.cartItems,
            },
        });
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchCartDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cart_1.Cart.find({});
        return { data: result };
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchCartByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cart_1.Cart.findOne({ user: id });
        // .select("_id_type, quantity")
        // console.log(result, "result")
        return {
            success: true,
            data: result
        };
    }
    catch (error) {
        return { success: false, error };
    }
});
exports.fetchProductDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_1.Product.findOne({ _id: id })
            .select("_id_type, name price");
        console.log(id, result, "fetch by idddddddd");
        return { success: true,
            data: result };
    }
    catch (error) {
        return { success: false };
    }
});
// export const fetchProductDetails = async(id: any) =>{
//   try{
//     const result = await Product.aggregate(cartItems:{$map:{}})
//   }catch(error){
//     return{success: false}
//   }
// }
//# sourceMappingURL=cart.js.map