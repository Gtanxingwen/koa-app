const { cryptKey } = require('../config')
const CryptoJS = require('crypto-js')

// Encrypt
const ciphertext = (text) => {
  return CryptoJS.AES.encrypt(text, cryptKey).toString()
}

// Decrypt
const originalText = (ciphertext) => {
  const bytes  = CryptoJS.AES.decrypt(ciphertext, cryptKey)
  return bytes.toString(CryptoJS.enc.Utf8)
}

module.exports = {
  ciphertext,
  originalText
}
