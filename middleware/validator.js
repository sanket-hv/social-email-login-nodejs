const { response } = require('../helpers');
const logger = require("../helpers/logger.helper").Logger

module.exports = (schema) => async (req, res, next) => {

    const paths = Object.keys(schema);
    if (!paths.length) return next();
    if (!paths.includes("body") && !paths.includes("query") && !paths.includes("params")) return next();


    for (let path of paths) {

        const dataForValidation = req[path];
        const { value, error } = schema[path].validate(dataForValidation, {
            allowUnknown: false,
            stripUnknown: true,
        });


        if (error) {

            logger.error(`✘ VALIDATION ERROR: ${error}`);
            const context = error?.details;

            //* if error comes from anywhere else other than body, query, params then create a custom error message
            const message = (path !== "body" && path !== "query" && path !== "params") ? `Validation failed for ${path}.` : (error?.details[0]?.message).replace(/"/g, "");

            return response.BAD_REQUEST({
                res,
                // message: `Validation failed for ${path}.`,
                message,
                payload: { context, fieldsAccepted: Object.keys(schema[path].describe().keys) }
            });

        }

        req[path] = value;
    }

    next();
};
