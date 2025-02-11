var express = require("express");

var router = express.Router();

router.get("/", (req, res) => {
  const currentUser = req.user ? req.user : undefined;
  res.render("login", { currentUser });
});

module.exports = router;
