const DB = require("../../models")
const { response, common } = require("../../helpers");
const { MESSAGE } = require("../../helpers/constant.helper");


module.exports = {
    socialAuthCallback: async (req, res) => {
        const token = await common.generateToken({ data: { _id: req.user._id } })
        return response.OK({ res, message: MESSAGE.SUCCESS, payload: { token, user: req.user } })
    },

}