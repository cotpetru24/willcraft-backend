import express from 'express';
import { createPerson, deletePerson, getPersons, updatePerson } from '../controllers/peopleController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', protect, getPersons);

router.post('/', protect, createPerson);

router.put('/:id', protect, updatePerson);

router.delete('/:id', protect, deletePerson);

export { router as peopleRoutes };
