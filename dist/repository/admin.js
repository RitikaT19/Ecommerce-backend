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
exports.adminAdded = exports.fetchAdmin = void 0;
const user_1 = require("../db-init/model/user");
exports.fetchAdmin = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield user_1.User.findOne({ email: email });
        return result;
    }
    catch (error) {
        return false;
    }
});
exports.adminAdded = (adminDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.User.create({
            firstName: adminDetails.firstName,
            lastName: adminDetails.lastName,
            username: Math.random().toString(),
            email: adminDetails.email,
            password: adminDetails.password,
            role: "admin"
        });
        return true;
    }
    catch (error) {
        console.log(error);
    }
});
//# sourceMappingURL=admin.js.map