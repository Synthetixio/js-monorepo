#!/usr/bin/env node

const depcheck = require('depcheck');
const cp = require('child_process');
const fs = require('fs/promises');

const isFix = process.argv.includes('--fix');

async function exec(cmd, options) {
	return new Promise((resolve, reject) => {
		cp.exec(cmd, { encoding: 'utf-8', stdio: 'pipe', ...options }, (error, data) =>
			error ? reject(error) : resolve(data)
		);
	});
}

const options = {
	ignoreBinPackage: false, // ignore the packages with bin entry
	skipMissing: false, // skip calculation of missing dependencies
	ignorePatterns: [
		// files matching these patterns will be ignored
		'build',
		'generated',
		'coverage',
	],
	ignoreMatches: [
		// Must keep ts dependency so depcheck works over Typescript files
		'typescript',

		// these are dev deps that we declare in the root package
		'@babel/plugin-transform-runtime',
		'@types/jest',
		'@types/mocha',
		'babel-jest',
		'babel-loader',
		'jest',
		'ts-loader',
		'webpack',
		'webpack-cli',
	],
};

const ignoredPackages = [];

const fgReset = '\x1b[0m';
const fgRed = '\x1b[31m';
const fgGreen = '\x1b[32m';
const fgYellow = '\x1b[33m';
const fgCyan = '\x1b[36m';

let updatedPackages = 0;

async function run() {
	const workspacePackages = (await exec('yarn workspaces list --json'))
		.split('\n')
		.filter(Boolean)
		.map((line) => JSON.parse(line))
		// filter out old unsupported dirs
		.filter(({ name }) => !ignoredPackages.includes(name));

	const workspaceDeps = workspacePackages.map(({ name }) => [name, 'workspace:*']);

	const existingDeps = (await exec('yarn info --all --json'))
		.split('\n')
		.filter(Boolean)
		.map((line) => JSON.parse(line))
		.map(({ value }) => {
			const name = value.slice(0, value.lastIndexOf('@'));
			const [, version] = value.slice(value.lastIndexOf('@') + 1).split(':');
			// if duplicate name detected - it will be overwritten by the latest entry
			// and as they are sorted ASC, we get the latest version
			return [name, `^${version}`];
		});

	const deps = Object.fromEntries([].concat(existingDeps).concat(workspaceDeps));

	await workspacePackages.reduce(async (promise, { location, name }) => {
		await promise;

		const packageJson = JSON.parse(await fs.readFile(`${location}/package.json`, 'utf-8'));

		const { dependencies, devDependencies, missing } = await depcheck(location, {
			...options,
			package: packageJson,
		});

		const missingDeps = Object.keys(missing).sort();

		if (!dependencies.length && !devDependencies.length && !missingDeps.length) {
			return;
		}

		updatedPackages = updatedPackages + 1;

		console.log('');
		console.log('');
		console.log(`${location}/package.json`);
		console.log(`${fgCyan}  "name": "${name}"${fgReset}`);

		if (dependencies.length || missingDeps.length) {
			console.log(`${fgCyan}  "dependencies": {${fgReset}`);
			dependencies.sort().forEach((dep) => {
				console.log(`${fgRed}    "${dep}": "${packageJson.dependencies[dep]}"${fgReset}`);
				delete packageJson.dependencies[dep];
			});
			missingDeps.sort().forEach((dep) => {
				console.log(`${fgGreen}    "${dep}": "${deps[dep] || 'latest'}"${fgReset}`);
				if (!('dependencies' in packageJson)) {
					packageJson.dependencies = {};
				}
				packageJson.dependencies[dep] = deps[dep] || 'latest';
			});
		}

		if (devDependencies.length) {
			console.log(`${fgCyan}  "devDependencies": {${fgReset}`);
			devDependencies.sort().forEach((dep) => {
				console.log(`${fgRed}    "${dep}": "${packageJson.devDependencies[dep]}"${fgReset}`);
				delete packageJson.devDependencies[dep];
			});
		}
		if (isFix) {
			console.log(`...FIXING ${fgYellow}${location}/package.json${fgReset}`);
			await fs.writeFile(`${location}/package.json`, JSON.stringify(packageJson, null, '\t'));
		}
	}, Promise.resolve());

	if (updatedPackages > 0 && isFix) {
		console.log('');
		console.log('');
		console.log(`${fgGreen}Packages fixed: ${fgGreen}${updatedPackages}${fgReset}`);
		cp.execSync('yarn install', { encoding: 'utf-8', stdio: 'inherit' });
		return;
	}

	if (updatedPackages > 0) {
		console.log('');
		console.log('');
		console.log(`${fgRed}Packages need fixing: ${fgGreen}${updatedPackages}${fgReset}`);
		throw new Error(`Packages need fixing: ${updatedPackages}`);
	}
}

run().catch((e) => {
	console.error(e);
	process.exit(1);
});
