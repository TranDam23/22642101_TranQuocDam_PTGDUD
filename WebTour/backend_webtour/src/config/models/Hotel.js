import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  hotelTD: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
});

const Hotel = mongoose.model("hotel", hotelSchema);

export default Hotel;
