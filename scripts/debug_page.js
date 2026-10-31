const fs = require('fs');
const content = fs.readFileSync('Down Plus - Executive, Technical & Commercial Presentation.html', 'utf8');

console.log('Total file length:', content.length);
console.log('Includes <head>:', content.includes('<head>'));
console.log('Includes </head>:', content.includes('</head>'));
console.log('Includes <style>:', content.includes('<style>'));
console.log('Includes </style>:', content.includes('</style>'));
console.log('Includes <body>:', content.includes('<body>'));
console.log('Includes </body>:', content.includes('</body>'));
console.log('Includes <script>:', content.includes('<script>'));
console.log('Includes </script>:', content.includes('</script>'));

// Check how many sections with class slide exist
const matches = content.match(/<section class="slide[^"]*"/g) || [];
console.log('Slide sections count:', matches.length);
matches.forEach((m, idx) => console.log(idx + 1, m));

// Look at first 500 characters of body
const bodyIdx = content.indexOf('<body>');
console.log('Body starts at:', bodyIdx);
if (bodyIdx !== -1) {
  console.log('Body snippet:\n', content.substring(bodyIdx, bodyIdx + 400));
}

// Look at the script tag at the end
const scriptIdx = content.lastIndexOf('<script>');
if (scriptIdx !== -1) {
  console.log('Script snippet:\n', content.substring(scriptIdx, scriptIdx + 400));
}
