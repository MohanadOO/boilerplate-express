var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use("/name", bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`Request type: ${req.method}\nPath: ${req.path}\nIP: ${req.ip}`);
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  // res.send('Hello Express')
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  let response = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = response.toUpperCase();
  } else {
    response = "Hello json";
  }

  res.json({
    message: response,
  });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({
      time: req.time,
    });
  }
);

app.get(`/:word/echo`, (req, res) => {
  let word = req.params.word;
  res.json({
    echo: word,
  });
});

app.get("/name", (req, res) => {
  const firstname = req.query.first;
  const lastname = req.query.last;

  res.json({
    name: firstname + " " + lastname,
  });
});

app.post("/name", (req, res) => {
  const firstname = req.body.first;
  const lastname = req.body.last;

  res.json({
    name: firstname + " " + lastname,
  });
});

module.exports = app;
