//import models and modules
const express = require("express");
const Student = require("../models/Student");
const path = require("path");
const Lec = require("../models/Lec");
const Article = require("../models/Article");
const multer = require("multer");
const fs = require("fs");

//setup multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
const upload = multer({ storage });
//setup authentication essentials(email verification otp and uuid)
const { v4: uuid4 } = require("uuid");
const otps = {};

//make router and add routes
const router = express.Router();
router.post("/new-student", (req, res) => {
  // get body and do database operations
  const { name, email, subject, password } = req.body;
  const uuid = uuid4();
  const newStudent = new Student({
    name,
    email,
    pack: "Free Pack",
    subject,
    uuid,
    password,
  });
  newStudent.save((err) => {
    if (err) {
      console.log(err);
      res.send("Email not unique");
    } else {
      res.cookie("uuid", uuid, { maxAge: Date.now() + 2.628e9 });
      res.redirect("/dashboard");
    }
  });
});
// handle updating students
router.post("/update-student", async (req, res) => {
  console.log("updating");
  console.log(req.body);
  if (req.body.password != process.env.PASSWORD) {
    res.redirect("/");
  } else {
    const std = await Student.findOne({ email: req.body.email });
    if (std) {
      std.pack = req.body.pack;
      std.save();
      res.redirect("/auth/admin");
    } else {
      res.redirect("/");
    }
  }
});
//handle adding articles
router.post("/new-article", async (req, res) => {
  const { title, html, password } = req.body;
  if (password !== process.env.password) {
    return res.redirect("/");
  }
  const uuid = uuid4();
  const art = new Article({ title, content: html, uuid });
  art.save();
  res.redirect("/dashboard");
});
// handle login action(put cookie on login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const std = await Student.findOne({ email, password });
  if (!std) {
    res.send("<H1>Invalid Credentials <a href='/signup'>Signup</a> </H1>");
  } else {
    res.cookie("uuid", std.uuid, { maxAge: Date.now() + 2.628e9 });
    res.redirect("/");
  }
});
// send admin in /auth/admin
router.get("/admin", async (req, res) => {
  res.render("admin");
});
// handle student information request
router.post("/find-student", async (req, res) => {
  const { email } = req.body;
  res.cookie("studentFound", email);
  res.redirect("/auth/admin");
});
// handle admin password request
router.post("/admin", async (req, res) => {
  const { password } = req.body;
  const std = await Student.findOne({ email: req.cookies.studentFound });
  if (password !== process.env.PASSWORD) {
    res.redirect("/");
  } else {
    res.render("admin-view", {
      student: std ? std : undefined,
    });
  }
});

// handle new lecture request using multer
router.post("/new-lecture", upload.single("video"), (req, res, next) => {
  const { title, password } = req.body;
  console.log(title, password);
  if (password !== process.env.PASSWORD) {
    return res.redirect("/");
  } else {
    const lec = new Lec({ title, video: `/${req.file.path}`, uuid: uuid4() });
    lec.save();
    res.redirect("/dashboard");
  }
});

// handle email verification
router.get("/verify-email", async (req, res) => {
  const { attempt } = req.query;
  if (!req.user.student) {
    return res.redirect("/dashboard");
  } else if (req.user.student.verified) {
    return res.redirect("/dashboard");
  } else {
    if (!attempt) {
      const { sendMail } = require("../mail");
      const rand = Math.floor(Math.random() * 9000) + 1000;
      sendMail({
        to: req.user.student.email,
        subject: "#include<codethecamp> otp",
        body: `<div style="background-color: black; color: white;">
      <h1>Your otp is: ${rand}</h1>
      </div>`,
      });
      otps[req.user.student.uuid] = rand;
      res.render("otp");
    } else {
      console.log(parseInt(attempt), otps[req.user.student.uuid]);
      if (parseInt(attempt) === otps[req.user.student.uuid]) {
        const usr = await Student.findOne({ uuid: req.user.student.uuid });
        usr.verified = true;
        usr.save();
        res.redirect("/dashboard");
      } else {
        res.send("Wrong otp");
      }
    }
  }
});
module.exports = router;
