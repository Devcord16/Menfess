const { Router } = require("express")
const authController = require("../../controllers/auth.js")

const passport = require('passport')

const app = Router()

app.post("/login", authController.login)
app.post("/register", authController.register)
app.post("/logout", authController.logout)
app.post("/refresh_token", authController.generateAccessToken)
app.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }))
app.get("/auth/google/redirect", passport.authenticate("google", { session: false, successRedirect: process.env.REACT_CLIENT_URL, failureRedirect: process.env.REACT_CLIENT_URL }))

module.exports = app
