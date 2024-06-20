const express = require("express");
const router = express.Router();

const { USER: { VALIDATOR, APIS } } = require("../controllers");
const { auth } = require("../middleware/auth.middleware");

// register USER
router.post("/register", VALIDATOR.register, APIS.registerUser)

router.post("/signin", VALIDATOR.signIn, APIS.signIn)

router.get("/me", auth, APIS.getUser)


module.exports = router

