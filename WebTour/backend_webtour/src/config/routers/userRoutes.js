import express from "express";
import User from "../models/User.js"; // Adjust the path as necessary
import Account from "../models/Account.js"; // Adjust the path as necessary

const router = express.Router();

router.get("/get-users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

router.post("/add-user", async (req, res) => {
  try {
    const { username, address, phoneNumber, email, role } = req.body;

    const lastUser = await User.findOne().sort({ userID: -1 });
    const newUserID = lastUser ? lastUser.userID + 1 : 1;

    const newUser = new User({
      userID: newUserID,
      username,
      email,
      phoneNumber,
      address,
      role,
    });

    await newUser.save();

    const newAccount = new Account({
      userID: newUserID,
      user: phoneNumber,
      password: "123",
    });

    await newAccount.save();

    res.json({
      message: "User and account created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Error adding user" });
  }
});

router.put("/update-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, address, phoneNumber, email, role } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { userID: id },
      { username, address, phoneNumber, email, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    await Account.findOneAndUpdate(
      { userID: id },
      { user: phoneNumber },
      { new: true }
    );

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
});

export default router;
