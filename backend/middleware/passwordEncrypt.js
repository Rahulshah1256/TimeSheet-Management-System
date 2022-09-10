
const bcrypt = require('bcrypt');


 function passwordEncrypt(req, res, next)  {
        var value = res.body.password;
        const salt = bcrypt.genSalt(10);
        value = bcrypt.hash(value, salt); 
}

module.exports = { passwordEncrypt: passwordEncrypt };
