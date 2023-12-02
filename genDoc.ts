import { writeFileSync } from 'fs';
import { Scanner } from './src';

const root = Scanner.readFolder('./src');

const getToc = (names: (string | undefined)[]) => {
  return names
    .map((name) => {
      if (!name) return '';
      return `- [${name}](#${name.toLowerCase().replace(/ /g, '-')})`;
    })
    .join('\n');
};

const allDoc = root
  .flat()
  .map(({ files }) => files.filter((file) => file.name.endsWith('.md')))
  .filter((file) => typeof file !== 'undefined')
  .flat();

const base = allDoc.find((file) => file.name === 'Base.md');
const docs = allDoc
  .filter((file) => file.name !== 'Base.md')
  .sort((a, b) => {
    const name = a.path.split('/')[1];
    const name2 = b.path.split('/')[1];
    if (name > name2) return 1;
    if (name < name2) return -1;
    return 0;
  });

const toc = getToc(docs.map(({ path }) => path.split('/')[1]));

const out = `# ToolKit

${toc}

${base ? base.read() : ''}
${docs.map((file) => file.read()).join('\n')}`;

writeFileSync('./Readme.md', out);
