import { ApifyClient } from 'apify-client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config();

async function run() {
  const client = new ApifyClient({ token: process.env.APIFY_API_TOKEN });
  
  const targetUrl = "https://www.incometaxindia.gov.in/pages/acts/income-tax-act.aspx"; 
  // Wait, the prompt says "https://www.incometaxindia.gov.in/income-tax-act", maybe that redirects or is the exact URL. Let's use the exact URL from the prompt.
  const exactUrl = "https://www.incometaxindia.gov.in/income-tax-act";

  console.log(`Starting Apify run for ${exactUrl}...`);
  const runData = await client.actor("apify/cheerio-scraper").call({
    startUrls: [{ url: exactUrl }],
    maxPagesPerCrawl: 1,
    pageFunction: "async function pageFunction(context) { const { $, request } = context; return { html: $('html').html() }; }"
  });

  const { items } = await client.dataset(runData.defaultDatasetId).listItems();
  
  if (items && items.length > 0) {
    fs.writeFileSync('scratch/raw-incometax-act.html', items[0].html as string);
    console.log("Saved raw HTML to scratch/raw-incometax-act.html, size:", (items[0].html as string).length);
  } else {
    console.log("EMPTY DATASET ITEMS ARRAY");
  }
}

run().catch(console.error);
