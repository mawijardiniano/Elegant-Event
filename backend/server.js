const express = require('express');
const cors = require('cors');
require('dotenv').config();

const adminRoutes = require('./routes/admin.routes');
const eventRoutes = require('./routes/event.routes');
const packageRouter = require('./routes/package.routes')
const serviceRouter = require('./routes/service.routes')
const venueRouter = require('./routes/venue.routes')
const tagRouter = require('./routes/tags.routes')
const bookingRouter = require('./routes/booking.routes')
const paymentRouter = require('./routes/payment.routes')
const uploadRoute = require('./routes/upload.routes')


const app = express();
app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'https://elegant-event-1.onrender.com'
    ];
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS policy: Not allowed by CORS'), false);
    }
  },
  credentials: true
}));


app.use('/admin', adminRoutes);
app.use('/events', eventRoutes);
app.use('/package', packageRouter)
app.use('/service', serviceRouter)
app.use('/venue', venueRouter)
app.use('/tag', tagRouter)
app.use('/booking', bookingRouter)
app.use('/payment', paymentRouter)
app.use('/upload', uploadRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
