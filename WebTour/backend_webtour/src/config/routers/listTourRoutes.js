import express from "express";
import Tour from "../models/Tour.js";
import Destination from "../models/Destination.js";
import TourImage from "../models/TourImage.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imgs"); // Thư mục lưu ảnh
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file với timestamp
  },
});

const upload = multer({ storage });
// gettour theo id
router.get("/get-tour/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findOne({ tourID: id });
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/get-tours", async (req, res) => {
  try {
    const tours = await Tour.find();
    const tourData = await Promise.all(
      tours.map(async (tour) => {
        const tourImage = await TourImage.findOne({ tourId: tour.tourID });
        const destination = await Destination.findOne({
          destinationId: tour.destinationId,
        });
        return {
          tourID: tour.tourID,
          name: tour.name,
          duration: tour.duration,
          departure: tour.departure,
          destinationId: tour.destinationId,
          startDate: tour.startDate,
          transport: tour.transport,
          tourType: tour.tourType,
          price: tour.price,
          favourites: tour.favourites,
          region: tour.region,
          images: tourImage ? tourImage.images : [],
          destination: destination ? destination.name : "",
          description: destination ? destination.description : "",
        };
      })
    );
    res.json(tourData);
  } catch (error) {
    console.error("Error fetching tours:", error);
    res.status(500).json({ error: "Error fetching tours" });
  }
});
router.post("/increase-favourite/:tourID", async (req, res) => {
  try {
    const { tourID } = req.params;

    // Cập nhật tour bằng cách tăng số lượt thích
    const updatedTour = await Tour.findOneAndUpdate(
      { tourID },
      { $inc: { favourites: 1 } }, // Tăng 1 lượt thích
      { new: true } // Trả về dữ liệu sau khi cập nhật
    );

    if (!updatedTour) {
      return res.status(404).json({ message: "Không tìm thấy tour" });
    }

    res.json({
      message: "Tăng lượt thích thành công",
      updatedTour,
    });
  } catch (error) {
    console.error("Lỗi khi tăng lượt thích:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// GET request for tours by destination
router.get("/destination/:destinationId", async (req, res) => {
  const { destinationId } = req.params;
  try {
    const tours = await Tour.find({ destinationId });
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

router.get("/search-tours", async (req, res) => {
  try {
    const {
      destination,
      startDateFrom,
      startDateTo,
      price,
      departure,
      arrival,
      tourType,
      region,
    } = req.query;

    const query = {};

    if (destination) {
      const destinationDoc = await Destination.findOne({
        name: { $regex: destination, $options: "i" },
      });
      if (destinationDoc) {
        query.destinationId = destinationDoc.destinationId;
      } else {
        return res.json([]);
      }
    }

    if (startDateFrom && startDateTo) {
      query.startDate = { $gte: startDateFrom, $lte: startDateTo };
    } else if (startDateFrom) {
      query.startDate = { $gte: startDateFrom };
    } else if (startDateTo) {
      query.startDate = { $lte: startDateTo };
    }

    if (price) {
      query.price = { $lte: price };
    }

    if (departure) {
      query.departure = { $regex: departure, $options: "i" };
    }

    if (arrival) {
      const destinationDoc = await Destination.findOne({
        name: { $regex: arrival, $options: "i" },
      });
      if (destinationDoc) {
        query.destinationId = destinationDoc.destinationId;
      }
    }

    if (tourType) {
      query.tourType = { $regex: tourType, $options: "i" };
    }

    if (region) {
      query.region = { $regex: region, $options: "i" };
    }

    const tours = await Tour.find(query);
    const tourData = await Promise.all(
      tours.map(async (tour) => {
        const tourImage = await TourImage.findOne({ tourId: tour.tourID });
        const destination = await Destination.findOne({
          destinationId: tour.destinationId,
        });
        return {
          tourID: tour.tourID,
          name: tour.name,
          duration: tour.duration,
          departure: tour.departure,
          destinationId: tour.destinationId,
          startDate: tour.startDate,
          transport: tour.transport,
          tourType: tour.tourType,
          price: tour.price,
          favourites: tour.favourites,
          region: tour.region,
          images: tourImage ? tourImage.images : [],
          destination: destination ? destination.name : "",
          description: destination ? destination.description : "",
        };
      })
    );

    res.json(tourData);
  } catch (error) {
    console.error("Error searching tours:", error);
    res.status(500).json({ error: "Error searching tours" });
  }
});

router.delete("/remove-tour-image/:tourId", async (req, res) => {
  try {
    const { tourId } = req.params;
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Missing imageUrl" });
    }

    const tourImage = await TourImage.findOne({ tourId: parseInt(tourId) });
    if (!tourImage) {
      return res.status(404).json({ error: "Tour image not found" });
    }

    tourImage.images = tourImage.images.filter((img) => img !== imageUrl);
    await tourImage.save();

    res.json({ message: "Image removed successfully" });
  } catch (error) {
    console.error("Error removing tour image:", error);
    res.status(500).json({ error: "Error removing tour image" });
  }
});

router.post("/add-tour", upload.array("images", 10), async (req, res) => {
  try {
    console.log("Received request to /add-tour:", req.body);
    console.log("Files received:", req.files);

    const {
      name,
      duration,
      departure,
      destinationName,
      destinationDescription,
      startDate,
      transport,
      tourType,
      price,
      region,
      favourites,
    } = req.body;

    if (!name || !destinationName) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name or destinationName" });
    }

    const imageUrls = req.files
      ? req.files.map((file) => `/imgs/${file.filename}`)
      : [];

    let destination = await Destination.findOne({ name: destinationName });
    if (!destination) {
      const lastDestination = await Destination.findOne().sort({
        destinationId: -1,
      });
      const newDestinationId = lastDestination
        ? lastDestination.destinationId + 1
        : 1;
      destination = new Destination({
        destinationId: newDestinationId,
        name: destinationName,
        description: destinationDescription || "",
      });
      await destination.save();
      console.log("Created new destination:", destination);
    }

    const lastTour = await Tour.findOne().sort({ tourID: -1 });
    const newTourID = lastTour ? lastTour.tourID + 1 : 1;
    console.log("New tourID:", newTourID);

    const newTour = new Tour({
      tourID: newTourID,
      name,
      duration: duration || "",
      departure: departure || "",
      destinationId: destination.destinationId,
      startDate: startDate || "",
      transport: transport || "",
      tourType: tourType || "",
      price: price || "",
      favourites: parseInt(favourites) || 0,
      region: region || "",
    });

    const savedTour = await newTour.save();
    console.log("Saved new tour:", savedTour);

    const newTourImage = new TourImage({
      tourId: newTourID,
      images: imageUrls,
    });

    const savedTourImage = await newTourImage.save();
    console.log("Saved new tour image:", savedTourImage);

    res.json({ message: "Tour added successfully", tour: savedTour });
  } catch (error) {
    console.error("Error adding tour:", error.message, error.stack);
    res
      .status(500)
      .json({ error: "Error adding tour", details: error.message });
  }
});
router.put("/update-tour/:id", upload.array("images", 10), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      duration,
      departure,
      destinationName,
      destinationDescription,
      startDate,
      transport,
      tourType,
      price,
      region,
      favourites,
    } = req.body;

    let destination = await Destination.findOne({ name: destinationName });
    if (!destination) {
      const lastDestination = await Destination.findOne().sort({
        destinationId: -1,
      });
      const newDestinationId = lastDestination
        ? lastDestination.destinationId + 1
        : 1;
      destination = new Destination({
        destinationId: newDestinationId,
        name: destinationName,
        description: destinationDescription || "",
      });
      await destination.save();
    } else {
      destination.description =
        destinationDescription || destination.description;
      await destination.save();
    }

    const updatedTour = await Tour.findOneAndUpdate(
      { tourID: id },
      {
        name,
        duration,
        departure,
        destinationId: destination.destinationId,
        startDate,
        transport,
        tourType,
        price,
        favourites: parseInt(favourites) || 0,
        region,
      },
      { new: true }
    );

    if (!updatedTour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    const newImages = req.files
      ? req.files.map((file) => `/imgs/${file.filename}`)
      : [];
    let tourImage = await TourImage.findOne({ tourId: id });
    if (tourImage) {
      tourImage.images = [...tourImage.images, ...newImages];
      await tourImage.save();
    } else {
      tourImage = new TourImage({
        tourId: id,
        images: newImages,
      });
      await tourImage.save();
    }

    const tourImageUpdated = await TourImage.findOne({ tourId: id });
    const destinationUpdated = await Destination.findOne({
      destinationId: updatedTour.destinationId,
    });
    const tourData = {
      tourID: updatedTour.tourID,
      name: updatedTour.name,
      duration: updatedTour.duration,
      departure: updatedTour.departure,
      destinationId: updatedTour.destinationId,
      startDate: updatedTour.startDate,
      transport: updatedTour.transport,
      tourType: updatedTour.tourType,
      price: updatedTour.price,
      favourites: updatedTour.favourites,
      region: updatedTour.region,
      images: tourImageUpdated ? tourImageUpdated.images : [],
      destination: destinationUpdated ? destinationUpdated.name : "",
      description: destinationUpdated ? destinationUpdated.description : "",
    };

    res.json({ message: "Tour updated successfully", tour: tourData });
  } catch (error) {
    console.error("Error updating tour:", error);
    res.status(500).json({ error: "Error updating tour" });
  }
});
// get destinations
router.get("/get-destinations", async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});
//  get get-tour-images
router.get("/get-tour-images", async (req, res) => {
  try {
    const tourImages = await TourImage.find();
    res.status(200).json(tourImages);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});
// get destination theo id
router.get("/get-destination/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const destination = await Destination.findOne({ destinationId: id });
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
// get tour image theo id
router.get("/get-tour-image/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tourImage = await TourImage.findOne({ tourId: id });
    if (!tourImage) {
      return res.status(404).json({ message: "Tour image not found" });
    }
    res.status(200).json(tourImage);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
// `http://localhost:3002/get-tours?region=${currentTour.region}&exclude=${currentTour.id}`
router.get("/get-tours-by-region", async (req, res) => {
  try {
    const { region, exclude } = req.query;
    const tours = await Tour.find({ region, tourID: { $ne: exclude } });
    const tourData = await Promise.all(
      tours.map(async (tour) => {
        const tourImage = await TourImage.findOne({ tourId: tour.tourID });
        const destination = await Destination.findOne({
          destinationId: tour.destinationId,
        });
        return {
          tourID: tour.tourID,
          name: tour.name,
          duration: tour.duration,
          departure: tour.departure,
          destinationId: tour.destinationId,
          startDate: tour.startDate,
          transport: tour.transport,
          tourType: tour.tourType,
          price: tour.price,
          favourites: tour.favourites,
          region: tour.region,
          images: tourImage ? tourImage.images : [],
          destination: destination ? destination.name : "",
          description: destination ? destination.description : "",
        };
      })
    );
    res.json(tourData);
  } catch (error) {
    console.error("Error fetching tours by region:", error);
    res.status(500).json({ error: "Error fetching tours by region" });
  }
});
// tim kiem tour theo dia diem den, ngay di , ngan sach
router.get("/search-tour", async (req, res) => {
  try {
    const { destinationId, startDate, price } = req.query;
    const query = {};

    if (destinationId) {
      query.destinationId = destinationId;
    }
    if (startDate && startDate !== "null") {
      query.startDate = { $gte: new Date(startDate) };
    }
    if (price && price !== "null") {
      query.$expr = {
        $lte: [
          {
            $toDouble: {
              $replaceAll: { input: "$price", find: ".", replacement: "" },
            },
          },
          parseFloat(price.replace(/\./g, "")),
        ],
      };
    }

    const tours = await Tour.find(query);
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

export default router;
