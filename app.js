const express = require("express");
require("dotenv").config();
const env = require("./config/env.config");
const app = express();

//* middlewares
app.use(require('./middleware/request.logger'));
app.use(require('cors')());
app.use(express.json({ limit: env.JSON_BODY_LIMIT }));
app.use(express.urlencoded({ extended: false }));

//* routes
app.use(env.BASE_URL, require('./routes/index'));


//! This is used to handle all the errors that are thrown
app.use(require('./middleware/error.handler'));
module.exports = app;
