const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  userChecked: {
    type: Boolean,
    reequired: true,
  },
});
mongoose.pluralize(null);
module.exports = mongoose.model("userData", dataSchema);
