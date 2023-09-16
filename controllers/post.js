const imagekit = require("../tools/imagekit.js")
const postModel = require("../models/post.js")

class APIfeatures {
  constructor(query, queryString){
    this.query = query;
    this.queryString = queryString;
  }

  paginating(){
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 9
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)
    return this;
  }
}

const postCtrl = {
  async createPost(req, res) {
    try {
      const { content } = req.body
      if (!content && (!req.files || req.files == []) ) return res.status(400).json({ msg: "Postingan tidak boleh kosong" })

      const media = []

      if (req.files && req.files != []) for await (file of req.files) {
        const image = await imagekit.upload({
          file: file.buffer.toString("base64"),
          fileName: file.originalname,
          folder: "post",
        })
        media.push(image.url)
        console.log(media)
      }

      const newPost = await postModel.create({
        content, media, user: req.user._id
      })

      res.json({
        msg: 'Post berhasil dibuat!',
        newPost: {
          ...newPost._doc,
          user: req.user
        }
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ msg: err.message })
    }
  },
  async getPosts(req, res) {
    try {
      const features = new APIfeatures(postModel.find({
        user: [...req.user.following, req.user._id]
      }), req.query).paginating()

      const posts = await features.query.sort('-createdAt')
        .populate("user likes", "avatar username fullname followers")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password"
          }
        })

      res.json({ msg: "Sukses!", posts })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ msg: err.message })
    }
  },
  async likePost(req, res) {
    try {
      const post = await postModel.findById(req.params.id).populate("likes", "username")
      if (!post) return res.status(400).json({ msg: "Post tidak ditemukan." })

      const userIndex = post.likes.findIndex(({ username }) => username == req.user.username)
      
      if(userIndex !== -1) {
        post.likes.splice(userIndex ,1)
        await post.save()
        return res.json({ msg: "UnLiked Post!" })
      } else {
        post.likes.push(req.user._id)
        await post.save()
        return res.json({ msg: 'Liked Post!' })
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  async getUserPosts(req, res) {
    try {
      const features = new APIfeatures(postModel.find({ user: req.params.id }), req.query).paginating()
      const posts = await features.query.sort("-createdAt")

      res.json({ posts })

    } catch (err) {
      console.log(err)
      return res.status(500).json({ msg: err.message })
    }
  },
  async getPost(req, res) {
    try {
      const post = await postModel.findById(req.params.id)
        .populate("user likes", "avatar username fullname")
        .populate({
          path: "comments",
          populate: {
            path: "user",
            select: "-password"
          }
        })

      if(!post) return res.status(400).json({ msg: 'Post tidak ditemukan.' })

      res.json({ post })

    } catch (err) {
      console.log(err)
      return res.status(500).json({ msg: err.message })
    }
  },
  async createComment(req, res) {
    try {
      const { content } = req.body
      if (!content) return res.status(400).json({ msg: "Komentar tidak boleh kosong." })
      
      const post = await postModel.findOneAndUpdate({ _id: req.params.id }, {
        $push: { comments: { user: req.user._id, content } }
      }, { new: true })

      if (!post) return res.status(400).json({ msg: "Post tidak ditemukan." })

      res.json({
        user: req.user,
        content
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ msg: err.message })
    }
  }
}

module.exports = postCtrl;
