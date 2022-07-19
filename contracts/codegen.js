const path = require('path');
const fs = require('fs');
const ethers = require('ethers');
const prettier = require('prettier');

const synthetixPath = path.dirname(require.resolve('synthetix'));
const deployed = path.join(synthetixPath, 'publish/deployed');
const networks = fs
	.readdirSync(deployed, { withFileTypes: true })
	.filter((dirent) => dirent.isDirectory())
	.map((dirent) => dirent.name);

function generateTargets(network) {
	const deployment = require(`synthetix/publish/deployed/${network}/deployment.json`);
	fs.mkdirSync(`build/${network}/deployment/targets`, { recursive: true });
	if (!deployment.targets) {
		return;
	}

	Object.entries(deployment.targets).forEach(([key, val]) => {
		fs.writeFileSync(
			`build/${network}/deployment/targets/${key}.ts`,
			prettier.format(
				Object.entries(val)
					.filter(([name]) => ['name', 'source', 'address'].includes(name))
					.map(([name, value]) => `export const ${name} = ${JSON.stringify(value, null, 2)};`)
					.join('\n'),
				{ parser: 'typescript' }
			),
			'utf8'
		);
	});
}

function generateSources(network) {
	const deployment = require(`synthetix/publish/deployed/${network}/deployment.json`);
	fs.mkdirSync(`build/${network}/deployment/sources`, { recursive: true });
	if (!deployment.sources) {
		return;
	}

	Object.entries(deployment.sources).forEach(([key, val]) => {
		const iface = new ethers.utils.Interface(val.abi);
		val.abi = iface.format(ethers.utils.FormatTypes.full);
		fs.writeFileSync(
			`build/${network}/deployment/sources/${key}.ts`,
			prettier.format(
				Object.entries(val)
					.filter(([name]) => ['abi'].includes(name))
					.map(([name, value]) => `export const ${name} = ${JSON.stringify(value, null, 2)};`)
					.join('\n'),
				{ parser: 'typescript' }
			),
			'utf8'
		);
	});
}

function generateSynths(network) {
	const synths = require(`synthetix/publish/deployed/${network}/synths.json`);
	fs.mkdirSync(`build/${network}`, { recursive: true });
	fs.writeFileSync(
		`build/${network}/synths.ts`,
		prettier.format(
			[
				'export enum Synths {',
				...synths.map(({ name }) => `  ${name} = ${JSON.stringify(name, null, 2)},`),
				'}',
			].join('\n'),
			{ parser: 'typescript' }
		),
		'utf8'
	);
}

networks.forEach((network) => {
	generateTargets(network);
	generateSources(network);
	generateSynths(network);
});
