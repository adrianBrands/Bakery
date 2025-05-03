var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local");
const path = require("path");
const fs = require("fs-extra");


passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((user, callback) => {
  const userId = user ? user.username : "";
  callback(null, userId);
});


passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    let usersArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/users.json")));
    let filteredArray = usersArray.filter((x) => x.username == username);
    if (filteredArray.length > 0) {
      let usersData = filteredArray[0];
      if (usersData.password == password) {
        return cb(null, usersData);
      }
    } else {
      return cb(null, false);
    }
  })
);

router.get("/", (req, res) => {
  const currentUser = req.user ? req.user : undefined;
  res.render("login", { currentUser });
  console.log(currentUser)
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}), (req, res) => {
    req.session.currentUser = req.user;
    res.redirect('/')
});

module.exports = router;
