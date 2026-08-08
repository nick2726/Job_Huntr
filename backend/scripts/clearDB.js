const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Company = require('../models/Company');
const Internship = require('../models/Internship');

// Load env vars
dotenv.config({ path: './.env' });

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

const clearDB = async () => {
  try {
    console.log('Connecting to database...');
    console.log('Wiping all existing mocked jobs and companies...');
    await Internship.deleteMany();
    await Company.deleteMany();
    
    console.log('Database cleared! Ready for real data injection.');
    process.exit();
  } catch (err) {
    console.error('Clear failed:', err);
    process.exit(1);
  }
};

clearDB();
