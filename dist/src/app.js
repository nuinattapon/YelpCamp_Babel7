"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _ejs = require("ejs");

var _ejs2 = _interopRequireDefault(_ejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Wassana"]; // const express = require("express")
// const path = require("path")

var app = (0, _express2.default)();

var port = process.env.PORT ? process.env.PORT : 8080;
var ip = process.env.IP ? process.env.IP : "0.0.0.0";

// express setup
app.use(_express2.default.urlencoded({ extended: true }));
app.use(_express2.default.json());
app.use("/", _express2.default.static(_path2.default.join(__dirname, "../public")));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index", {
    title: "Hello from EJS",
    message: "Hello there from EJS!"
  });
}).post("/addfriend", function (req, res) {
  friends.push(req.body.newfriend);
  res.redirect("friends");
}).get("/friends", function (req, res) {
  var friendList = "";
  friends.forEach(function (friend) {
    friendList = friendList + ("<li>" + friend + "</li>");
  });

  var message = "<ul>" + friendList + "</ul>";
  var form = "<form action=\"/addfriend\" method=\"POST\">       \n     <input type=\"text\" name=\"newfriend\" placeholder=\"Name\">       \n     <button> I made a new friend!</button>";
  res.send(message + form);
});

app.listen(port, ip, function () {
  console.log("Express starts on PORT " + port + " on IP " + ip);
});