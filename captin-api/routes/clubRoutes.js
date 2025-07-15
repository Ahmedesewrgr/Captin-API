import express from 'express';
import { createClub, getMyClubs } from '../controllers/clubController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { validateBody } from '../middleware/validationMiddleware.js';
import { createClubSchema } from '../schemas/clubSchema.js';
const router = express.Router();


router.post('/', protect, authorizeRoles('clubOwner'), validateBody(createClubSchema), createClub);
router.post('/', protect, authorizeRoles('clubOwner'), createClub);
router.get('/mine', protect, getMyClubs);

export default router;