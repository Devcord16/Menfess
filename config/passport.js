const GoogleStrategy = require("passport-google-oauth20").Strategy
const passport = require('passport')
const authCtrl = require("../controllers/auth.js")

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
  callbackURL: "/api/auth/google/redirect",
  passReqToCallback: true
}, authCtrl.google))
