import express from 'express';
import { createAsset, getAsset, updateAsset, deleteAsset } from '../controllers/assetsController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', protect, getAsset);

router.post('/', protect, createAsset);

router.put('/:id', protect, updateAsset);

router.delete('/:id', protect, deleteAsset);

export { router as assetRoutes };
