// services/otpService.js
import bcrypt from 'bcrypt';
const saltRounds = 10;

export default {
  generateOTP: async () => {
    try {
      const otp = Math.floor(1000 + Math.random() * 9000);
      return otp;
    } catch (err) {
      throw err;
    }
  },

  hashOTP: async (otp) => {
    try {
      console.log(otp);
      const hash = await bcrypt.hash(otp.toString(),saltRounds);
      return hash;
    } catch (err) {
      throw err;
    }
  },

  compareOTP: async (enteredOTP, hashedOTP) => {
    try {
      console.log(enteredOTP,hashedOTP);
      const result = await bcrypt.compare(enteredOTP.toString(), hashedOTP);
      return result;
    } catch (err) {
      throw err;
    }
  },
};
