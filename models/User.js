const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId
  },
  handle: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    // required: [true, "Email is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  benches: [
    {
      type: Schema.Types.ObjectId,
      ref: "benches"
    }
  ],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "benches"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
