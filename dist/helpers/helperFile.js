"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = exports.authenticateToken = exports.getJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = "E_COMMERCE_SECRET_KEY";
// create jwt
exports.getJWT = (payload) => {
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY, {
        expiresIn: "1d",
    });
};
// function for authenticating the token
exports.authenticateToken = (req, res, next) => {
    // request tokein in authentication header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // if token is not provided, then throw an error
    if (token == null) {
        throw {
            statusCode: 401,
            customMessage: "Token is required",
        };
    }
    try {
        // verify token
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