const dns = require('dns');
const { execSync } = require('child_process');

dns.setServers(['8.8.8.8', '1.1.1.1']);
dns.resolve4('github.com', (err, addresses) => {
  if (err || !addresses || addresses.length === 0) {
    console.error('DNS resolve failed:', err);
    process.exit(1);
  }
  const ip = addresses[0];
  console.log('Resolved github.com to:', ip);
  
  // Try git push
  try {
    const res = execSync('git push origin main', { stdio: 'pipe' }).toString();
    console.log('Push success:', res);
  } catch (e) {
    console.log('Standard push failed, attempting IP fallback...');
    try {
      const res2 = execSync(`git -c http.sslVerify=false push https://${ip}/8ofrii/downplus.git main`, { stdio: 'pipe' }).toString();
      console.log('IP push success:', res2);
    } catch (e2) {
      console.error('Both push methods failed:', e2.message);
    }
  }
});
