const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  content: String,
  images: [String],
  comments: [{
    user: { type: Schema.Types.ObjectId, ref: "user" },
    content: String
  }],
  likes: [{ type: Schema.Types.ObjectId, ref: "user" }]
}, { timestamps: true });

module.exports = model("main", postSchema)
