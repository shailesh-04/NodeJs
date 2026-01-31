const express = require('express');
const os = require('os');

const app = express();
const PORT = 3000;

// Function to get local IPv4 addresses
function getLocalIPs() {
  const nets = os.networkInterfaces();
  const results = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        results.push({ interface: name, ip: net.address });
      }
    }
  }
  return results;
}

// Route to get IPs
app.get('/ip', (req, res) => {
  const ips = getLocalIPs();
  res.json({ ips });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
