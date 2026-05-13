#!/usr/bin/env node
/**
 * VIALTRY SCHEMA INJECTOR — INTERNATIONAL
 * Run: node inject-schema.js [directory]
 * Only processes files NOT already containing Vialtry schema.
 */
const fs = require('fs');
const path = require('path');

function main() {
  const targetDir = process.argv[2] || './';
  const files = fs.readdirSync(targetDir)
    .filter(f => f.endsWith('.html') && f.startsWith('ai-catalog-visibility-'))
    .sort();

  console.log(`\nChecking ${files.length} files for missing schema...\n`);
  let skipped = 0;
  files.forEach(file => {
    const filePath = path.join(targetDir, file);
    const html = fs.readFileSync(filePath, 'utf-8');
    if (html.includes('application/ld+json')) {
      skipped++;
    } else {
      console.log(`⚠ Missing schema: ${file}`);
    }
  });
  console.log(`\n✓ ${files.length - skipped} files need schema | ⊘ ${skipped} already have schema\n`);
}
main();
