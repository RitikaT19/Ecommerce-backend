"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true
    },
    price: {
        type: Number,
        trim: true,
    },
    quantity: {
        type: Number
    },
    description: {
        type: String,
        trim: true,
    },
    productPicture: { img: { type: String } },
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category" },
    createdBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    updatedAt: Date,
}, { timestamps: true });
exports.Product = mongoose_1.default.model("product", productSchema);
//# sourceMappingURL=product.js.map