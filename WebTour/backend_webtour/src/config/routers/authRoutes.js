import User from "../models/User.js";
import Account from "../models/Account.js"; // Adjust the path as necessary
import express from "express";
import bcrypt from "bcrypt";
import accountModel from "../models/Account.js";

const router = express.Router();
const saltRounds = 10; // Số vòng băm (tăng lên nếu cần bảo mật cao hơn)

router.post("/login", async (req, res) => {
  const { phoneNumber, password } = req.body;

  console.log("Received login request:", { phoneNumber, password });

  try {
    const account = await Account.findOne({ user: phoneNumber });
    console.log("Found account:", account);

    if (!account) {
      return res
        .status(401)
        .json({ message: "Số điện thoại hoặc mật khẩu không đúng" });
    }

    let isMatch = false;
    // Kiểm tra xem mật khẩu trong database có phải là mật khẩu đã mã hóa không
    if (account.password.startsWith("$2b$")) {
      // Nếu đã mã hóa, so sánh bằng bcrypt
      isMatch = await bcrypt.compare(password, account.password);
    } else {
      // Nếu chưa mã hóa, so sánh trực tiếp
      isMatch = password === account.password;
      // (Tùy chọn) Mã hóa lại mật khẩu và cập nhật vào database
      if (isMatch) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        account.password = hashedPassword;
        await account.save();
        console.log(
          `Updated password for user: ${phoneNumber} to hashed format`
        );
      }
    }

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Số điện thoại hoặc mật khẩu không đúng" });
    }

    const user = await User.findOne({ userID: account.userID });
    console.log("Found user:", user);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin người dùng" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
});
// Change password
router.post("/doiMatKhau", async (req, res) => {
  const { userName, password, newPassword } = req.body;
  try {
    const account = await accountModel.findOne({ userName });

    if (!account) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username!" });
    }

    const passwordMatch = await bcrypt.compare(password, account.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password!" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    await accountModel.findOneAndUpdate(
      { userName },
      { password: hashedNewPassword }
    );

    res.status(200).json({ success: true, message: "Password changed!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

// API Đăng ký
router.post("/register", async (req, res) => {
  try {
    const {
      username,
      email,
      phoneNumber,
      password,
      confirmPassword,
      province,
      district,
    } = req.body;

    // Validate input
    if (
      !username ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword ||
      !province ||
      !district
    ) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin." });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email không hợp lệ." });
    }

    // Validate phone number (chỉ chứa số và độ dài 10-11 ký tự)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res
        .status(400)
        .json({ message: "Số điện thoại không hợp lệ. Phải có 10-11 chữ số." });
    }

    // Validate password (ít nhất 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
      });
    }

    // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Mật khẩu và xác nhận mật khẩu không khớp." });
    }

    // Kiểm tra xem email hoặc số điện thoại đã tồn tại chưa
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email hoặc số điện thoại đã được sử dụng." });
    }

    // Tạo userID mới
    const lastUser = await User.findOne().sort({ userID: -1 });
    const newUserID = lastUser ? lastUser.userID + 1 : 1;

    // Gộp tỉnh/thành và quận/huyện thành địa chỉ
    const address = `${district}, ${province}`;

    // Tạo user mới
    const newUser = new User({
      userID: newUserID,
      username,
      email,
      phoneNumber,
      address,
      role: "customer",
    });
    console.log("New user created:", newUser);
    // Mã hóa mật khẩu
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Tạo account mới
    const newAccount = new Account({
      userID: newUserID,
      userName: phoneNumber,
      password: hashedPassword,
    });

    // Lưu vào database
    await newUser.save();
    await newAccount.save();

    res
      .status(201)
      .json({ message: "Đăng ký thành công! Vui lòng đăng nhập." });
  } catch (error) {
    console.error("Error in /register:", error);
    res.status(500).json({ message: "Đăng ký thất bại. Vui lòng thử lại." });
  }
});

router.get("/home", async (req, res) => {
  try {
    const { phoneNumber } = req.query;

    if (!phoneNumber) {
      return res.status(400).json({ message: "Thiếu số điện thoại" });
    }

    const account = await Account.findOne({ user: phoneNumber });
    if (!account) {
      return res.status(401).json({ message: "Người dùng không tồn tại" });
    }

    const user = await User.findOne({ userID: account.userID });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin người dùng" });
    }

    if (user.role !== "customer") {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền truy cập trang này" });
    }

    res.json({
      message: "Truy cập trang Home thành công",
      user: {
        userID: user.userID,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in /home:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
});

export default router;
