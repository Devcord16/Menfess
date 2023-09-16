const userModel = require("../models/user");

const userCtrl = {
  async getUser(req, res) {
    try {
      const user = await userModel.findById(req.params.id)
        .select("-password")
        .populate("followers following", "-password")

      if (!user) return res.status(400).json({ msg: "User tidak ditemukan." })

      res.json({ user })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ msg: err.message })
    }
  },
  async follow(req, res) {
    try {
      const user = await userModel.findById(req.params.id).populate("followers", "username")
      if (!user) return res.status(400).json({ msg: "User tidak ditemukan." })

      const userIndex = user.followers.findIndex(({ username }) => username == req.user.username)
      
      if (userIndex !== -1) {
        user.followers.splice(userIndex, 1)
        await user.save()
        await userModel.findOneAndUpdate({ _id: req.user._id }, {
          $pull: { following: req.params.id }
        }, { new: true })
        return res.json({ msg: "UnFollowed User!" })
      } else {
        user.followers.push(req.user._id)
        await user.save()
        await userModel.findOneAndUpdate({ _id: req.user._id }, {
          $push: { following: req.params.id }
        }, { new: true })
        return res.json({ msg: "Followed User!" })
      }

      res.json({
        user: {
          ...newUser,
          password: ""
        }
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ msg: err.message })
    }
  }
}

module.exports = userCtrl
