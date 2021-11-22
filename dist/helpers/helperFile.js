"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = exports.authenticateToken = exports.getJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = "E_COMMERCE_SECRET_KEY";
exports.getJWT = (payload) => {
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY, {
        expiresIn: "1h",
    });
};
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        throw {
            statusCode: 401,
            customMessage: "Token is required",
        };
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        next({
            statusCode: 403,
            customMessage: "Unauthorized  access",
        });
    }
};
exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        throw {
            statusCode: 400,
            customMessage: "Access denied!",
        };
    }
};
//# sourceMappingURL=helperFile.js.map