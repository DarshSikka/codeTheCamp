module.exports = () => {
  const express = require("express");
  const ejs = require("express-ejs-layouts");
  const port = process.env.PORT || 5000;
  const app = express();
  app.use(ejs);
  app.use(express.static(require("path").join(__dirname, "../static")));
  app.set("view engine", "ejs");
  app.get("/", (req, res) => {
    res.render("home");
  });
  app.listen(port, () => console.log(`listening on port ${port}`));
};
