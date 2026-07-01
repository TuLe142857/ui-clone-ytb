import fs from 'fs';

try {
  const data = JSON.parse(fs.readFileSync('docs/research/youtube/svgs.json', 'utf8'));
  console.log(`Loaded ${data.length} SVGs.`);
  
  const ids = [];
  data.forEach(item => {
    // Find all ids inside the inner HTML
    const matches = item.innerHtml.match(/id="([^"]+)"/g);
    if (matches) {
      matches.forEach(m => {
        const id = m.slice(4, -1);
        if (!ids.includes(id)) ids.push(id);
      });
    }
    if (item.label && !ids.includes(item.label)) {
      ids.push(item.label);
    }
  });
  
  console.log('Available SVG IDs:', ids.sort().slice(0, 100));
} catch (e) {
  console.error(e);
}
