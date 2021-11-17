"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// [Dilesh Tanna - 05/10/2020] - Class to instantiate encryption and decryption functions and keys. Exports helpers methods to decrypt payload
const node_rsa_1 = __importDefault(require("node-rsa"));
const fs_1 = __importDefault(require("fs"));
class CryptoGraphy {
    constructor() {
        // Method to decrypt a given string
        this.decryptMessage = (encryptedMessage) => {
            const decryptedMessage = this.privateKeyCrypto.decrypt(encryptedMessage, "utf8");
            return decryptedMessage;
        };
        // Method to encrypt a given string
        this.encryptMessage = (message) => {
            const encryptedMessage = this.publicKeyCrypto.encrypt(message, "base64");
            return encryptedMessage;
        };
        this.getPublicKey = () => {
            return this.publicKey;
        };
        this.publicKey = fs_1.default.readFileSync(`${process.cwd()}/rsa_2048_pub.pem`, {
            encoding: "utf8",
        });
        this.privateKey = fs_1.default.readFileSync(`${process.cwd()}/rsa_2048_priv.pem`, {
            encoding: "utf8",
        });
        this.privateKeyCrypto = new node_rsa_1.default(this.privateKey);
        this.publicKeyCrypto = new node_rsa_1.default(this.publicKey);
    }
}
exports.default = CryptoGraphy;
//# sourceMappingURL=cryptography.js.map