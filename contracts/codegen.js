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
	const { targets, sources } = deployment;

	if (!targets || !sources) {
		return;
	}

	return Object.values(targets).map((target) => {
		if (target.name === 'Synthetix') {
			target.address = targets.ProxySynthetix.address;
		} else if (target.name === 'FeePool') {
			target.address = targets.ProxyFeePool.address;
		} else if (target.name.match(/Synth(s|i)[a-zA-Z]+$/)) {
			const newTarget = target.name.replace('Synth', 'Proxy');
			target.address = targets[newTarget].address;
		}
		const iface = new ethers.utils.Interface(sources[target.source].abi);
		target.abi = iface.format(ethers.utils.FormatTypes.full);

		fs.writeFileSync(
			`generated/${network}/deployment/${target.name}.ts`,
			prettier.format(
				Object.entries(target)
					.filter(([name]) => ['name', 'source', 'address', 'abi'].includes(name))
					.map(([name, value]) => `export const ${name} = ${JSON.stringify(value, null, 2)};`)
					.join('\n'),
				{ parser: 'typescript', ...prettierOptions }
			),
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
	generateSynths(network);
});
