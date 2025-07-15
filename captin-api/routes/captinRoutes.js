import express from 'express';
import Captin from '../models/Captin.js';
import { createCaptin, getCaptinsByClub } from '../controllers/captinController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { validateBody } from '../middleware/validationMiddleware.js';
import { createCaptinSchema } from '../schemas/captinSchema.js';
const router = express.Router();

router.post('/', protect, authorizeRoles('clubOwner'), validateBody(createCaptinSchema), createCaptin);
router.post('/', protect, authorizeRoles('clubOwner'), createCaptin);
router.get('/:clubId', protect, getCaptinsByClub);

router.post('/me', protect, authorizeRoles('captin'), async (req, res) => {
  const { specialty, club } = req.body;

  try {
    const existing = await Captin.findOne({ user: req.user._id });
    if (existing) {
      return res.status(400).json({ message: 'Captin profile already exists' });
    }

    const captin = await Captin.create({
      name: req.user.name,
      specialty,
      club,
      user: req.user._id,
      createdBy: req.user._id
    });

    res.status(201).json(captin);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;