import mongoose from "mongoose";
import Hotel from "./hotel.js";
const bookingDetailSchema = new mongoose.Schema({
  bookingID: { type: Number, required: true, unique: true },
  travelerName: { type: String, required: true },
  numPeople: { type: Number, required: true },
  departureTime: { type: String, required: true }, // Định dạng: "YYYY-MM-DD"
  returnTime: { type: String, required: true },
  transportation: { type: String, required: true },
  hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }], // Tham chiếu đến mô hình Hotel
});
const BookingDetail = mongoose.model("BookingDetail", bookingDetailSchema);

export default BookingDetail;
