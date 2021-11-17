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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt = require('bcryptjs');
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    hash_password: {
        type: String,
        required: true,
        min: 8,
        max: 20,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "admin",
    },
}, {
    timestamps: true,
});
// hashing the password
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // this will hash the password if the password is modified in the future
        if (this.isModified('password')) {
            this.hash_password = yield bcrypt.hash(this.password, 10);
        }
        next();
    });
});
userSchema.methods = {
    authenticate: (password, hash_password) => {
        return bcrypt.compareSync(password, hash_password);
    }
};
exports.User = mongoose_1.default.model("user", userSchema);
//# sourceMappingURL=user.js.map