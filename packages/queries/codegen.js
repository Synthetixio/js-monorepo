/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const prettier = require('prettier');
const cgt = require('@synthetixio/codegen-graph-ts');

const prettierOptions = JSON.parse(fs.readFileSync('../../.prettierrc', 'utf8'));

fs.mkdirSync(__dirname + '/src/subgraph/', { recursive: true });

const imports = [];
const funcsDef = [];

function findQueries(p, requireSoFar) {
  for (const f of fs.readdirSync(p)) {
    if (fs.statSync(`${p}/${f}`).isDirectory()) {
      findQueries(`${p}/${f}`, `${requireSoFar}/${f}`);
    } else if (f.startsWith('use') && !f.endsWith('.test.ts')) {
      // remove extension
      const name = f.slice(0, f.length - 3);

      imports.push(`import ${name} from '${requireSoFar}/${name}';`);
      funcsDef.push(`${name},`);
    }
  }
}

findQueries(__dirname + '/src/queries', '../queries');
findQueries(__dirname + '/src/mutations', '../mutations');

const WARNING = '// !!! DO NOT EDIT !!! Automatically generated file\n\n';

const out = `
${WARNING}
${imports.join('\n')}

export {
${funcsDef.join('\n')}
};
`;

fs.writeFileSync(
  'src/subgraph/queryFuncs.ts',
  prettier.format(out, { parser: 'typescript', ...prettierOptions }),
  'utf8'
);

for (const f of fs.readdirSync('subgraphs')) {
  const text = cgt.gen({
    schema: JSON.parse(fs.readFileSync('subgraphs/' + f)),
    method: 'reactquery',
  });

  fs.writeFileSync(
    `src/subgraph/${f.substr(0, f.length - 5)}SubgraphQueries.ts`,
    prettier.format(
      `
      ${WARNING}
      ${text}
      `,
      { parser: 'typescript', ...prettierOptions }
    ),
    'utf8'
  );
}

for (const f of fs.readdirSync('subgraphs')) {
  const text = cgt.gen({
    schema: JSON.parse(fs.readFileSync('subgraphs/' + f)),
    method: 'plain',
  });

  fs.writeFileSync(
    `src/subgraph/${f.substr(0, f.length - 5)}SubgraphFunctions.ts`,
    prettier.format(
      `
      ${WARNING}
      ${text}
      `,
      { parser: 'typescript', ...prettierOptions }
    ),
    'utf8'
  );
}
