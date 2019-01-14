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

Cat.find({ name: "George" }, (err, cats) => {
  if (err) console.log(err)
  else console.log(cats)
})
