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
const cartRepository = __importStar(require("../repository/cart"));
const addToCart = (cartDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartExists = yield cartRepository.fetchCart(cartDetails.user);
        if (cartExists) {
            // const itemExists = await cartRepository.fetchItem(cartDetails.cartItems)
            // if(itemExists){
            //     throw{
            //     }
            // }
            console.log(cartDetails.cartItems, "products");
            const update = yield cartRepository.updateCart(cartDetails);
            if (!update) {
                throw {
                    statusCode: 400,
                    customMessage: "Wasn't able to update cart"
                };
            }
        }
        else {
            const result = yield cartRepository.addToCart(cartDetails);
            if (!result) {
                throw {
                    statusCode: 400,
                    customMessage: "Wasn't able to add to the cart",
                };
            }
        }
        return { isError: false };
    }
    catch (error) {
        return { isError: true, error };
    }
});
exports.default = { addToCart };
//# sourceMappingURL=cart.js.map