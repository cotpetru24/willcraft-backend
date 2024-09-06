import express from 'express';
import {getAllReviews, getLast3Reviews, updateReview, createReview, deleteReview} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', getAllReviews);

router.get('/latest', getLast3Reviews);

router.post('/', protect, createReview);

router.put('/:id', protect, updateReview);

router.delete('/:id', protect, deleteReview);

export {router as reviewRoutes }