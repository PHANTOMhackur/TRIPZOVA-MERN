const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const sanitizeInput = require('./middleware/sanitizeInput');

dotenv.config({ path: path.join(__dirname, '.env') });

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 20) {
  console.error('FATAL: JWT_SECRET is missing or too weak.');
  process.exit(1);
}

const connectDatabase = require('./config/database');
const passport = require('./config/passport');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const otpRoutes = require('./routes/otpRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const vehicleSearchRoutes = require('./routes/vehicleSearchRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const { getCurrentUser } = require('./controllers/authSessionController');
const { syncActiveBookingReservations } = require('./services/availabilityService');
const VehicleReservation = require('./models/VehicleReservation');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
app.set('trust proxy', 1);


app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: CLIENT_URL.split(',').map((v) => v.trim()), credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(sanitizeInput);
app.use(passport.initialize());

const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300, standardHeaders: true, legacyHeaders: false });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30, standardHeaders: true, legacyHeaders: false });
app.use('/api', apiLimiter);
app.use(['/api/auth/login', '/api/auth/phone-login', '/api/auth/otp', '/api/auth/forgot-password', '/api/auth/reset-password', '/api/users/register'], authLimiter);

app.get('/', (req, res) => res.json({
  success: true,
  message: 'TRIPZOVA API is running.',
  health: '/api/health'
}));
app.get('/api/health', (req, res) => res.json({ success: true, message: 'TRIPZOVA API is healthy.' }));
app.get('/api/auth/me', authMiddleware, getCurrentUser);
app.use('/api/auth', passwordRoutes);
app.use('/api/auth/otp', otpRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/vehicles', vehicleSearchRoutes);
app.use('/api/contact', contactRoutes);

app.use('/api', (req, res) => res.status(404).json({ success: false, message: 'API route not found.' }));

// The React frontend is deployed separately (for example, on Vercel).
// This API service intentionally does not serve client/dist.

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);
  res.status(error.status || 500).json({ success: false, message: error.message || 'Internal server error.' });
});

async function startServer() {
  await connectDatabase();

  // Build the unique vehicle/date index before accepting booking requests.
  // This is the database-level guarantee that prevents race-condition double bookings.
  await VehicleReservation.init();

  try {
    const syncResult = await syncActiveBookingReservations();
    if (syncResult.created > 0 || syncResult.removedStale > 0) {
      console.log(
        `Availability calendar synced (${syncResult.created} day reservations added, ${syncResult.removedStale} stale locks removed).`
      );
    }
  } catch (error) {
    console.warn('Availability calendar sync warning:', error.message);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TRIPZOVA API running on port ${PORT}`);
  });
}

startServer();
