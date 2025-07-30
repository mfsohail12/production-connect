const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const projectRoutes = require('./routes/projectRoutes');

app.use(express.json());

// Public routes
app.use('/auth', authRoutes);

// Protected API
app.use('/api/jobs', jobRoutes);
app.use('/api/projects', projectRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Unexpected error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));