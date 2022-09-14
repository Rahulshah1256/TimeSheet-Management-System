const utf8 = require('utf8');
const sha256 = require('sha256');

const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secretKey = crypto.randomBytes(32);



exports.encryptPassWord = (req, res, next) => {
       
        const password =  req.body.password;
        let encryptedPassword =  encrypt(password);
        req.body.password = encryptedPassword;
        return next();
    }
    
exports.decryptPassWord = (req, res, next) => {
       
        const password =  req.body.password;
        let decryptedPassword =  decrypt(password);
        req.body.password = decryptedPassword;
        return next();
    }



const encrypt = (password) => {
    
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(password), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (password) => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(password.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(password.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};
