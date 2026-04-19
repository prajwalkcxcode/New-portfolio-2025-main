const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', error => {
    fs.writeFileSync('error_dump.txt', error.stack || error.message);
  });

  console.log("Navigating to localhost:5173...");
  try {
    await page.goto('http://localhost:5173');
    console.log("Waiting for boot sequence...");
    await new Promise(r => setTimeout(r, 4000));
  } catch (e) {
    console.log("Navigation failed:", e.message);
  }
  
  await browser.close();
})();
