require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const path = require('path');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));

// Set static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route files
const auth = require('./routes/auth');
const companies = require('./routes/companies');
const internships = require('./routes/internships');
const bookmarks = require('./routes/bookmarks');
const ai = require('./routes/ai');
const users = require('./routes/users');

// Mount routers
app.use('/api/auth', auth);
app.use('/api/companies', companies);
app.use('/api/internships', internships);
app.use('/api/bookmarks', bookmarks);
app.use('/api/ai', ai);
app.use('/api/users', users);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
