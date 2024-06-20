const DB = require("../../models")
const { response, common } = require("../../helpers");
const { MESSAGE } = require("../../helpers/constant.helper");


module.exports = {
    registerUser: async (req, res) => {

        const emailExists = await DB.User.findOne({ email: req.body.email });

        if (emailExists) return response.BAD_REQUEST({ res, message: "Email " + MESSAGE.ALREADY_EXISTS })



        const newUser = await DB.User.create(req.body);

        return response.OK({ res, message: MESSAGE.USER_CREATED, payload: newUser });
    },

    signIn: async (req, res) => {

        const userExists = await DB.User.findOne({ email: req.body.email }).lean();

        if (!userExists) return response.BAD_REQUEST({ res, message: MESSAGE.EMAIL_NOT_FOUND })

        const isValidPass = await common.comparePassword({ password: req.body.password, hash: userExists.password })

        if (!isValidPass) return response.BAD_REQUEST({ res, message: MESSAGE.INVALID_PASSWORD })

        const token = await common.generateToken({ data: { _id: userExists._id } })

        delete userExists.password;

        return response.OK({
            res, message: MESSAGE.LOGIN, payload: {
                ...userExists, token
            }
        })

    },
    getUser: async (req, res) => {
        const userId = req.user._id

        const userExists = await DB.User.findById(userId).lean()

        if (!userExists) response.NOT_FOUND({ res, message: "User " + MESSAGE.NOT_FOUND })

        delete userExists.password

        return response.OK({
            res, message: MESSAGE.SUCCESS, payload: {
                userExists
            }
        })
    }

}