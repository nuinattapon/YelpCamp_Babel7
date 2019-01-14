import mongoose from "mongoose"

// mongoose connection
// mongoose.Promise = global.Promise

mongoose.connect(
  "mongodb+srv://crmUser:Abcd2468@nattapon-rni0s.mongodb.net/CATdb?retryWrites=true",
  {
    useNewUrlParser: true
  }
)

let catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
})

let Cat = mongoose.model("Cat", catSchema)

const cats = [
  {
    name: "George",
    age: 11,
    temperament: "Grouchy"
  },
  {
    name: "Mrs. Norris",
    age: 7,
    temperament: "Evil"
  },
  {
    name: "Jeth",
    age: 7,
    temperament: "Persian"
  },
  {
    name: "Sutherlan",
    age: 12,
    temperament: "Persian"
  },
  {
    name: "Dionne",
    age: 9,
    temperament: "Grouchy"
  },
  {
    name: "Annabelle",
    age: 12,
    temperament: "Evil"
  },
  {
    name: "Padraig",
    age: 11,
    temperament: "Persian"
  },
  {
    name: "Keriann",
    age: 6,
    temperament: "Grouchy"
  },
  {
    name: "Vivie",
    age: 8,
    temperament: "Bland"
  },
  {
    name: "Arlen",
    age: 10,
    temperament: "Grouchy"
  }
]

cats.forEach(cat => {
  let catModel = new Cat(cat)
  catModel.save((err, cat) => {
    if (err) console.log(err)
    else console.log(cat)
  })
})
