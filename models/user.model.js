const { Schema, model } = require('mongoose');
const logger = require("../helpers/logger.helper").Logger

const { AUTH_TYPE } = require("../json/enums.json");
const { hash } = require('bcryptjs');

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        name: {
            type: String,
            required: true
        },
        authType: {
            type: String,
            enum: Object.values(AUTH_TYPE),
            default: AUTH_TYPE.EMAIL,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    });

userSchema.pre('save', async function (next) {
    try {
        console.log(this.password)
        if (!this.password === "") next();

        if (this.isModified('password') || this.isNew)
            this.password = hash(this.password, 10);

        next();
    } catch (error) {
        logger.error(`PRE SAVE ERROR: ${error}`);
        next(error);
    }
});

userSchema.set("toJSON", {
    transform: function (doc, ret, opt) {
        delete ret["password"];
        return ret;
    },
});

const userModel = model('user', userSchema, 'user');

module.exports = userModel;