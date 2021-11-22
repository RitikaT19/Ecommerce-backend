"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJWT = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET_KEY = "E_COMMERCE_SECRET_KEY";
exports.getJWT = (payload) => {
    return jsonwebtoken_1.default.sign(payload, exports.SECRET_KEY, {
        expiresIn: "1h",
    });
};
//# sourceMappingURL=get-jwt.js.map