const Joi = require("joi")

const validator = require("../../middleware/validator");

module.exports = {

    register: validator({
        body: Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().min(6).required(),
            name: Joi.string().required(),
        }),
    }),


    signIn: validator({
        body: Joi.object({
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required(),
        }),
    }),
}

