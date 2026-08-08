require('dotenv').config();
const mongoose = require('mongoose');
const jobAggregator = require('../services/jobAggregator');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

const runAggregator = async () => {
  try {
    console.log('Connecting to database for job aggregation...');
    
    // CLI argument parsing: node scripts/fetchJobs.js --role="Frontend" --location="India"
    const filters = {};
    process.argv.forEach(arg => {
      if (arg.startsWith('--role=')) filters.role = arg.split('=')[1];
      if (arg.startsWith('--location=')) filters.location = arg.split('=')[1];
    });

    await jobAggregator.aggregateAndStore(filters);
    
    console.log('Job aggregation complete!');
    process.exit(0);
  } catch (err) {
    console.error('Aggregation failed:', err);
    process.exit(1);
  }
};

runAggregator();
