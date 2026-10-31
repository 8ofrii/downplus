const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'Down Plus - Executive, Technical & Commercial Presentation.html'),
  path.join(__dirname, '..', 'apps', 'web', 'public', 'presentation.html'),
  path.join(__dirname, 'optimize_narrative.js')
];

// Update HTML files
[files[0], files[1]].forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const target = '<div class="pill pill-amber" style="height:36px"><span class="dot"></span> Turnkey Package: $10,000 USD (570,000 EGP)</div>';
  const replacement = '<div class="pill pill-primary" style="height:36px"><span class="dot"></span> Enterprise Digital Health Platform Blueprint</div>';
  
  if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully updated:', filePath);
  } else {
    console.log('Target string not found in:', filePath);
  }
});

// Update scripts/optimize_narrative.js so future runs don't re-introduce it
let optScript = fs.readFileSync(files[2], 'utf8');
const oldLine = "const slide1 = `  <!-- SLIDE 1: COVER -->` + rawSlides[1].substring(rawSlides[1].indexOf('\\n'));";
const newLine = `let slide1Content = rawSlides[1].substring(rawSlides[1].indexOf('\\n'));
slide1Content = slide1Content.replace(/<div class="pill pill-amber"[^>]*>.*?<\\/div>/s, '<div class="pill pill-primary" style="height:36px"><span class="dot"></span> Enterprise Digital Health Platform Blueprint</div>');
const slide1 = \`  <!-- SLIDE 1: COVER -->\` + slide1Content;`;

if (optScript.includes(oldLine)) {
  optScript = optScript.replace(oldLine, newLine);
  fs.writeFileSync(files[2], optScript, 'utf8');
  console.log('Successfully updated optimize_narrative.js');
}
