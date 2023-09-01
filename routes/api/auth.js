const { Router } = require("express")
const authCtrl = require("../../controllers/auth.js")

const passport = require('passport')

const app = Router()

app.post("/login", authCtrl.login)
app.post("/register", authCtrl.register)
app.post("/logout", authCtrl.logout)
app.post("/refresh_token", authCtrl.generateAccessToken)
app.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }))
app.get("/auth/google/redirect", passport.authenticate("google", { session: false, successRedirect: process.env.REACT_CLIENT_URL, failureRedirect: process.env.REACT_CLIENT_URL }))

module.exports = app
