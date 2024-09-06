import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createOrder, deleteOrder, getAllUserOrders, getOrder, updateOrder } from '../controllers/orderController.js';


const router = express.Router();

router.get('/:id',protect, getOrder);

router.get('/',protect, getAllUserOrders);

router.post('/', protect, createOrder);

router.put('/:id', protect, updateOrder);

router.delete('/:id', protect, deleteOrder);

export { router as orderRoutes };
