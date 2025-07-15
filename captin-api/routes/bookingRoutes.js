import express from 'express';
import Joi from 'joi';
import {
  createBooking,
  getMyBookings,
  updateBookingStatus,
  getCaptinSchedule,
  getCaptinScheduleSlots,
  getAllBookings
} from '../controllers/bookingController.js';

import {
  protect,
  authorizeRoles
} from '../middleware/authMiddleware.js';
import { validateBody, validateQuery } from '../middleware/validationMiddleware.js';
import { createBookingSchema } from '../schemas/bookingSchema.js';
const router = express.Router();

router.post('/', protect, validateBody(createBookingSchema), createBooking);

router.get('/slots', validateQuery(Joi.object({
  captinId: Joi.string().hex().length(24).required(),
  date: Joi.date().iso().required()
})), getCaptinScheduleSlots);
router.put('/:bookingId/status', protect, authorizeRoles('clubOwner'), updateBookingStatus);
router.post('/', protect, createBooking);
router.get('/mine', protect, getMyBookings);
router.get('/schedule', protect, authorizeRoles('captin'), getCaptinSchedule);
router.get('/slots', getCaptinScheduleSlots);
router.get('/all', protect, authorizeRoles('admin', 'clubOwner'), getAllBookings);

export default router;