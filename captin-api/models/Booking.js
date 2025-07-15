import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  captin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Captin',
    required: true
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  duration: {
    type: Number,
    default: 1 
  },
  price: {
    type: Number
  }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);