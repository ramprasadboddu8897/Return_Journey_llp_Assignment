// routes/userRoutes.js
import express from 'express';
import { generateOtp, registerUser} from '../controllers/userController.js';
import validateIPAddressMiddleware from '../middleware/ipValidationMiddleware.js';

const router = express.Router();

router.post('/register', validateIPAddressMiddleware,generateOtp);
router.post('/verify',validateIPAddressMiddleware, registerUser);

export default router;
