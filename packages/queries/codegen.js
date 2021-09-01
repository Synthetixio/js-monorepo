/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

try {
	fs.mkdirSync(__dirname + '/generated/');
} catch {}

const imports = [];
const funcsDef = [];

function findQueries(p, requireSoFar) {
	for (const f of fs.readdirSync(p)) {
		if (fs.statSync(`${p}/${f}`).isDirectory()) {
			findQueries(`${p}/${f}`, `${requireSoFar}/${f}`);
		} else if (f.startsWith('use')) {
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

export default {
${funcsDef.join('\n')}
};
`;

fs.writeFileSync('generated/queryFuncs.ts', out);
