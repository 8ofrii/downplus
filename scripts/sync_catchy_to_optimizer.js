const fs = require('fs');
const path = require('path');

const optScriptPath = path.join(__dirname, 'optimize_narrative.js');
let optContent = fs.readFileSync(optScriptPath, 'utf8');

const catchyScriptPath = path.join(__dirname, 'build_catchy_mockups.js');
const catchyCode = fs.readFileSync(catchyScriptPath, 'utf8');

// Extract catchyPhoneCss and catchySlide12
const cssStart = catchyCode.indexOf('const catchyPhoneCss = `');
const cssEnd = catchyCode.indexOf('`;', cssStart);
const catchyPhoneCss = catchyCode.substring(cssStart + 'const catchyPhoneCss = `'.length, cssEnd);

const slideStart = catchyCode.indexOf('const catchySlide12 = `');
const slideEnd = catchyCode.indexOf('`;', slideStart);
const catchySlide12 = catchyCode.substring(slideStart + 'const catchySlide12 = `'.length, slideEnd);

// Replace in optimize_narrative.js
// 1. polishedCss
const oldCssStart = optContent.indexOf('/* Interactive Scrollable Smartphone Mockups */');
const oldCssEnd = optContent.indexOf('/* Interactive Scrollable Browser Mockup */');
if (oldCssStart !== -1 && oldCssEnd !== -1) {
  optContent = optContent.substring(0, oldCssStart) + catchyPhoneCss.trim() + '\n\n  ' + optContent.substring(oldCssEnd);
}

// 2. slide12
const oldSlide12Start = optContent.indexOf('// SLIDE 12: Interactive Scrollable Smartphone Showcase');
const oldSlide12End = optContent.indexOf('// SLIDE 13: Doctor & Web Showcase');
if (oldSlide12Start !== -1 && oldSlide12End !== -1) {
  const newSlide12Def = `// SLIDE 12: Interactive Scrollable Smartphone Showcase (Catchy Titanium Flagship)\nconst slide12 = \`${catchySlide12}\`;\n\n`;
  optContent = optContent.substring(0, oldSlide12Start) + newSlide12Def + optContent.substring(oldSlide12End);
}

fs.writeFileSync(optScriptPath, optContent, 'utf8');
console.log('Successfully synchronized optimize_narrative.js with catchy mockups!');
