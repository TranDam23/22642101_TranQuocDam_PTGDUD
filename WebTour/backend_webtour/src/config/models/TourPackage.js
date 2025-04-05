import mongoose from "mongoose";
const tourPackageSchema = new mongoose.Schema({
  tourPackageName: {
    type: String,
    required: true,
  },
  tourPackageDescription: {
    type: String,
    required: true,
  },
  tourPackagePrice: {
    type: Number,
    required: true,
  },
  tourPackageDuration: {
    type: Number,
    required: true,
  },
  tourPackageDestination: {
    type: String,
    required: true,
  },
  tourPackageImageUrl: {
    type: String,
    required: true,
  },
});

const TourPackage = mongoose.model("TourPackage", tourPackageSchema);
export default TourPackage;
