const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BenchSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  body: {
    type: String,
    required: [true, "Description is required"]
  },
  lat: {
    type: Number,
    required: [true, "Latitude is required"]
  },
  long: {
    type: Number,
    required: [true, "Longitude is required"]
  },
  seating: {
    type: Number,
    default: 2,
    required: [true, "You must provide seating information"]
  },
  pictureURL: {
    type: String
  },
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      body: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
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

module.exports = Bench = mongoose.model("benches", BenchSchema);
