const { Router } = require("express")
const postCtrl = require("../../controllers/post")

const auth = require("../../middleware/auth")
const multer = require("../../tools/multer")

const app = Router()

app.route("/posts")
  .post(auth, multer.array("media", 10), postCtrl.createPost)
  .get(auth, postCtrl.getPosts)

app.get("/post/:id", postCtrl.getPost)

app.post("/like/:id", auth, postCtrl.likePost)

app.get("/user_posts/:id", postCtrl.getUserPosts)

app.post("/comment/:id", auth, postCtrl.createComment)

module.exports = app
