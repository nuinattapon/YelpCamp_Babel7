import express from "express"
import path from "path"

// helmet doesn't work in codesandbox.io
import helmet from "helmet"
// import axios from "axios"
import mongoose from "mongoose"
import passport from "passport"
import LocalStrategy from "passport-local"
import expressSession from "express-session"

import User from "./models/user"

const app = express()
// console.log(process.env)
const port = process.env.PORT || 8080
const ip = process.env.IP || "0.0.0.0"
const passportSecretKey =
  process.env.SECRETKEY || "Love can not live where there is no trust"
// express setup
app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/", express.static(path.join(__dirname, "public")))

app.set("view engine", "ejs")
// Passport set up
app.use(
  expressSession({
    secret: passportSecretKey,
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// let email, password

mongoose.connect(
  "mongodb+srv://crmUser:Abcd2468@nattapon-rni0s.mongodb.net/YelpCampDB?retryWrites=true",
  {
    useNewUrlParser: true
  }
)
let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
})

let Campground = mongoose.model("Campground", campgroundSchema)

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect("/login")
}

app
  .get("/", (req, res) => {
    //render landing page
    res.render("landing", {
      title: "Welcome to YelpCamp",
      message: "View our hand-picked campgrounds from all over the world..."
    })
  })
  .get("/campgrounds", isLoggedIn, (req, res) => {
    // retrive the campgrounds
    Campground.find({}, (err, campgrounds) => {
      if (err) console.log(err)
      else {
        // render the campgrouds
        res.render("campgrounds", {
          title: "Campgrounds",
          message:
            "View our hand-picked campgrounds from all over the world...",
          data: campgrounds
        })
      }
    })
  })

  .get("/campgrounds/:id", isLoggedIn, (req, res) => {
    // retrive the campgrounds
    Campground.find({}, (err, campgrounds) => {
      if (err) console.log(err)
      else {
        // render the campgrouds
        res.render("campgrounds", {
          title: "Campgrounds",
          message:
            "View our hand-picked campgrounds from all over the world...",
          data: campgrounds
        })
      }
    })
  })
  .get("/new", isLoggedIn, (req, res) => {
    // render the campgrouds
    res.render("new", {
      title: "Add New Campground",
      message: "Please enter a new campground information and submit..."
    })
  })
  .post("/campgrounds", isLoggedIn, (req, res) => {
    // get data from form and add to campgrounds array
    //campGrounds.push(req.body)
    let campgroundModel = new Campground(req.body)
    campgroundModel.save((err, campground) => {
      if (err) console.log(err)
      else console.log(campground)
    })
    // redirect to campground page
    res.redirect("/campgrounds")
  })
  .get("/login", (req, res) => {
    // render the campgrouds
    res.render("login", {
      title: "Login",
      message: "Please enter email and password to login"
    })
  })
  .post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/campgrounds",
      failureRedirect: "/login"
    }),
    (req, res) => {
      console.log(req)
    }
  )
  .get("/signup", (req, res) => {
    // render the campgrouds
    res.render("signup", {
      title: "Sign up",
      message:
        "Thanks for your interesting in YelpCamp. Pls fill information to sign up..."
    })
  })
  .post("/signup", (req, res) => {
    // get data from form and add to campgrounds array
    console.log(req.body)
    let { username, password } = req.body

    User.register(new User({ username }), password, (err, user) => {
      if (err) {
        console.log(err)
        return res.render("signup", {
          title: "Sign up",
          message: err
        })
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/campgrounds")
        })
      }
    })
  })
  .get("/logout", (req, res) => {
    req.logout()
    res.redirect("/")
  })
app.listen(port, ip, () => {
  console.log(`YelpCamp starts on PORT ${port} on IP ${ip}`)
})
