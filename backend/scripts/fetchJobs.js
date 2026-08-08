const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jobAggregator = require('../services/jobAggregator');

// Load env vars
dotenv.config({ path: './.env' });

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

const runAggregator = async () => {
  try {
    console.log('Connecting to database for job aggregation...');
    
    // Simple CLI argument parsing: node scripts/fetchJobs.js --role="Frontend"
    const filters = {};
    process.argv.forEach(arg => {
      if (arg.startsWith('--role=')) filters.role = arg.split('=')[1];
      if (arg.startsWith('--location=')) filters.location = arg.split('=')[1];
    });

    await jobAggregator.aggregateAndStore(filters);
    
    console.log('Job aggregation complete!');
    process.exit();
  } catch (err) {
    console.error('Aggregation failed:', err);
    process.exit(1);
  }
};

runAggregator();
