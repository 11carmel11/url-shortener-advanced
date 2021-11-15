const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Users collection connected!"))
  .catch((err) => console.log(err));

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  URLS: [{ type: String }],
  creationDate: {
    type: String,
    default: new Date().toLocaleString(),
  },
});
const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
