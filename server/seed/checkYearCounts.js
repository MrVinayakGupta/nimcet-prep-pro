const mongoose = require('mongoose');
const dns = require('dns');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

async function check() {
  let mongoUri = process.env.MONGO_URI;
  if (mongoUri.startsWith('mongodb+srv://')) {
    if (mongoUri.includes('.mongodb.net/?')) {
      mongoUri = mongoUri.replace('.mongodb.net/?', '.mongodb.net/nimcet_prep?');
    } else if (mongoUri.endsWith('.mongodb.net/')) {
      mongoUri = mongoUri + 'nimcet_prep?retryWrites=true&w=majority';
    } else if (mongoUri.endsWith('.mongodb.net')) {
      mongoUri = mongoUri + '/nimcet_prep?retryWrites=true&w=majority';
    }
  }
  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 25000 });
  const Question = require('../models/Question');
  const counts = await Question.aggregate([
    {
      $group: {
        _id: '$year',
        total: { $sum: 1 },
        officialPYQ: { $sum: { $cond: ['$isFromPreviousYear', 1, 0] } },
        practice: { $sum: { $cond: ['$isFromPreviousYear', 0, 1] } }
      }
    },
    { $sort: { _id: -1 } }
  ]);

  console.log('YEAR_COUNTS:', JSON.stringify(counts, null, 2));
  const total = await Question.countDocuments();
  console.log('GRAND_TOTAL:', total);
  await mongoose.disconnect();
}

check().catch(console.error);
