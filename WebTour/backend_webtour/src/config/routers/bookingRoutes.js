import express from "express";
import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";
import TourImage from "../models/TourImage.js";
import Destination from "../models/Destination.js";
import BookingDetail from "../models/BookingDetail.js";
const router = express.Router();

router.get("/stats/revenue", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let matchStage = {
      bookingDate: { $exists: true, $ne: null, $regex: /^\d{4}-\d{2}-\d{2}$/ },
    };

    // Nếu có startDate và endDate, thêm điều kiện lọc
    if (startDate && endDate) {
      matchStage.bookingDate = {
        ...matchStage.bookingDate,
        $gte: startDate,
        $lte: endDate,
      };
    } else if (startDate) {
      matchStage.bookingDate = {
        ...matchStage.bookingDate,
        $gte: startDate,
      };
    } else if (endDate) {
      matchStage.bookingDate = {
        ...matchStage.bookingDate,
        $lte: endDate,
      };
    }

    const revenueStats = await Booking.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            year: {
              $year: { $dateFromString: { dateString: "$bookingDate" } },
            },
            month: {
              $month: { $dateFromString: { dateString: "$bookingDate" } },
            },
          },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    const formattedStats = revenueStats.map((stat) => ({
      month: `${stat._id.month}/${stat._id.year}`,
      totalRevenue: stat.totalRevenue,
    }));

    res.json(formattedStats);
  } catch (error) {
    console.error("Error fetching revenue stats:", error);
    res.status(500).json({ error: "Error fetching revenue stats" });
  }
});
// get tour booking detail theo id booking id
router.get("/get-booking-detail/:id", async (req, res) => {
  try {
    const bookingID = req.params.id;
    console.log(`Fetching booking detail with ID: ${bookingID}`);
    const bookingdetail = await BookingDetail.findOne({ bookingID: bookingID });

    if (!bookingdetail) {
      return res.status(404).json({ message: "Không tìm thấy booking detail" });
    }

    res.json(bookingdetail); // Trả về JSON, không phải JSX
  } catch (error) {
    console.error("Error fetching booking detail:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// API lấy thông tin đặt tour theo ID
router.get("/get-tour-booking/:id", async (req, res) => {
  try {
    const tourId = req.params.id; // Lấy ID từ URL
    console.log(`Fetching tour with ID: ${tourId}`);

    // Tìm tour theo ID trong MongoDB
    const tour = await Tour.findOne({ tourID: tourId });

    if (!tour) {
      return res.status(404).json({ message: "Không tìm thấy tour" });
    }

    res.json(tour); // Trả về dữ liệu tour
  } catch (error) {
    console.error("Error fetching tour:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});
// Tim tour tu userID
router.get("/get-tour-booking-user/:userID", async (req, res) => {
  try {
    const userID = req.params.userID; // Lấy ID từ URL
    console.log(`Fetching tour with userID: ${userID}`);

    // Tìm tour theo ID trong MongoDB
    const tours = await Booking.find({ userID: userID });

    if (!tours) {
      return res.status(404).json({ message: "Không tìm thấy tour" });
    }

    res.json(tours); // Trả về dữ liệu tour
  } catch (error) {
    console.error("Error fetching tour:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});
router.get("/get-all-booking-detail", async (req, res) => {
  try {
    const bookingDetails = await BookingDetail.find({});
    if (!bookingDetails) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin đặt tour" });
    }
    res.json(bookingDetails);
  } catch (error) {
    console.error("Error fetching booking details:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});
// API lấy tất cả thông tin đặt tour
router.get("/get-all-booking", async (req, res) => {
  try {
    const bookings = await Booking.find({});
    if (!bookings) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin đặt tour" });
    }
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// API lưu thông tin đặt tour
router.post("/save-booking", async (req, res) => {
  try {
    const {
      bookingID,
      userID,
      tourId,
      bookingDate,
      status,
      totalPrice,
      travelerName,
      numPeople,
      departureTime,
      returnTime,
      transportation,
      hotel,
    } = req.body;
    console.log("Received booking data:", req.body);
    // Kiểm tra dữ liệu đầu vào
    if (
      !bookingID ||
      !userID ||
      !tourId ||
      !bookingDate ||
      !status ||
      !totalPrice
    ) {
      return res.status(400).json({ message: "Thiếu thông tin đặt tour" });
    }

    // Lưu Booking
    const newBooking = new Booking({
      bookingID,
      userID,
      tourID: tourId,
      bookingDate,
      status,
      totalPrice,
    });
    await newBooking.save();

    // Lưu BookingDetail
    const newBookingDetail = new BookingDetail({
      bookingID,
      travelerName,
      numPeople,
      departureTime,
      returnTime,
      transportation,
      hotels: hotel,
    });
    await newBookingDetail.save();

    res.status(201).json({
      message: "Đặt tour thành công!",
      booking: newBooking,
      bookingDetail: newBookingDetail,
    });
  } catch (error) {
    console.error("Lỗi khi lưu booking:", error);
    res.status(500).json({ message: "Lỗi server, không thể lưu booking" });
  }
});

router.delete("/delete-booking/:id", async (req, res) => {
  try {
    const bookingID = req.params.id;
    console.log(`Cancelling booking with ID: ${bookingID}`);

    // Tìm booking theo ID
    const booking = await Booking.findOne({ bookingID });

    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy booking" });
    }
    console.log("Booking found:", booking);
    // Lấy thông tin tour từ booking
    const tour = await Tour.findOne({ tourID: booking.tourID });

    if (!tour) {
      return res.status(404).json({ message: "Không tìm thấy tour" });
    }

    // Lấy ngày hiện tại
    const today = new Date().setHours(0, 0, 0, 0);
    const startDate = new Date(tour.startDate).setHours(0, 0, 0, 0);

    // Kiểm tra nếu tour đã khởi hành thì không thể hủy
    if (startDate <= today) {
      return res
        .status(400)
        .json({ message: "Tour đã khởi hành, không thể hủy!" });
    }

    // Nếu chưa khởi hành, cập nhật trạng thái thành "cancelled"
    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Hủy booking thành công", updatedBooking: booking });
  } catch (error) {
    console.error("Lỗi khi hủy booking:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});
// tim booking tu userID va tourID
router.get("/get-booking/:userID/:tourID", async (req, res) => {
  try {
    const { userID, tourID } = req.params; // Lấy ID từ URL
    console.log(`Fetching booking with userID: ${userID}, tourID: ${tourID}`);

    // Tìm booking theo userID và tourID trong MongoDB
    const booking = await Booking.findOne({ userID, tourID });

    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy booking" });
    }

    res.json(booking); // Trả về dữ liệu booking
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

router.get("/stats/bookings", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let matchStage = {
      bookingDate: { $exists: true, $ne: null, $regex: /^\d{4}-\d{2}-\d{2}$/ },
    };

    // Nếu có startDate và endDate, thêm điều kiện lọc
    if (startDate && endDate) {
      matchStage.bookingDate = {
        ...matchStage.bookingDate,
        $gte: startDate,
        $lte: endDate,
      };
    } else if (startDate) {
      matchStage.bookingDate = {
        ...matchStage.bookingDate,
        $gte: startDate,
      };
    } else if (endDate) {
      matchStage.bookingDate = {
        ...matchStage.bookingDate,
        $lte: endDate,
      };
    }

    const bookingStats = await Booking.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            year: {
              $year: { $dateFromString: { dateString: "$bookingDate" } },
            },
            month: {
              $month: { $dateFromString: { dateString: "$bookingDate" } },
            },
          },
          totalBookings: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    const formattedStats = bookingStats.map((stat) => ({
      month: `${stat._id.month}/${stat._id.year}`,
      totalBookings: stat.totalBookings,
    }));

    res.json(formattedStats);
  } catch (error) {
    console.error("Error fetching booking stats:", error);
    res.status(500).json({ error: "Error fetching booking stats" });
  }
});

export default router;
