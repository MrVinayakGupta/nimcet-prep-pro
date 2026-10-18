const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI.replace('&w=majority', '&w=majority&serverSelectionTimeoutMS=25000');

mongoose.connect(uri).then(async () => {
  const Q = mongoose.connection.db.collection('questions');

  // Check all years in DB
  const pipeline = [
    { $group: { _id: '$year', count: { $sum: 1 } } },
    { $sort: { _id: -1 } }
  ];
  const yearCounts = await Q.aggregate(pipeline).toArray();
  console.log('=== All years in DB ===');
  yearCounts.forEach(y => console.log('Year ' + y._id + ': ' + y.count + ' questions'));

  // Check Q1 text for 2023, 2024, 2026 to see if placeholder
  console.log('\n=== Q1 text for suspected placeholder years ===');
  for (const year of [2023, 2024, 2026]) {
    const q = await Q.findOne({ year: year, questionNumber: 1 });
    if (q) {
      console.log('Year ' + year + ' Q1: ' + q.questionText.substring(0, 150));
    } else {
      console.log('Year ' + year + ': NO DATA');
    }
  }

  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
