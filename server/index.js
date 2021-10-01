const Student = require("../models/Student");
const Lec = require("../models/Lec");
module.exports = () => {
  const express = require("express");
  const ejs = require("express-ejs-layouts");
  const { config } = require("dotenv");
  const Article = require("../models/Article");
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
  app.use("/uploads", express.static("uploads"));
  app.use(ejs);
  app.use(express.urlencoded({ extended: true, limit: "500gb" }));
  const authRoutes = require("../auth");
  app.use(express.static(require("path").join(__dirname, "../static")));
  app.set("view engine", "ejs");
  app.use("/auth", authRoutes);
  app.get("/signup", (req, res) => {
    res.render("signup");
  });
  app.get("/dashboard", async (req, res) => {
    const articles = await Article.find({});
    const lectures = await Lec.find({});
    console.log(articles);
    if (!req.user.student) {
      res.redirect("/");
    } else {
      res.render("dashboard", {
        user: req.user,
        articles,
        lectures,
      });
    }
  });
  app.get("/", (req, res) => {
    res.render("home", { user: req.user });
  });
  app.get("/about", (req, res) => {
    res.render("about");
  });
  app.get("/logout", (req, res) => {
    req.logout();
  });
  app.get("/resource/:uuid", async (req, res) => {
    console.log(req.user);
    if (!req.user.student.verified) {
      return res.redirect("/dashboard");
    }
    const { uuid } = req.params;
    const tryArticle = await Article.findOne({ uuid });

    if (tryArticle) {
      console.log(req.user.articlesUsed);
      if (
        req.user.student.pack === "Free Pack" &&
        req.user.student.articlesUsed >= 2
      ) {
        return res.send(`
        <h1>Sorry, you have read your 2 free articles <a href="/dashboard">Back to dashboard</a></h1>
        `);
      }
      console.log(req.user.student.uuid);
      const usr = await Student.findOne({ uuid: req.user.student.uuid });
      usr.articlesUsed += 1;
      usr.save();
      res.render("view-resource", { resource: tryArticle });
    } else {
      const lecture = await Lec.findOne({ uuid });
      if (req.user.student.videosWatched >= 1) {
        return res.send(
          `<h1>Sorry, you have seen your 1 free video <a href="/dashboard">Back to dashboard</a></h1>`
        );
      }
      if (lecture) {
        const usr = await Student.findOne({ uuid: req.user.student.uuid });
        usr.videosWatched += 1;
        usr.save();
        return res.render("view-resource", { resource: lecture });
      }
      res.redirect("/dashboard");
    }
  });
  app.get("*", (req, res) => {
    res.render("404");
  });
  app.listen(port, () => console.log(`listening on port ${port}`));
};
