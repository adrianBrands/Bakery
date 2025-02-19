var express = require("express");
var passport = require('passport');
var LocalStrategy = require('passport-local');
const path = require("path");
const fs = require('fs');

var router = express.Router();

router.get("/", (req, res) => {
  const currentUser = req.user ? req.user : undefined;
  res.render("login", { currentUser });
});

module.exports = router;
