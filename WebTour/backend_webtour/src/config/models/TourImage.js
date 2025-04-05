import mongoose from 'mongoose';

const tourImageSchema = new mongoose.Schema({
  tourId: { type: Number, ref: 'Tour' },
  images: [String],
});

const TourImage = mongoose.model('TourImage', tourImageSchema, 'tourimages');

export default TourImage;