import * as fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('scratch/raw-incometax-act.html', 'utf-8');
const $ = cheerio.load(html);

// Remove ignored nodes
$('header, footer, nav, menu, .search, .accessibility-widget, .cookie-banner, script, style, svg, [hidden], button, noscript, iframe').remove();

const pdfLinks: string[] = [];
$('a').each((_, el) => {
  const href = $(el).attr('href');
  if (href && href.toLowerCase().endsWith('.pdf')) {
    pdfLinks.push(href);
  }
});

let title = $('title').text().trim();
let mainContent = $('body').text().replace(/\s+/g, ' ').trim();

console.log("=== EXTRACTION TEST ===");
console.log("Title:", title);
console.log("PDF Links found:", pdfLinks.length);
console.log("Extracted Content Length:", mainContent.length);
console.log("First 500 chars:");
console.log(mainContent.substring(0, 500));
