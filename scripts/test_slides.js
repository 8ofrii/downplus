const fs = require('fs');
const path = require('path');

const deckPath = path.join(__dirname, '..', 'Down Plus - Executive, Technical & Commercial Presentation.html');
const content = fs.readFileSync(deckPath, 'utf8');

// Find all slide comments
const markers = [];
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('<!-- SLIDE')) {
    markers.push({ line: idx + 1, text: line.trim() });
  }
});

console.log('Found', markers.length, 'slides');
markers.forEach(m => console.log(m.line, m.text));
