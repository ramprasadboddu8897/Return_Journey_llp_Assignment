// models/userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: String,
  phoneNumber: String,
});

export default mongoose.model('User', userSchema);
