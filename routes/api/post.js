const { Router } = require("express")
const userCtrl = require("../../controllers/user")

const auth = require("../../middleware/auth")

const app = Router()

app.get("/user/:id", userCtrl.getUser)

app.post("/follow/:id", auth, userCtrl.follow)

module.exports = app
