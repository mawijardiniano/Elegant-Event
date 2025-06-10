const express = require('express');
const adminRoutes = require('./routes/admin.routes');

const app = express();
app.use(express.json());

app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
