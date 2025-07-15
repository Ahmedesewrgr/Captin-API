import Booking from '../models/Booking.js';
import Captin from '../models/Captin.js';

export const createBookingService = async (req) => {
  const { captin, club, date, duration = 1 } = req.body;

  const newStart = new Date(date);
  const newEnd = new Date(newStart.getTime() + duration * 60 * 60 * 1000);

  const bookings = await Booking.find({ captin });
  const hasOverlap = bookings.some((b) => {
    const bStart = new Date(b.date);
    const bEnd = new Date(bStart.getTime() + (b.duration || 1) * 60 * 60 * 1000);
    return newStart < bEnd && newEnd > bStart;
  });

  if (hasOverlap) {
    throw new Error('This captin already has a session that overlaps with this time');
  }

  const hour = newStart.getUTCHours();
  const rate = hour < 13 ? 40 : 50;
  const price = rate * duration;

  const booking = await Booking.create({
    user: req.user._id,
    captin,
    club,
    date,
    duration,
    price
  });

  return booking;
};

export const getMyBookingsService = async (userId) => {
  const bookings = await Booking.find({ user: userId })
    .populate('captin', 'name specialty')
    .populate('club', 'name location');

  return bookings;
};
export const updateBookingStatusService = async (bookingId, status, user) => {
  if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
    throw new Error('Invalid status value');
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.club.toString() !== user._id.toString() && user.role !== 'clubOwner') {
    throw new Error('Not authorized to update this booking');
  }

  booking.status = status;
  await booking.save();

  return booking;
};

export const getCaptinScheduleService = async (userId) => {
  const captin = await Captin.findOne({ user: userId });
  if (!captin) {
    throw new Error('No captin profile found for this user');
  }

  const bookings = await Booking.find({ captin: captin._id })
    .populate('user', 'name email')
    .populate('club', 'name location')
    .sort({ date: 1 });

  return bookings;
};
export const getCaptinScheduleSlotsService = async (captinId, date) => {
  if (!captinId || !date) {
    throw new Error('captinId and date are required');
  }

  const dayStart = new Date(date);
  dayStart.setUTCHours(9, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setUTCHours(17, 0, 0, 0);

  const bookings = await Booking.find({
    captin: captinId,
    date: { $gte: dayStart, $lt: dayEnd }
  }).populate('user', 'name').populate('club', 'name');

  const slots = [];
  for (let hour = 9; hour < 17; hour++) {
    const slotStart = new Date(date);
    slotStart.setUTCHours(hour, 0, 0, 0);
    const slotEnd = new Date(slotStart);
    slotEnd.setUTCHours(slotEnd.getUTCHours() + 1);

    const booking = bookings.find((b) => {
      const bookingStart = new Date(b.date);
      const bookingEnd = new Date(bookingStart.getTime() + 60 * 60 * 1000);
      return slotStart < bookingEnd && slotEnd > bookingStart;
    });

    if (booking) {
      slots.push({
        time: `${hour}:00 - ${hour + 1}:00`,
        status: 'booked',
        user: booking.user?.name || 'Unknown',
        club: booking.club?.name || 'Unknown'
      });
    } else {
      slots.push({
        time: `${hour}:00 - ${hour + 1}:00`,
        status: 'available'
      });
    }
  }

  return slots;
};

export const getAllBookingsService = async () => {
  const bookings = await Booking.find()
    .populate('user', 'name email')
    .populate('captin', 'name specialty')
    .populate('club', 'name location')
    .sort({ date: 1 });

  return bookings;
};