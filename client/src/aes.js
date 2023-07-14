var aes256 = require("crypto-js/aes");
var CryptoJS = require("crypto-js");

async function to_Encrypt(text, secret_key) {
  try {
    var encrypted = await aes256.encrypt(text, secret_key).toString();
    return encrypted;
  } catch (error) {
    return error.msg;
  }
}

async function to_Decrypt(cipher, name, secret_key) {
  if (cipher.startsWith("Welcome")) {
    return cipher;
  }

  if (cipher.startsWith(name)) {
    return cipher;
  }
  try {
    var decrypted = await aes256.decrypt(cipher, secret_key);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return error.msg;
  }
}

module.exports.to_Encrypt = to_Encrypt;
module.exports.to_Decrypt = to_Decrypt;
