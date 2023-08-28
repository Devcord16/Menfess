const GoogleStrategy = require("passport-google-oauth20").Strategy
const passport = require('passport')
const userModel = require('../models/user.js')
const jwt = require("jsonwebtoken")

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
  callbackURL: "/api/auth/google/redirect",
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
      let user = await userModel.findOne({ email: profile.emails[0].value })

      if (!user) {
        const username = await createUsername(profile.emails[0].value.split("@")[0])
        user = await userModel.create({
          fullname: profile.displayName,
          username,
          email: profile.emails[0].value,
          googleId: profile.id,
          avatar: profile.photos[0].value
        })
      }

      if (!user.googleId) done(null, false, { message: "Email sudah digunakan di metode lain" })

      const refresh_token = createRefreshToken({ id: user._id })

      req.res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      })

      console.log(user, refresh_token)

      done(null, user)
    } catch (e) {
      console.error(e)
      done(e, false)
    }
  })
)

async function createUsername(username) {
  let user = await userModel.findOne({ username })
  if(user) {
    const newUsername = await createUsername(username + Math.ceil(Math.random() * 10000))
    return newUsername
  }
  return username
}

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" })
}
