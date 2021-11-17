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
const userRepository = __importStar(require("../repository/userRepository"));
const registerUser = (userDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingEmail = yield userRepository.fetchUser(userDetails.email);
        // if the user email exists, throw an error
        if (existingEmail) {
            throw {
                statusCode: 400,
                customMessage: "email address already exists",
            };
        }
        const result = yield userRepository.userAdded(userDetails);
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
exports.default = { registerUser };
//# sourceMappingURL=userController.js.map