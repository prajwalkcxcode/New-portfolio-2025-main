import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
      const location = msg.location();
      console.log('LOCATION:', location.url, location.lineNumber, location.columnNumber);
    } else {
      console.log('BROWSER LOG:', msg.text());
    }
  });

  page.on('pageerror', error => {
    console.log('PAGE ERROR STR:', error.toString());
    console.log('PAGE ERROR STACK:', error.stack);
  });

  console.log('Navigating to http://localhost:5173...');
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 10000 });
    console.log('Navigation successful.');
  } catch (e) {
    console.log('Navigation error:', e.message);
  }

  await browser.close();
})();
