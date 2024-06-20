const router = require("express")();
const env = require("../config/env.config");

router.get("/", (req, res) => res.send(`Welcome to ${env.PROJECT_NAME} APIs!`));

router.use("/user", require("./user.routes"))
router.use("/auth", require("./auth.routes"))

module.exports = router