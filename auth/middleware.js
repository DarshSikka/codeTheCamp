const Student = require("../models/Student");
const auth = async (req, res, next) => {
  req.logout = () => {
    res.cookie("uuid", "", { maxAge: Date.now() - 100000000 });
    res.redirect("/");
  };
  if (!req.cookies.uuid) {
    req.user = {
      type: "Guest",
    };
  }
  const stdnt = await Student.findOne({ uuid: req.cookies.uuid });
  req.user = {
    student: stdnt,
    type: "Student",
  };
  next();
};
module.exports = auth;
