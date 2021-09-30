module.exports = () => {
  const express = require("express");
  const ejs = require("express-ejs-layouts");
  const { config } = require("dotenv");
  config();
  const mongoose = require("mongoose");
  const port = process.env.PORT || 5000;
  const auth = require("../auth/middleware");
  const app = express();
  mongoose.connect(process.env.DB_URI, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Connected to mongoose");
    }
  });
  const cookieParser = require("cookie-parser");
  app.use(cookieParser());
  app.use(auth);
  app.use(ejs);
  app.use(express.urlencoded({ extended: true, limit: "500gb" }));
  const authRoutes = require("../auth");
  app.use(express.static(require("path").join(__dirname, "../static")));
  app.set("view engine", "ejs");
  app.use("/auth", authRoutes);
  app.get("/signup", (req, res) => {
    res.render("signup");
  });
  app.get("/dashboard", (req, res) => {
    if (!req.user.student) {
      res.redirect("/");
    } else {
      res.render("dashboard", { user: req.user });
    }
  });
  app.get("/login", (req, res) => {
    res.render("login");
  });
  app.get("/", (req, res) => {
    res.render("home", { user: req.user });
  });
  app.get("/about", (req, res) => {
    res.render("about");
  });
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
  app.listen(port, () => console.log(`listening on port ${port}`));
};
