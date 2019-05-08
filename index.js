const puppeteer = require('puppeteer'); // Require the Package we need...

let scrape = async () => { // Prepare scrape...

	const browser = await puppeteer.launch({args: ['--no-sandbox', '--disabled-setuid-sandbox']}); 
	const page = await browser.newPage();

  await page.goto('https://www.google.com/flights?gl=us#flt=JFK.HNL.2019-05-24*HNL.JFK.2019-05-28;c:USD;e:1;sd:1;t:f'); // Define the Maps URL to Scrape...
  await page.waitFor(1000); // In case Server has JS needed to be loaded...

	const result = await page.evaluate(() => { // Let's create variables and store values...

		let WhereFrom = document.querySelector('.gws-flights-form__location-list').innerText;
		let Destination = document.querySelector('div[data-flt-ve ~= destination_airport].gws-flights-form__location-list').innerText;
		let StartDate = document.querySelector('.gws-flights-form__date-content').innerText;
		let EndDate = document.querySelector('.gws-flights-form__date-content').innerText;
		let BestPrice = document.querySelector('.gws-flights-results__price').innerText;

	return { // Return the results...
    WhereFrom,
    Destination,
    StartDate,
		EndDate,
		BestPrice
	}
});

	browser.close(); // Close the Browser...
	return result; // Return the results with the Review...
};

scrape().then((value) => { // Scrape and output the results...
	console.log(value); 
});
