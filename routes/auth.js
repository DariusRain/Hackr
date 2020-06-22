const express = require("express"),
  router = express.Router(),
  passport = require("passport");

// @route
// @desc
router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github"),
  async (req, res) => {
    try {
      return res.status(200).json({ user: req.user })
        // .cookie("AccessToken", req.user.accessToken)
        // .redirect(`../../user/profile/${req.user.username}`);
    } catch {
      return res.status(500).json({ error: { message: "Server Error" } });
    }
  }
);

module.exports = router;
