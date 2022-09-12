
const bcrypt = require('bcrypt');
const utf8 = require('utf8');
const sha256 = require('sha256');


 function encryptPassWord(password){
   
        const utf8EncodedPass = utf8.encode(password);
        const hash = sha256(utf8EncodedPass, { asBytes: true });
        return Buffer.from(hash).toString('base64');
        
    }

    module.exports = { encryptPassWord: encryptPassWord }