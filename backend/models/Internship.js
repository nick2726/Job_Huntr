const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title']
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  source: {
    type: String,
    default: 'Manual'
  },
  responsibilities: {
    type: String,
    required: [true, 'Please add responsibilities']
  },
  requirements: {
    type: String,
    required: [true, 'Please add requirements']
  },
  benefits: {
    type: String
  },
  skills: {
    type: [String],
    required: [true, 'Please add required skills']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  stipend: {
    type: String,
    required: [true, 'Please add a stipend']
  },
  duration: {
    type: String,
    required: [true, 'Please add a duration']
  },
  mode: {
    type: String,
    enum: ['Remote', 'Hybrid', 'On-site'],
    required: [true, 'Please select a mode (Remote, Hybrid, On-site)']
  },
  experienceLevel: {
    type: String,
    required: [true, 'Please add experience level']
  },
  applyLink: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS'
    ],
    required: [true, 'Please add an apply link']
  },
  deadline: {
    type: Date,
    required: [true, 'Please add a deadline']
  },
  source: {
    type: String,
    default: 'Manual'
  },
  postedDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Internship', InternshipSchema);
