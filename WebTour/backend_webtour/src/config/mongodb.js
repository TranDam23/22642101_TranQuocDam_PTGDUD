
import mongoose from 'mongoose';

// URL kết nối đến MongoDB Atlas
const url = "mongodb+srv://webtour:k7GazrvS5bWh3EnX@cluster0-webtour.gnflu.mongodb.net/WebTour?retryWrites=true&w=majority&appName=ClusterWeb&ssl=true";

// Hàm kết nối đến MongoDB bằng Mongoose
export const CONNECT_DB = async () => {
  try {
    await mongoose.connect(url, {
      ssl: true,
      serverSelectionTimeoutMS: 5000, // Timeout sau 5 giây nếu không kết nối được
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Hàm lấy database instance (không cần thiết khi dùng Mongoose, nhưng giữ lại để tương thích)
export const GET_DB = () => {
  if (!mongoose.connection.db) {
    throw new Error('No database connection');
  }
  return mongoose.connection.db;
};


// import { MongoClient, ServerApiVersion } from "mongodb";
// const username = "theanh123";
// const password = encodeURIComponent("Theanh@123");
// const url =
//   "mongodb+srv://webtour:k7GazrvS5bWh3EnX@cluster0-webtour.gnflu.mongodb.net/?retryWrites=true&w=majority&appName=ClusterWeb&ssl=true";
// const dbName = "WebTour";
// let webtourDataBaseInstance = null;
// const monggoClientInstance = new MongoClient(url, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: false,
//   },
//   tlsAllowInvalidCertificates: true,
// });

// export const CONNECT_DB = async () => {
//   try {
//     await monggoClientInstance.connect();
//     webtourDataBaseInstance = monggoClientInstance.db(dbName);
//   } catch (error) {
//     console.log("Error while connecting to database", error);
//   }
// };

// export const GET_DB = () => {
//   if (!webtourDataBaseInstance) {
//     console.log("Database not connected");
//   }
//   return webtourDataBaseInstance;
// };





// import { MongoClient, ServerApiVersion } from "mongodb";
// const username = "theanh123";
// const password = encodeURIComponent("Theanh@123");
// const url =
//   "mongodb+srv://webtour:k7GazrvS5bWh3EnX@cluster0-webtour.gnflu.mongodb.net/?retryWrites=true&w=majority&appName=ClusterWeb&ssl=true";
//   // `mongodb+srv://${username}:${password}@clusterweb.1aqyn.mongodb.net/WebTour?retryWrites=true&w=majority&ssl=true`;
// const dbName = "WebTour";
// let webtourDataBaseInstance = null;
// const monggoClientInstance = new MongoClient(url, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: false,
//   },
//   tlsAllowInvalidCertificates: true,
// });

// export const CONNECT_DB = async () => {
//   try {
//     await monggoClientInstance.connect();
//     webtourDataBaseInstance = monggoClientInstance.db(dbName);
//   } catch (error) {
//     console.log("Error while connecting to database", error);
//   }
// };
// export const GET_DB = () => {
//   if (!webtourDataBaseInstance) {
//     console.log("Database not connected");
//   }
//   return webtourDataBaseInstance;
// };
