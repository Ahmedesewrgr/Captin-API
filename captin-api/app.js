

import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import clubRoutes from './routes/clubRoutes.js'
import captinRoutes from './routes/captinRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/captins', captinRoutes);
app.use('/api/bookings', bookingRoutes);


// Routes placeholder
app.get('/', (req, res) => {
  res.send('Captin API is running...');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));


