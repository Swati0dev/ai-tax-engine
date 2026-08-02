import * as fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('scratch/raw-incometax-act.html', 'utf-8');
const $ = cheerio.load(html);

// Find elements containing the specific text
let found = null;
$('*').each((i, el) => {
  if ($(el).text().includes('Income-tax Act, 1961')) {
    // we want the deepest element that contains it
    if (!found || $(el).text().length < $(found).text().length) {
        found = el;
    }
  }
});

if (found) {
  let curr = $(found);
  const path = [];
  while (curr.length && curr.prop('tagName')) {
    const tag = curr.prop('tagName').toLowerCase();
    const id = curr.attr('id') ? '#' + curr.attr('id') : '';
    const cls = curr.attr('class') ? '.' + curr.attr('class').split(' ').join('.') : '';
    path.push(tag + id + cls);
    curr = curr.parent();
  }
  console.log("Path to text:", path.reverse().join(' > '));
  console.log("Found element HTML:\n", $(found).html());
} else {
  console.log("Not found.");
}
