import mongoose from "mongoose";
// Định nghĩa schema và model cho collection chats
const chatSchema = new mongoose.Schema({
  chatID: Number,
  cusID: Number,
  guideID: Number,
  messages: [
    {
      sender: String,
      text: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  starred: { type: Boolean, default: false },
});
const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
