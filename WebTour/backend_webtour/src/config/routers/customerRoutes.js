import express from "express";
import Account from "../models/Account.js";
import User from "../models/User.js";
const router = express.Router();

router.get("/get-customers", async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" });
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Error fetching customers" });
  }
});

router.put("/update-customer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, address, phoneNumber, email } = req.body;

    const updatedCustomer = await User.findOneAndUpdate(
      { userID: id, role: "customer" },
      { username, address, phoneNumber, email },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    await Account.findOneAndUpdate(
      { userID: id },
      { user: phoneNumber },
      { new: true }
    );

    res.json({
      message: "Customer updated successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: "Error updating customer" });
  }
});

router.delete("/delete-customer/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCustomer = await User.findOneAndDelete({
      userID: id,
      role: "customer",
    });

    if (!deletedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    await Account.findOneAndDelete({ userID: id });

    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: "Error deleting customer" });
  }
});
export default router;
