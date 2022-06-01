#!/usr/bin/env bash

const cp = require('child_process');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const CMD = `
npm ls --production --depth 1 -json | jq -r '
  .dependencies
  | to_entries
  | map({name: .key, location: .value.resolved, version: .value.version})
  | map(select(.location)
  | select(.location | startswith("file")))
  | map({name, version, location: .location | gsub("^file:(../)*"; "")})
'
`;

function workspaces() {
	const lock = require(`${ROOT}/package-lock.json`);

	const workspacePackages = Object.keys(lock.packages).filter(
		(location) => !location.includes('node_modules')
	);

	const versions = Object.fromEntries(
		Object.entries(lock.packages)
			.filter(([, { version }]) => version && !version.startsWith('file:'))
			.map(([name, { version }]) => [
				// transform 'node_modules/watchpack-chokidar2/node_modules/glob-parent/node_modules/is-glob' into 'is-glob'
				name
					.split('node_modules')
					.map((x) => x.replace(/^\/+|\/+$/gi, ''))
					.slice(-1)[0],
				version,
			])
			.sort(([, v1], [, v2]) => v1.localeCompare(v2))
			.sort(([n1], [n2]) => n1.localeCompare(n2))
	);

	const names = Object.fromEntries(
		Object.entries(lock.dependencies)
			.filter(([, { version }]) => version.startsWith('file:'))
			.map(([name, { version }]) => [version.replace('file:', ''), name])
	);

	return {
		workspacePackages: workspacePackages
			.map((location) => ({
				name: names[location],
				location,
				version: lock.packages[location].version,
			}))
			.filter(({ name }) => name),
		versions,
	};
}

exports.workspaces = workspaces;
