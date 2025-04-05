import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  destinationId: Number,
  name: String,
  description: String,
});

const Destination = mongoose.model('Destination', destinationSchema, 'destinations');

export default Destination;