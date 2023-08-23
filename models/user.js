const { Schema, model } = require("mongoose")

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 25,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    maxlength: 25,
    unique: true,
  },
  email: String,
  password: String,
  googleId: String,
  avatar: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
    maxlength: 200,
  },
  followers: [{ type: Schema.Types.ObjectId, ref: "user" }],
  following: [{ type: Schema.Types.ObjectId, ref: "user" }]
}, { timestamps: true })

module.exports = model("user", userSchema)
