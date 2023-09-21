const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: { type: String, required: true }, // Structure arg
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ]
}, { timestamps: true }); // Options argument

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
