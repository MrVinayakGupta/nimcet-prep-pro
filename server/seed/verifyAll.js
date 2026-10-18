const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
const http = require('http');

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('--- Verifying Backend API ---');
  const yearsRes = await get('http://localhost:5000/api/questions/years?detail=true');
  console.log('GET /api/questions/years?detail=true status:', yearsRes.status);
  const years = JSON.parse(yearsRes.data);
  console.log('Years in DB:', years.map(y => `${y.year} (${y.questionCount} Qs)`).join(', '));

  const qRes = await get('http://localhost:5000/api/questions/year/2026');
  console.log('\nGET /api/questions/year/2026 status:', qRes.status);
  const qs = JSON.parse(qRes.data);
  console.log('2026 Questions Count:', qs.length);
  console.log('Q1:', qs[0].questionText);
  console.log('Q1 Correct Answer:', qs[0].correctAnswer);
  console.log('Q89:', qs[88].questionText);
  console.log('Q89 Correct Answer:', qs[88].correctAnswer);

  console.log('\n--- Verifying Frontend Dev Server ---');
  const frontRes = await get('http://localhost:3000/');
  console.log('GET http://localhost:3000/ status:', frontRes.status);
  console.log('Frontend is running successfully!');
}

verify().catch(console.error);
