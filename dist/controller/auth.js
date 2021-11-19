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
const user_1 = require("../db-init/model/user");
const get_jwt_1 = require("../helpers/get-jwt");
const userRepository = __importStar(require("../repository/auth"));
const bcrypt = require("bcrypt");
const registerUser = (userDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // validate user
        const userValidation = user_1.validateUser(userDetails);
        // if there is error, throw error
        if (userValidation.error) {
            throw {
                statusCode: 400,
                customMessage: userValidation.error.details[0].message
            };
        }
        const existingEmail = yield userRepository.fetchUser(userDetails.email);
        // if the user email exists, throw an error
        if (existingEmail) {
            throw {
                statusCode: 400,
                customMessage: "email address already exists",
            };
        }
        let { firstName, lastName, email, password } = userDetails;
        password = yield bcrypt.hash(password, 10);
        const result = yield userRepository.userAdded({
            firstName,
            lastName,
            email,
            password,
        });
        if (!result) {
            throw {
                statusCode: 400,
                customMessage: "Unable to register. Please try after some time",
            };
        }
        return { isError: false };
    }
    catch (error) {
        return { isError: true, error };
    }
});
const login = (userDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // calling user repository to fetch user detail
        const result = yield userRepository.fetchUser(userDetails.email);
        // if user with the given email id not available, throw error
        if (!result) {
            throw {
                statusCode: 400,
                customMessage: "User not found!",
            };
        }
        // comparing password provided by the user and password stored in the db
        const comparePassword = yield bcrypt.compare(userDetails.password, result.password);
        // if password are same, then generate token
        if (comparePassword) {
            const token = get_jwt_1.getJWT({
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                username: result.username,
                role: result.role,
            });
            return { result: result.data, data: token };
        }
        // else throw error
        else {
            throw {
                statusCode: 400,
                customMessage: "Unauthorized login",
            };
        }
    }
    catch (error) {
        return { isError: true, error };
    }
});
exports.default = { registerUser, login };
//# sourceMappingURL=auth.js.map