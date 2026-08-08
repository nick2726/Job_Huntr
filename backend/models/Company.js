const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Please add a company name']
  },
  logo: {
    type: String,
    default: 'no-logo.png'
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS'
    ]
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  companyType: {
    type: String,
    enum: ['Product Based', 'Service Based', 'Various'],
    default: 'Various'
  },
  industry: {
    type: String,
    required: [true, 'Please add an industry']
  }
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);
