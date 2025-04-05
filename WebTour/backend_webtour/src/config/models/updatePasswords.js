import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { CONNECT_DB } from '../mongodb.js';

// Định nghĩa schema và model cho collection accounts
const accountSchema = new mongoose.Schema({
  userID: { type: Number, ref: 'User' },
  user: String,
  password: String,
});
const Account = mongoose.model('Account', accountSchema, 'accounts');

const updatePasswords = async () => {
  try {
    await CONNECT_DB();
    console.log('Connected to MongoDB');

    const accounts = await Account.find();
    console.log(`Found ${accounts.length} accounts`);

    for (const account of accounts) {
      // Kiểm tra xem mật khẩu đã được mã hóa chưa
      if (!account.password.startsWith('$2b$')) {
        console.log(`Updating password for user: ${account.user}`);
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(account.password, saltRounds);
        account.password = hashedPassword;
        await account.save();
        console.log(`Updated password for user: ${account.user}`);
      }
    }

    console.log('All passwords updated successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error updating passwords:', error);
    mongoose.connection.close();
  }
};

updatePasswords();