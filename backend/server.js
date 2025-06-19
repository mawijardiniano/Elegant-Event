const express = require('express');
const adminRoutes = require('./routes/admin.routes');
const eventRoutes = require('./routes/event.routes')

const app = express();
app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/events', eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
