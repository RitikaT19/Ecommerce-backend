// [Dilesh Tanna - 05/10/2020] - Class to instantiate encryption and decryption functions and keys. Exports helpers methods to decrypt payload
import NodeRSA from "node-rsa";
import fs from "fs";

export default class CryptoGraphy {
  private privateKeyCrypto: NodeRSA;
  private publicKeyCrypto: NodeRSA;
  private privateKey: string;
  private publicKey: string;
  constructor() {
    this.publicKey = fs.readFileSync(`${process.cwd()}/rsa_2048_pub.pem`, {
      encoding: "utf8",
    });
    this.privateKey = fs.readFileSync(`${process.cwd()}/rsa_2048_priv.pem`, {
      encoding: "utf8",
    });
    this.privateKeyCrypto = new NodeRSA(this.privateKey);
    this.publicKeyCrypto = new NodeRSA(this.publicKey);
  }

  // Method to decrypt a given string
  decryptMessage = (encryptedMessage: string) => {
    const decryptedMessage = this.privateKeyCrypto.decrypt(
      encryptedMessage,
      "utf8"
    );
    return decryptedMessage;
  };
  // Method to encrypt a given string
  encryptMessage = (message: string) => {
    const encryptedMessage = this.publicKeyCrypto.encrypt(message, "base64");
    return encryptedMessage;
  };

  getPublicKey = () => {
    return this.publicKey;
  };
}
