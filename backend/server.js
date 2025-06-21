const express = require('express');
const adminRoutes = require('./routes/admin.routes');
const eventRoutes = require('./routes/event.routes');
const packageRouter = require('./routes/package.routes')
const serviceRouter = require('./routes/service.routes')
const venueRouter = require('./routes/venue.routes')
const tagRouter = require('./routes/tags.routes')

const app = express();
app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/events', eventRoutes);
app.use('/package', packageRouter)
app.use('/service', serviceRouter)
app.use('/venue', venueRouter)
app.use('/tag', tagRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
