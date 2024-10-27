import { writeFileSync } from 'fs';
import { Scanner } from './src';

console.log('Generating documentation...');

const root = Scanner.readFolder('./src');

const allDoc = root
  .flat()
  .filter((file) => file.name.endsWith('.md'))
  .sort((a, b) => {
    const name = a.path.split('/')[1];
    const name2 = b.path.split('/')[1];
    if (name > name2) return 1;
    if (name < name2) return -1;
    return 0;
  });

let out = allDoc.find((file) => file.name === 'Base.md')?.read() || '';

const docs = allDoc.filter((file) => file.name !== 'Base.md');

const toc = docs
  .map((d) => d.parent.name)
  .map((name) => `- [${name}](#${name.toLowerCase().replace(/ /g, '-')})`)
  .join('\n');

const docsString = docs.map((f) => f.read()).join('\n');

out = out.replaceAll('{% toc %}', toc);
out = out.replaceAll('{% docs %}', docsString);

try {
  writeFileSync('./Readme.md', out);
  console.log('Documentation generated');
} catch (e) {
  console.error(e);
}
