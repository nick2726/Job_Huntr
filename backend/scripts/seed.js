const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './.env' });

// Load models
const Company = require('../models/Company');
const Internship = require('../models/Internship');
const User = require('../models/User');

const companiesData = [
  {
    companyName: 'TechNova',
    website: 'https://technova.example.com',
    location: 'San Francisco, CA',
    description: 'A leading AI and robotics company focusing on automating the future.',
    industry: 'Technology'
  },
  {
    companyName: 'GlobalFin',
    website: 'https://globalfin.example.com',
    location: 'New York, NY',
    description: 'Global financial services providing modern banking solutions.',
    industry: 'Finance'
  },
  {
    companyName: 'HealthPlus',
    website: 'https://healthplus.example.com',
    location: 'Remote',
    description: 'Innovating digital healthcare and telemedicine.',
    industry: 'Healthcare'
  }
];

const getInternshipsData = (companyIds) => [
  {
    title: 'Frontend Developer Intern',
    companyId: companyIds[0],
    description: 'Join our team to build next-generation web applications.',
    responsibilities: 'Develop UI components using React, integrate with REST APIs, write unit tests.',
    requirements: 'Pursuing BS in Computer Science. Strong JavaScript and React skills.',
    benefits: 'Flexible hours, free lunch, mentorship program.',
    skills: ['React', 'JavaScript', 'Tailwind CSS'],
    location: 'San Francisco, CA',
    stipend: '$5,000/month',
    duration: '3 Months',
    mode: 'Hybrid',
    experienceLevel: 'Beginner',
    applyLink: 'https://technova.example.com/careers',
    deadline: new Date('2026-12-31')
  },
  {
    title: 'Data Science Intern',
    companyId: companyIds[1],
    description: 'Analyze financial trends and build predictive models.',
    responsibilities: 'Clean data, build machine learning models, visualize insights using Python.',
    requirements: 'Strong math background. Python, Pandas, and SQL.',
    benefits: 'Networking events, top-tier hardware.',
    skills: ['Python', 'Machine Learning', 'SQL'],
    location: 'New York, NY',
    stipend: '$6,500/month',
    duration: '6 Months',
    mode: 'On-site',
    experienceLevel: 'Intermediate',
    applyLink: 'https://globalfin.example.com/careers',
    deadline: new Date('2026-10-15')
  },
  {
    title: 'UX Research Intern',
    companyId: companyIds[2],
    description: 'Help us understand how patients interact with our app.',
    responsibilities: 'Conduct user interviews, analyze feedback, create wireframes.',
    requirements: 'Design portfolio. Empathy and strong communication.',
    benefits: 'Remote work, health wellness stipend.',
    skills: ['Figma', 'User Research', 'Prototyping'],
    location: 'Remote',
    stipend: '$4,000/month',
    duration: '3 Months',
    mode: 'Remote',
    experienceLevel: 'Beginner',
    applyLink: 'https://healthplus.example.com/careers',
    deadline: new Date('2026-11-01')
  }
];

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    await Company.deleteMany();
    await Internship.deleteMany();
    await User.deleteMany();

    console.log('Previous data destroyed...');

    const createdCompanies = await Company.insertMany(companiesData);
    const companyIds = createdCompanies.map(c => c._id);

    const internships = getInternshipsData(companyIds);
    await Internship.insertMany(internships);

    console.log('Data Imported successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
