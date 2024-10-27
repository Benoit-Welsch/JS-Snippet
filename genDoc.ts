import { writeFileSync } from 'fs';
import { Scanner } from './src';

console.log('Generating documentation...');

const root = Scanner.readFolder('./src');

const allDoc = root
  .flat()
  .filter((file) => file.name.endsWith('.md'))
  .sort((a, b) => a.parent.name.localeCompare(b.parent.name));

let out = allDoc.find((file) => file.name === 'Base.md')?.read() || '';

const docs = allDoc.filter((file) => file.name !== 'Base.md');

const toc = docs
  .map((d) => d.parent.name)
  .map((name) => `- [${name}](#${name.toLowerCase().replace(/ /g, '-')})`)
  .join('\n');

const docsString = docs.map((f) => f.read()).join('\n');

out = out.replace('{% toc %}', toc);
out = out.replace('{% docs %}', docsString);

try {
  writeFileSync('./Readme.md', out);
  console.log('Documentation generated');
} catch (e) {
  console.error(e);
}
