const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Company = require('../models/Company');
const Internship = require('../models/Internship');

dotenv.config({ path: './.env' });

const productCompanies = [
  'Google India', 'Microsoft India', 'Amazon India', 'Flipkart', 'Zomato', 'Swiggy', 'CRED', 'Razorpay', 'Zerodha', 'PhonePe'
];

const serviceCompanies = [
  'TCS', 'Infosys', 'Wipro', 'HCL Technologies', 'Tech Mahindra', 'Cognizant', 'Accenture', 'Capgemini', 'IBM India', 'L&T Infotech'
];

const states = ['Karnataka', 'Maharashtra', 'Delhi NCR', 'Telangana', 'Tamil Nadu'];
const modes = ['Remote', 'Hybrid', 'On-site'];
const roles = ['Software Engineering Intern', 'Frontend Developer Intern', 'Backend Developer Intern', 'Data Science Intern', 'Product Management Intern'];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

mongoose.connect(process.env.MONGO_URI);

const seedIndiaJobs = async () => {
  try {
    console.log('Clearing existing data...');
    await Company.deleteMany();
    await Internship.deleteMany();

    console.log('Seeding Product Companies...');
    const prodDocs = await Promise.all(productCompanies.map(name => Company.create({
      companyName: name,
      logo: 'no-logo.png',
      location: getRandom(states),
      description: `Top product-based company in India.`,
      companyType: 'Product Based',
      industry: 'Technology'
    })));

    console.log('Seeding Service Companies...');
    const servDocs = await Promise.all(serviceCompanies.map(name => Company.create({
      companyName: name,
      logo: 'no-logo.png',
      location: getRandom(states),
      description: `Top IT service-based company in India.`,
      companyType: 'Service Based',
      industry: 'IT Services'
    })));

    const allCompanies = [...prodDocs, ...servDocs];

    console.log('Generating 150 Jobs...');
    const jobs = [];
    for (let i = 0; i < 150; i++) {
      const company = getRandom(allCompanies);
      const mode = getRandom(modes);
      jobs.push({
        title: getRandom(roles),
        companyId: company._id,
        description: `Join ${company.companyName} as an intern and kickstart your career.`,
        responsibilities: 'Build scalable systems, write clean code, attend standups.',
        requirements: 'Pursuing B.Tech/B.E in Computer Science. Strong DSA skills.',
        benefits: 'Stipend, Mentorship, Pre-Placement Offer (PPO) opportunity.',
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Java'].sort(() => 0.5 - Math.random()).slice(0, 3),
        location: mode === 'Remote' ? 'Remote' : getRandom(states),
        stipend: `₹${Math.floor(Math.random() * 40 + 10)},000 / month`,
        duration: '6 Months',
        mode: mode,
        experienceLevel: 'Beginner',
        applyLink: 'https://example.com/apply',
        source: 'India Mock Data',
        deadline: new Date(new Date().setMonth(new Date().getMonth() + 2))
      });
    }

    await Internship.insertMany(jobs);
    console.log('Successfully seeded 150 Indian jobs!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedIndiaJobs();
