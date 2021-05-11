const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const auth = require("../middleware/auth");
const keys = require("../config/keys");

// @route    GET /post
// @desc     Get all posts
// @access   public

router.get("/post", async (req, res) => {
  await Post.find((err, posts) => {
    if (err) res.status(500).send("server error");
    else res.json(posts);
  });
});

// @route    POST /post
// @desc     Submit a post
// @access   private

router.post("/post", auth, async (req, res) => {
  try {
    const { title, post } = req.body;
    if (title.length == 0 || post.length == 0)
      return res
        .status(400)
        .json({ errors: [{ message: "null values not accepted" }] });
    const user = req.user.id;
    Post.create(
      new Post({
        user,
        title,
        post,
      }),
      (err, post) => {
        if (err) res.status(500).send("server error");
        else res.json(post);
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route    POST /post/signup
// @desc     user sign up
// @access   public

router.post("/post/signup", async (req, res) => {
  try {
    let { username, password } = req.body;
    if (username.length == 0 || password.length == 0)
      return res
        .status(400)
        .json({ errors: [{ message: "null values not accepted" }] });
    else if (username.length < 3 || password.length <= 3)
      return res
        .status(400)
        .json({ errors: [{ message: "username/password is too short" }] });
    let user = await User.findOne({ name: username });
    if (user)
      return res.status(400).json({ errors: [{ message: "user exists" }] });
    user = new User({ name: username, password });
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    let payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, keys.jwt_secret, { expiresIn: 36000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// @route    POST /post/login
// @desc     user login and get token
// @access   public
router.post("/post/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    if (username.length === 0 || password.length === 0)
      return res
        .status(400)
        .json({ errors: [{ message: "null values not accepted" }] });
    let user = await User.findOne({ name: username });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ message: "user doesnot exist" }] });
    }
    let match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ errors: [{ message: "invalid credentials" }] });
    }
    let payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, "notsecret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route    GET /post/login
// @desc     check user login with token
// @access   public
router.get("/post/login", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("server error");
  }
});

// @route    POST /post/comment/:postid
// @desc     add comment to the post
// @access   private

router.post("/post/comment/:postid", auth, async (req, res) => {
  try {
    let id = req.params.postid;
    let comment = {};
    comment.body = req.body.body;
    comment.user = req.user.id;
    let post = await Post.findOne({ _id: id });
    if (post) {
      post.comments.unshift(comment);
      await post.save();
      return res.json(post);
    }
    return res
      .status(400)
      .json({ errors: [{ message: "post doesnot exist" }] });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
