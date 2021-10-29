const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    // find the post by post id
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      // update with what is in the req body
      await post.updateOne({ $set: req.body });
      res.status(200).json("The post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json("Post unsuccessful");
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    // find the post by post id
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("The post has been deleted");
    } else {
      res.status(403).json("You can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//LIKE OR DISLIKE A POST
router.put("/:id/like", async (req, res) => {
  try {
    // find the post by post id
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS FROM USERS THAT THE USER IS FOLLOWING + USER's OWN POST
router.get("/timeline/:userId", async (req, res) => {
  try {
    // find current user id based on params on url
    const currentUser = await User.findById(req.params.userId);
    // find all the posts by this user id
    const userPosts = await Post.find({ userId: currentUser._id });
    // find all the user's friend(ppl that the user is following) post
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    // concat all posts from friend
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL USER'S OWN POST
router.get("/profile/:username", async (req, res) => {
  try {
    // find this user
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
