module.exports = {
    USER: {
        APIS: require("./user/user.controller"),
        VALIDATOR: require("./user/user.validator")
    },
    AUTH: {
        APIS: require("./auth/auth.controller")
    }
}