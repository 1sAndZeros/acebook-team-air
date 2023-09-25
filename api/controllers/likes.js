const TokenGenerator = require("../lib/token_generator");
const Like = require("../models/likes");

const LikesController = {
  Create: (req, res) => {
    console.log(req.body);
    const userId = req.body.userId;
    const postId = req.body.postId;
    const like = new Like({userId, postId});
    like.save((err) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      Like.find({postId: postId}, (error, data) => {
        res.status(201).json({ message: "OK", token: token, likes: data })
      }
      )
            }
          );
        },
  Index: (req, res) => {
    console.log(req.query)
    const token = TokenGenerator.jsonwebtoken(req.user_id);
    Like.find({postId: req.query.postId}, (error, data) => {
      res.status(201).json({ message: "OK", token: token, likes: data })
    })
  }
    }

module.exports = LikesController;