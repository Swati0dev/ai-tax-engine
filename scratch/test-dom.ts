import * as fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('scratch/raw-incometax-act.html', 'utf-8');
const $ = cheerio.load(html);

console.log("== Main Content Classes & IDs ==");
console.log("Body classes:", $('body').attr('class'));
console.log("Body ID:", $('body').attr('id'));

const mainContainers = [];
$('div').each((i, el) => {
  const c = $(el).attr('class') || '';
  const id = $(el).attr('id') || '';
  if (c.includes('main') || c.includes('content') || id.includes('main') || id.includes('content')) {
    mainContainers.push(`div#${id}.${c}`);
  }
});
console.log("Potential main containers:", mainContainers.slice(0, 10));

// Check what's taking up the most text
const textSizes = [];
$('body > div').each((i, el) => {
  textSizes.push({
    id: $(el).attr('id'),
    class: $(el).attr('class'),
    textLength: $(el).text().length
  });
});
console.log("Body children text sizes:", textSizes.sort((a,b) => b.textLength - a.textLength).slice(0, 5));

// Check PDF links in the whole document
const pdfLinks = [];
$('a').each((i, el) => {
  const href = $(el).attr('href');
  if (href && href.toLowerCase().endsWith('.pdf')) {
    pdfLinks.push(href);
  }
});
console.log("PDF Links found:", pdfLinks.length, pdfLinks.slice(0, 3));

// Look for tables or lists
console.log("Tables:", $('table').length);
console.log("Lists:", $('ul').length + $('ol').length);
