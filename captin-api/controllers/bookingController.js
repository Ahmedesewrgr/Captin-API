import Booking from '../models/Booking.js';
import Captin from '../models/Captin.js';

import { createBookingService } from '../services/bookingService.js';

export const createBooking = async (req, res) => {
  try {
    const booking = await createBookingService(req);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
import { getMyBookingsService } from '../services/bookingService.js';

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await getMyBookingsService(req.user._id);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

import { updateBookingStatusService } from '../services/bookingService.js';

export const updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body;

  try {
    const booking = await updateBookingStatusService(bookingId, status, req.user);
    res.json({ message: `Booking ${status}`, booking });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

import { getCaptinScheduleService } from '../services/bookingService.js';

export const getCaptinSchedule = async (req, res) => {
  try {
    const bookings = await getCaptinScheduleService(req.user._id);
    res.json(bookings);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
import { getCaptinScheduleSlotsService } from '../services/bookingService.js';

export const getCaptinScheduleSlots = async (req, res) => {
  const { captinId, date } = req.query;

  try {
    const slots = await getCaptinScheduleSlotsService(captinId, date);
    res.json(slots);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


import { getAllBookingsService } from '../services/bookingService.js';

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await getAllBookingsService();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};