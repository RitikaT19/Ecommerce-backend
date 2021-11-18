"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.getJWT = (payload) => {
    return jsonwebtoken_1.default.sign(payload, "E_COMMERCE_SECRET_KEY", {
        expiresIn: "1h",
    });
};
//# sourceMappingURL=get-jwt.js.map