const { Router } = require("express")
const authRouter = require("./api/auth")
const postRouter = require("./api/post")
const userRouter = require("./api/user")

const app = Router()

app.use(authRouter)
app.use(postRouter)
app.use(userRouter)

module.exports = app
