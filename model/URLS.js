const mongoose = require("mongoose");
const shortid = require("shortid");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

const UrlSchema = mongoose.Schema({
  URL: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: new Date().toLocaleString(),
  },
  counter: {
    type: Number,
    default: 0,
  },
  shortUrl_id: {
    type: String,
    default: shortid.generate(),
  },
});
const URLS = mongoose.model("ShortURLS", UrlSchema);

module.exports = URLS;
