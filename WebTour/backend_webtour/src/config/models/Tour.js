import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  tourID: Number,
  name: String,
  duration: String,
  departure: String,
  destinationId: { type: Number, ref: "Destination" },
  startDate: String,
  transport: String,
  tourType: String,
  price: String,
  favourites: { type: Number, default: 0 },
  region: String,
});

const Tour = mongoose.model("Tour", tourSchema, "tours");

export default Tour;
