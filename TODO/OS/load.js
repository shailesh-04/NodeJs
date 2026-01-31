const os = require("os");

function heavyComputation() {
  const start = Date.now();
  while (Date.now() - start < 1000) {
    Math.sqrt(Math.random() * 1000000); // Random heavy calc
  }
}

setInterval(() => {
  heavyComputation();
  const load = os.loadavg()[0]; // 1-min load average
  console.log(`Current Load: ${load.toFixed(2)}`);
  if (load > 0.5) { // Lowered threshold for testing
    console.log('⚠️ High load, consider adding more servers!');
  }
}, 1000);
