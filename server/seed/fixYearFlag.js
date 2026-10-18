const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI + '&serverSelectionTimeoutMS=25000';

mongoose.connect(uri).then(async () => {
  const Q = mongoose.connection.db.collection('questions');

  // Check isFromPreviousYear for a sample question
  const sample = await Q.findOne({ year: 2022 });
  console.log('Sample Q keys:', Object.keys(sample).join(', '));
  console.log('isFromPreviousYear:', sample.isFromPreviousYear);

  // Count questions without isFromPreviousYear flag
  const withFlag = await Q.countDocuments({ isFromPreviousYear: true });
  const withoutFlag = await Q.countDocuments({ isFromPreviousYear: { $ne: true } });
  const total = await Q.countDocuments({});
  console.log('\nWith isFromPreviousYear=true:', withFlag);
  console.log('Without flag:', withoutFlag);
  console.log('Total:', total);

  // If needed, fix it
  if (withoutFlag > 0) {
    console.log('\nFixing: Setting isFromPreviousYear=true for all questions...');
    const result = await Q.updateMany(
      { isFromPreviousYear: { $ne: true } },
      { $set: { isFromPreviousYear: true } }
    );
    console.log('Updated:', result.modifiedCount, 'documents');
  }

  // Verify the API /years endpoint will work
  const years = await Q.distinct('year', { isFromPreviousYear: true });
  console.log('\nYears that /api/questions/years will return:', years.sort((a, b) => b - a));

  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
