/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const cgt = require('@synthetixio/codegen-graph-ts');

// for depcheck, this dep is listed in generated files
// TODO: remove when we commit generated files
require.resolve('@synthetixio/generate-subgraph-query');

try {
  fs.mkdirSync(__dirname + '/generated/');
} catch {}

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

findQueries(__dirname + '/src/queries', '../src/queries');
findQueries(__dirname + '/src/mutations', '../src/mutations');

const out = `
${imports.join('\n')}

export {
${funcsDef.join('\n')}
};
`;

fs.writeFileSync('generated/queryFuncs.ts', out);

for (const f of fs.readdirSync('subgraphs')) {
  const text = cgt.gen({
    schema: JSON.parse(fs.readFileSync('subgraphs/' + f)),
    method: 'reactquery',
  });

  fs.writeFileSync(`generated/${f.substr(0, f.length - 5)}SubgraphQueries.ts`, text);
}

for (const f of fs.readdirSync('subgraphs')) {
  const text = cgt.gen({
    schema: JSON.parse(fs.readFileSync('subgraphs/' + f)),
    method: 'plain',
  });

  fs.writeFileSync(`generated/${f.substr(0, f.length - 5)}SubgraphFunctions.ts`, text);
}
