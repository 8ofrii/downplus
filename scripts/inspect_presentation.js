const fs = require('fs');

const html = fs.readFileSync('Down Plus - Executive, Technical & Commercial Presentation.html', 'utf8');

const slideRegex = /<section class="slide[^"]*">([\s\S]*?)<\/section>/g;
let match;
let i = 1;
const slides = [];

while ((match = slideRegex.exec(html)) !== null) {
  const slideContent = match[1];
  let h1 = slideContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  let h2 = slideContent.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
  let eyebrow = slideContent.match(/<div class="eyebrow"[^>]*>([\s\S]*?)<\/div>/);
  
  const clean = (s) => s ? s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';

  slides.push({
    index: i,
    eyebrow: clean(eyebrow ? eyebrow[1] : ''),
    h1: clean(h1 ? h1[1] : ''),
    h2: clean(h2 ? h2[1] : '')
  });
  i++;
}

console.log('Total slides:', slides.length);
slides.forEach(s => {
  console.log(`Slide ${s.index}: [${s.eyebrow}] ${s.h1 || s.h2}`);
});
