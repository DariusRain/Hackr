const express = require("express"),
  router = express.Router(),
  authCheck = require("./middleware/auth-check"),
  User = require("../models/user"),
  Post = require("../models/post");

router.get("/profile/:username", authCheck, async (req, res) => {
  try {
    const user = await User.findOne({ user: req.params.username });
    await User.findByIdAndUpdate(user._id, { $set: { online: true } });
    return res.status(200).json(req.user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
});

router.get("/feed", authCheck, async (req, res) => {
  await Post.find()
    .then((result) => {
      console.log(result);
      return res.status(200).send(result);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: "Unable to obtain feed data.",
      });
    });
});

router.put("/vote/:option/:postId", authCheck, async (req, res) => {
  const { option, postId } = req.params;
  // console.log(option, req.user, postId);
  const username = req.user.user;
  const post = await Post.findById(postId);
  // console.log(username);
  const isNotInLike = (await post.thumbups.indexOf(username)) === -1;

  const isNotInDislike = (await post.thumbdowns.indexOf(username)) === -1;

  const isNotInEither = isNotInDislike && isNotInLike;

  try {
    switch (option) {
      case "down-vote":
        // console.log(1, "Dislike");
        console.log(isNotInLike, isNotInDislike, isNotInEither);
        // IS not in either
        if (isNotInEither) {
          // console.log("Is not in either");

          const update1 = await post.updateOne({
            $push: { thumbdowns: username },
          });
          const withChanges1 = await Post.findById(postId);
          return res.status(200).json({
            type: "down-vote",
            status: "Not in either",
            downVotes: withChanges1.thumbdowns,
            upVotes: withChanges1.thumbups,
          });

          // Is in not in dislike but is in like
        } else if (isNotInDislike && !isNotInLike) {
          // console.log("Is not in but in other");

          await post.updateOne({
            $pull: { thumbups: username },
          });
          await post.updateOne({
            $push: { thumbdowns: username },
          });
          const withChanges12 = await Post.findById(postId);

          return res.status(200).json({
            type: "down-vote",
            status: "Not in but the other",
            downVotes: withChanges12.thumbdowns,
            upVotes: withChanges12.thumbups,
          });
        } else if (!isNotInDislike) {
          // console.log("Allready In");

          await post.updateOne({
            $pull: { thumbdowns: username },
          });
          const withChanges2 = await Post.findById(postId);
          return res.json({
            type: "down-vote",
            status: "Allready in",
            downVotes: withChanges2.thumbdowns,
            upVotes: withChanges2.thumbups,
          });
        }
        break;

      case "up-vote":
        // IS not in either
        if (isNotInEither) {
          // console.log("Is not in either");

          const update1 = await post.updateOne({
            $push: { thumbups: username },
          });
          const withChanges3 = await Post.findById(postId);

          // Is in not in dislike but is in like
          res.status(200).json({
            type: "up-vote",
            status: "Not in either",
            downVotes: withChanges3.thumbdowns,
            upVotes: withChanges3.thumbups,
          });
        } else if (isNotInLike && !isNotInDislike) {
          // console.log("Is not in but in other");

          const removeLike = await post.updateOne({
            $pull: { thumbdowns: username },
          });
          const update2 = await post.updateOne({
            $push: { thumbups: username },
          });
          const withChanges4 = await Post.findById(postId);

          return res.status(200).json({
            type: "up-vote",
            status: "Not in but the other",
            downVotes: withChanges4.thumbdowns,
            upVotes: withChanges4.thumbups,
          });
        } else if (!isNotInLike) {
          // console.log("Allready In");

          const removeDislike = await post.updateOne({
            $pull: { thumbups: username },
          });
          const withChanges5 = await Post.findById(postId);
          return res.status(200).json({
            type: "up-vote",
            status: "Allready in",
            downVotes: withChanges5.thumbdowns,
            upVotes: withChanges5.thumbups,
          });
        }
        break;

      default:
        // console.log("Forbidden Request (Like/Dislike)");
        return res.status(403).json({ error: { message: "Forbidden Request!" } });
    }
  } catch {
    // console.log(403, "Forbidden request (Like/Dislie)");
    return res.status(500).json({ error: { message: "Forbidden" } });
  }
});

router.post("/profile/:username", authCheck, async (req, res) => {
  const post = new Post({
    avatar: req.body.avatar.toString(),
    user: req.body.user.toString(),
    post: req.body.post.toString(),
    postDate: req.body.postDate.toString(),
  });

  console.log("Post", post);
  try {
    const findUser = await User.find({ user: req.body.user.toString() });
    if (!findUser) {
      res.status(403).json({
        message: "Forbidden request",
      });
    }

    const savedPost = await post.save();
    console.log(savedPost);
    return res.status(201).json({
      message: "Post Submitted.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Post error.",
    });
  }
});

router.get("/logout", authCheck, async (req, res) => {
  try {
    const user = await User.findOne({ user: req.user.user });
    const userNotOnline = await user.update({ $set: { online: false } });
    req.logout();
    return res.redirect("/");
  } catch {
    return res.status(403).render("errors", { message: "Forbidden" });
  }
});

router.post("/post-it", async (req, res) => {
  const newPost = new Post({
    avatar: req.body.avatar,
    username: req.body.username,
    uid: req.body.uid,
    post: req.body.post,
  });

  try {
    const savedPost = newPost.create(savedPost);
    return res.json(savedPost);
  } catch (err) {
    console.error(err);
    return res.json(err);
  }
});

router.use("/", (req, res, next) => {
  res.render("errors", { data: { message: "404 Not found" } });
});

module.exports = router;
