import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bookingID: { type: Number, required: true, unique: true },
  userID: { type: Number, required: true },
  tourID: { type: Number, required: true },
  bookingDate: { type: String, required: true }, // Định dạng: "YYYY-MM-DD"
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  totalPrice: { type: Number, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;