const express = require("express");
const app = express();
const path = require("path");
const { NodeVM } = require("vm2");

//View Folder - ejs

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const port = 3030;

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/run", (req, res) => {});
const vm = new NodeVM({
  console: "inherit",
  sandbox: {},
  require: {
    external: true,
  },
});

const code = `console.log("hi")`;

vm.run(code);
app.listen(port, (req, res) => {
  console.log("listening");
});
