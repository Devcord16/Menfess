const { Router } = require("express")
const authRouter = require("./api/auth")
const postRouter = require("./api/post")

const app = Router()

app.use(authRouter)
app.use(postRouter)

module.exports = app
