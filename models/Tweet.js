const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  body: {
    type: String,
    required: [true, "Body is required"]
  },
  comments: [
    {
      body: {
        type: String,
        required: true
      },
      author: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Tweet = mongoose.model("tweets", TweetSchema);
