const { Router } = require("express")
const authRouter = require("./api/auth.js")
// const PostRouter = require("./api/post")

// const { mainModel } = require("../models/post")

// const mainApiRouter = new PostRouter(mainModel, "main").getRouter()

const app = Router()

app.use(authRouter)

module.exports = app
