const userModel = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const authCtrl = {
  register: async (req, res) => {
    try {
      let { fullname, username, email, password } = req.body
      username = username.toLowerCase().replace(/ /g, "")

      const user_name = await userModel.findOne({ username })
      if (user_name) return res.status(400).json({ msg: "Username sudah digunakan." })

      const user_email = await userModel.findOne({ email })
      if (user_email) return res.status(400).json({ msg: "Email sudah digunakan." })

      if (password.length < 6) return res.status(400).json({ msg: "Password setidaknya terdiri dari 6 karakter." })

      password = await bcrypt.hash(password, 12)

      const newUser = await userModel.create({ fullname, username, email, password })

      const access_token = createAccessToken({ id: newUser._id })
      const refresh_token = createRefreshToken({ id: newUser._id })

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      })

      res.json({
        msg: "Register Sukses!",
        access_token,
        user: {
          ...newUser._doc,
          password: "",
        },
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body

      const user = await userModel.findOne({ email })

      if (!user) return res.status(400).json({ msg: "Email tidak ditemukan." })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ msg: "Password salah." })

      const access_token = createAccessToken({ id: user._id })
      const refresh_token = createRefreshToken({ id: user._id })

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      })

      res.json({
        msg: "Login Sukses!",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" })
      return res.json({ msg: "Logged out!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken
      if (!rf_token) return res.status(400).json({ msg: "Please login now." })

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: "Please login now." })

          const user = await userModel.findById(result.id).select("-password")

          if (!user) return res.status(400).json({ msg: "This does not exist." })

          const access_token = createAccessToken({ id: result.id })

          res.json({ access_token, user })
        }
      )
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  google: async () => {

  }
}

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" })
}

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" })
}

module.exports = authCtrl
