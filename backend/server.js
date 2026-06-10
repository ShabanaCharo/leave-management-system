const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error');

// Load environment variables from .env file
dotenv.config({ path: './.env' });

// Connect to MongoDB database
connectDB();

const app = express();

// Body parser middleware (to parse JSON requests)
app.use(express.json());

// Dev logging middleware (logs HTTP requests in development)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enable CORS for cross-origin requests
app.use(cors());

// Mount routers with consistent API versioning prefix
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/leaves', require('./routes/leaveRoutes'));

// Error handler middleware - should come after mounting routes
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections (crash app gracefully)
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});

module.exports = app;
