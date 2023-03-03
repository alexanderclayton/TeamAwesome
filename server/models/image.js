// avatar attached to user on databases?
const mongoose = require("mongoose");
const pictureSchema = mongoose.Schema({
  name: String,
  img:
  {
    data: Buffer,
    contentType: String,
  }
});

module.exports = pictureSchema;