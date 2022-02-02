const crypto = require("crypto");
const { builtinModules, Module } = require("module");

const algorithm = "aes-256-cbc"; 
// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);
// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);
// the cipher function
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

const encryptData = (message) => {
    let encryptedData = cipher.update(message, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    console.log("Encrypted message: " + encryptedData);
    return encryptedData;
}

// the decipher function
const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

const decryptData = (encryptedData) => {
    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    console.log("Decrypted message: " + decryptedData);
    return decryptedData;
}

module.exports = { encryptData, decryptData };
