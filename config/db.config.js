const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const { MONGODB_URI } = require("./env.config")

const connect = new Promise((resolve, reject) =>
    mongoose
        .connect(MONGODB_URI)
        .then(() => resolve(mongoose.connection))
        .catch((error) => reject(error))
);

module.exports = connect;
