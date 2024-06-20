const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const DB = require("../models")
const { AUTH_TYPE } = require("../json/enums.json");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/api/v1/auth/google/callback",
    passReqToCallback: true
},
    async (request, accessToken, refreshToken, profile, done) => {
        // asynchronous verification, for effect...
        process.nextTick(async () => {

            const email = profile.emails[0].value;
            let user = await DB.User.findOne({ email });
            if (!user) {
                user = await DB.User.create({ email, name: profile.displayName, authType: AUTH_TYPE.GOOGLE });
            }
            done(null, user);
        });
    }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID || "wdfs",
    clientSecret: process.env.FACEBOOK_APP_SECRET || "wdf",
    callbackURL: '/api/v1/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name']
},
    async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;
        let user = await DB.User.findOne({ email });

        if (!user) {
            user = await new DB.User.create({ email, name: `${profile.name.givenName} ${profile.name.familyName}`, authType: AUTH_TYPE.FACEBOOK });
        }
        done(null, user);
    })
);

