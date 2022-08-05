const path = require('path');
const fs = require('fs');
const ethers = require('ethers');
const prettier = require('prettier');

const prettierOptions = JSON.parse(fs.readFileSync('../.prettierrc', 'utf8'));

const synthetixPath = path.dirname(require.resolve('synthetix'));
const deployed = path.join(synthetixPath, 'publish/deployed');
const networks = fs
	.readdirSync(deployed, { withFileTypes: true })
	.filter((dirent) => dirent.isDirectory())
	.map((dirent) => dirent.name);

function generateTargets(network) {
	const deployment = require(`synthetix/publish/deployed/${network}/deployment.json`);
	fs.mkdirSync(`generated/${network}/deployment/targets`, { recursive: true });
	if (!deployment.targets) {
		return;
	}

	Object.entries(deployment.targets).forEach(([key, val]) => {
		fs.writeFileSync(
			`generated/${network}/deployment/targets/${key}.ts`,
			prettier.format(
				Object.entries(val)
					.filter(([name]) => ['name', 'source', 'address'].includes(name))
					.map(([name, value]) => `export const ${name} = ${JSON.stringify(value, null, 2)};`)
					.join('\n'),
				{ parser: 'typescript', ...prettierOptions }
			),
			'utf8'
		);

		fs.writeFileSync(
			`generated/${network}/deployment/targets/${key}.json`,
			prettier.format(
				JSON.stringify(
					Object.fromEntries(
						Object.entries(val).filter(([name]) => ['name', 'source', 'address'].includes(name))
					),
					null,
					2
				),
				{ parser: 'json', ...prettierOptions }
			),
			'utf8'
		);
	});
}

function generateSources(network) {
	const deployment = require(`synthetix/publish/deployed/${network}/deployment.json`);
	fs.mkdirSync(`generated/${network}/deployment/sources`, { recursive: true });
	if (!deployment.sources) {
		return;
	}

	Object.entries(deployment.sources).forEach(([key, val]) => {
		fs.writeFileSync(
			`generated/${network}/deployment/sources/${key}.ts`,
			prettier.format(
				Object.entries(val)
					.filter(([name]) => ['abi'].includes(name))
					.map(([name, value]) => {
						let val;
						if (name === 'abi') {
							const iface = new ethers.utils.Interface(value);
							val = iface.format(ethers.utils.FormatTypes.full);
						} else {
							val = value;
						}
						return `export const ${name} = ${JSON.stringify(val, null, 2)};`;
					})
					.join('\n'),
				{ parser: 'typescript', ...prettierOptions }
			),
			'utf8'
		);
		fs.writeFileSync(
			`generated/${network}/deployment/sources/${key}.json`,
			prettier.format(JSON.stringify(val.abi, null, 2), { parser: 'json', ...prettierOptions }),
			'utf8'
		);
	});
}

function generateSynths(network) {
	const synths = require(`synthetix/publish/deployed/${network}/synths.json`);
	fs.mkdirSync(`generated/${network}`, { recursive: true });
	fs.writeFileSync(
		`generated/${network}/synths.ts`,
		prettier.format(
			[
				'export enum Synths {',
				...synths.map(({ name }) => `  ${name} = ${JSON.stringify(name, null, 2)},`),
				'}',
			].join('\n'),
			{ parser: 'typescript', ...prettierOptions }
		),
		'utf8'
	);
}

networks.forEach((network) => {
	generateTargets(network);
	generateSources(network);
	generateSynths(network);
});
