const path = require('path');
const fs = require('fs');
const ethers = require('ethers');
const prettier = require('prettier');

const prettierOptions = JSON.parse(fs.readFileSync('../../.prettierrc', 'utf8'));
const networks = ['goerli', 'hardhat'];

function generateTS(network) {
	const deploymentFiles = fs.readdirSync(path.resolve(__dirname, `../deployments/${network}`));

	if (!deploymentFiles.length) {
		throw new Error(`No deployment files found for ${network}`);
	}

	fs.mkdirSync(`ts-deployments/${network}`, { recursive: true });

	deploymentFiles.forEach((file) => {
		const fileName = path.basename(file, path.extname(file));
		const json = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, `../deployments/${network}/${file}`))
		);
		const abiInterface = new ethers.utils.Interface(json.abi);
		json.abi = abiInterface.format(ethers.utils.FormatTypes.full);

		const writeTo = `ts-deployments/${network}/${fileName}.ts`;

		fs.writeFileSync(
			writeTo,
			prettier.format(
				Object.entries(json)
					.filter(([name]) => ['abi', 'address'].includes(name))
					.map(([name, value]) => `export const ${name} = ${JSON.stringify(value, null, 2)};`)
					.join('\n'),
				{ parser: 'typescript', ...prettierOptions }
			),
			'utf8'
		);
	});
}

networks.forEach((network) => {
	generateTS(network);
});
