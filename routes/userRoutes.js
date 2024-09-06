import express from 'express';
import { registerUser, loginUser, getCurrentUser, updateUserDetails, updateUserPassword } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', registerUser);

router.post('/login', loginUser);

router.put('/:id', protect, updateUserPassword);

router.put('/updateUserDetails/:id', protect, updateUserDetails);

router.get('/currentUser', protect, getCurrentUser);

export { router as userRoutes };
