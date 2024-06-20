const jwt = require('jsonwebtoken');
const { response } = require('../helpers');
const { MESSAGE } = require('../helpers/constant.helper');

module.exports = {
    auth: (req, res, next) => {
        const token = req.header("x-auth-token");
        if (!token) return response.BAD_REQUEST({ res, message: MESSAGE.TOKEN_REQUIRED })

        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);

            req.user = verified;
            next();
        } catch (err) {
            console.log(err)
            return response.UNAUTHORIZED({ res, message: MESSAGE.INVALID_TOKEN })
        }
    }

}


