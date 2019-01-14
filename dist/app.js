"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _axios = _interopRequireDefault(require("axios"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = _interopRequireDefault(require("passport-local"));

var _passportLocalMongoose = _interopRequireDefault(require("passport-local-mongoose"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _user = _interopRequireDefault(require("./models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// helmet doesn't work in codesandbox.io
// import helmet from "helmet"
var app = (0, _express.default)(); // console.log(process.env)

var port = process.env.PORT || 8080;
var ip = process.env.IP || "0.0.0.0";
var passportSecretKey = process.env.SECRETKEY || "Love can not live where there is no trust"; // express setup
// app.use(helmet())

app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.json());
app.use("/", _express.default.static(_path.default.join(__dirname, "public")));
app.set("view engine", "ejs"); // Passport set up

app.use((0, _expressSession.default)({
  secret: passportSecretKey,
  resave: false,
  saveUninitialized: false
}));
app.use(_passport.default.initialize());
app.use(_passport.default.session());

_passport.default.use(new _passportLocal.default(_user.default.authenticate()));

_passport.default.serializeUser(_user.default.serializeUser());

_passport.default.deserializeUser(_user.default.deserializeUser()); // let email, password


_mongoose.default.connect("mongodb+srv://crmUser:Abcd2468@nattapon-rni0s.mongodb.net/YelpCampDB?retryWrites=true", {
  useNewUrlParser: true
});

var campgroundSchema = new _mongoose.default.Schema({
  name: String,
  image: String
});

var Campground = _mongoose.default.model("Campground", campgroundSchema);

var isLoggedIn = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
};

app.get("/", function (req, res) {
  //render landing page
  res.render("landing", {
    title: "Welcome to YelpCamp",
    message: "View our hand-picked campgrounds from all over the world..."
  });
}).get("/campgrounds", isLoggedIn, function (req, res) {
  // retrive the campgrounds
  Campground.find({}, function (err, campgrounds) {
    if (err) console.log(err);else {
      // render the campgrouds
      res.render("campgrounds", {
        title: "Campgrounds",
        message: "View our hand-picked campgrounds from all over the world...",
        data: campgrounds
      });
    }
  });
}).get("/campgrounds/:id", isLoggedIn, function (req, res) {
  // retrive the campgrounds
  Campground.find({}, function (err, campgrounds) {
    if (err) console.log(err);else {
      // render the campgrouds
      res.render("campgrounds", {
        title: "Campgrounds",
        message: "View our hand-picked campgrounds from all over the world...",
        data: campgrounds
      });
    }
  });
}).get("/new", isLoggedIn, function (req, res) {
  // render the campgrouds
  res.render("new", {
    title: "Add New Campground",
    message: "Please enter a new campground information and submit..."
  });
}).post("/campgrounds", isLoggedIn, function (req, res) {
  // get data from form and add to campgrounds array
  //campGrounds.push(req.body)
  var campgroundModel = new Campground(req.body);
  campgroundModel.save(function (err, campground) {
    if (err) console.log(err);else console.log(campground);
  }); // redirect to campground page

  res.redirect("/campgrounds");
}).get("/login", function (req, res) {
  // render the campgrouds
  res.render("login", {
    title: "Login",
    message: "Please enter email and password to login"
  });
}).post("/login", _passport.default.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function (req, res) {}).get("/signup", function (req, res) {
  // render the campgrouds
  res.render("signup", {
    title: "Sign up",
    message: "Thanks for your interesting in YelpCamp. Pls fill information to sign up..."
  });
}).post("/signup", function (req, res) {
  // get data from form and add to campgrounds array
  console.log(req.body);
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;

  _user.default.register(new _user.default({
    username: username
  }), password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render("signup", {
        title: "Sign up",
        message: err
      });
    } else {
      _passport.default.authenticate("local")(req, res, function () {
        res.redirect("/campgrounds");
      });
    }
  });
}).get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});
app.listen(port, ip, function () {
  console.log("YelpCamp starts on PORT ".concat(port, " on IP ").concat(ip));
});