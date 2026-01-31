const os = require('os');
const path = require('path');

const homeDir = os.homedir();
const configPath = path.join(homeDir, 'myApp', 'config.json');

console.log(`Config path: ${configPath}`);

console.log(os.loadavg());


console.log(`
  System Info:
  ------------
  Hostname: ${os.hostname()}
  Platform: ${os.platform()}
  Architecture: ${os.arch()}
  CPU Cores: ${os.cpus().length}
  Memory: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
  Uptime: ${os.uptime()} sec
`);
