
require('dotenv').config({ path: '.env.local' });
const { exec } = require('child_process');

exec('npx prisma db push', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});
