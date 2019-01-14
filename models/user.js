import mongoose from "mongoose"
import passportLocalMongoose from "passport-local-mongoose"

let UserSchema = new mongoose.Schema({
  username: String,
  password: String
})

UserSchema.plugin(passportLocalMongoose)
export default mongoose.model("User", UserSchema)
