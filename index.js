const express = require("express");
const session = require("express-session");
const passport = require("passport");
const strategy = require(`${__dirname}/strategy.js`);

const app = express();

//cors
//body-parser
//massive

app.use(
  session({
    secret: "hi",
    resave: false,
    saveUnitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser(function(user, done) {
  return done(null, user);
  //return done(null, {id: user.id, username: user.username})
});

passport.deserializeUser(function(user, done) {
  return done(null, user);
});

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "/me",
    failureRedirect: "/login",
    failureFlash: true
  })
);

app.get("/me", function(req, res) {
  if (req.user) {
    return res.status(200).json(req.user);
  } else {
    return res.redirect("/login");
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
