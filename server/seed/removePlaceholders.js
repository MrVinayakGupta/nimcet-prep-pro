/**
 * Remove placeholder/generated questions from MongoDB Atlas.
 * Only years with authentic PDF-extracted data are kept.
 * 
 * Authentic years: 2007-2022, 2025
 * Placeholder years to remove: 2023, 2024, 2026
 */
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');

const PLACEHOLDER_YEARS = [2023, 2024, 2026];

const uri = process.env.MONGO_URI.replace('&w=majority', '&w=majority&serverSelectionTimeoutMS=25000');

mongoose.connect(uri).then(async () => {
  const Q = mongoose.connection.db.collection('questions');

  console.log('=== Removing placeholder data for years:', PLACEHOLDER_YEARS.join(', '), '===\n');

  for (const year of PLACEHOLDER_YEARS) {
    const countBefore = await Q.countDocuments({ year });
    console.log('Year ' + year + ': ' + countBefore + ' questions found');

    if (countBefore > 0) {
      const result = await Q.deleteMany({ year });
      console.log('  -> Deleted ' + result.deletedCount + ' placeholder questions');
    } else {
      console.log('  -> No questions to delete');
    }
  }

  // Verify remaining data
  console.log('\n=== Remaining authentic data ===');
  const pipeline = [
    { $group: { _id: '$year', count: { $sum: 1 } } },
    { $sort: { _id: -1 } }
  ];
  const yearCounts = await Q.aggregate(pipeline).toArray();
  let total = 0;
  yearCounts.forEach(y => {
    console.log('Year ' + y._id + ': ' + y.count + ' questions');
    total += y.count;
  });
  console.log('\nTotal: ' + total + ' authentic questions across ' + yearCounts.length + ' years');

  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
