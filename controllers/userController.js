// import UserModel from '../models/userModel.js';
// import otpService from '../services/otpService.js';
// import twilioConfig from '../config/twilio.js';
// import twilio from 'twilio';

// const twilioClient = twilio(twilioConfig.accountSid, twilioConfig.authToken);

// export const generateOtp = async (req, res) => {
//   const { userName, phoneNumber } = req.body;

//   try {
//     // Check if a user with the same phone number already exists
//     const existingUser = await UserModel.findOne({ phoneNumber });

//     if (existingUser) {
//       return res.status(400).json({ msg: 'User with the same phoneNumber already exists! Please check the number' });
//     }

//     const otp = await otpService.generateOTP();
//     const hashedOTP = await otpService.hashOTP(otp);

//     const newUser = new UserModel({ username, phoneNumber, passwordHash: hashedOTP });

//     await newUser.save();

//     // Send OTP to the user's phone number using Twilio
//     const message = await twilioClient.messages.create({
//       body: `Your OTP is: ${otp}`,
//       from: twilioConfig.phoneNumber,
//       to: phoneNumber,
//     });

//     console.log(`OTP sent with message SID: ${message.sid}`);

//     res.json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error('Error during user registration:', err);
//     res.status(500).json({ error: 'Failed to register user' });
//   }
// };

// export const registerUser = async (req, res) => {
//   const { userName,phoneNumber, otp } = req.body;

//   try {
//     const user = await UserModel.findOne({ phoneNumber });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const result = await otpService.compareOTP(otp, user.passwordHash);

//     if (!result) {
//       return res.status(400).json({ error: 'Invalid OTP' });
//     }

//     res.json({ message: 'OTP is valid' });
//   } catch (err) {
//     console.error('Error during OTP validation:', err);
//     res.status(500).json({ error: 'Failed to validate OTP' });
//   }
// };



import UserModel from '../models/userModel.js';
// import otpService from '../services/otpService.js';
import twilioConfig from '../config/twilio.js';
import twilio from 'twilio';

const twilioClient = twilio(twilioConfig.accountSid, twilioConfig.authToken);

// Define a global variable to store the OTP temporarily
let tempOTP = null;

export const generateOtp = async (req, res) => {
  const { userName,phoneNumber } = req.body;

  try {
    // Check if a user with the same phone number already exists
    const existingUser = await UserModel.findOne({ phoneNumber });

    if (existingUser) {
      return res.status(400).json({ msg: 'User with the same phoneNumber already exists! Please check the number' });
    }

    // Generate a new OTP
    // tempOTP=await otpService.generateOTP();

    tempOTP = Math.floor(1000 + Math.random() * 9000);
    console.log(tempOTP);

    // Send OTP to the user's phone number using Twilio
    const message = await twilioClient.messages.create({
      body: `Your OTP is: ${tempOTP}`,
      from: twilioConfig.phoneNumber,
      to: phoneNumber,
    });

    console.log(`OTP sent with message SID: ${message.sid}`);

    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Error during OTP generation:', err);
    res.status(500).json({ error: 'Failed to generate OTP' });
  }
};

export const registerUser = async (req, res) => {
  const { userName, phoneNumber, otp } = req.body;

  try {
    // Check if a user with the same phone number already exists
    const existingUser = await UserModel.findOne({ phoneNumber });

    if (existingUser) {
      return res.status(400).json({ msg: 'User with the same phoneNumber already exists! Please check the number' });
    }

    // Validate the entered OTP
    if (otp !== tempOTP) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // If the OTP is valid, create and save the new user
    const newUser = new UserModel({ userName, phoneNumber});
    console.log("New User Added to DB",newUser);
    await newUser.save();

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during user registration:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
};
