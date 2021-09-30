const express = require("express");
const Student = require("../models/Student");
const { v4: uuid4 } = require("uuid");
const otps = {};
const router = express.Router();
router.post("/new-student", (req, res) => {
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
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const std = await Student.findOne({ email, password });
  if (!std) {
    res.send("Invalid Credentials");
  } else {
    res.cookie("uuid", std.uuid, { maxAge: Date.now() + 2.628e9 });
    res.redirect("/");
  }
});
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
