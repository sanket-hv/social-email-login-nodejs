const router = require("express")();
const passport = require("passport")

const { AUTH: { APIS } } = require("../controllers/index")
const session = require("express-session")

router.use(session({ secret: "node-test", resave: false, saveUninitialized: true }))
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// import strategy
require('../config/passportSetup.config');

router.use(passport.initialize());
router.use(passport.session());

// Google Auth Routes
router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/api/v1/auth/google/success',
    failureRedirect: '/login'
}));

router.get("/google/success", APIS.socialAuthCallback);



// // Facebook Auth Routes
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), APIS.socialAuthCallback);

module.exports = router