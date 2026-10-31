const fs = require('fs');
const path = require('path');

const deckPath = path.join(__dirname, '..', 'Down Plus - Executive, Technical & Commercial Presentation.html');
const webDeckPath = path.join(__dirname, '..', 'apps', 'web', 'public', 'presentation.html');

let content = fs.readFileSync(deckPath, 'utf8');

// Fix: add </style> before </head>
if (!content.includes('</style>')) {
  content = content.replace('</head>', '</style>\n</head>');
  console.log('Added missing </style> tag before </head>');
}

fs.writeFileSync(deckPath, content, 'utf8');
fs.writeFileSync(webDeckPath, content, 'utf8');
console.log('Fixed both presentation files!');
