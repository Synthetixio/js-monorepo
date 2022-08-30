#!/usr/bin/env node

const workspaces = require('./lib/workspaces');
const exec = require('./lib/exec');
const { fgReset, fgGreen, fgYellow, fgCyan } = require('./lib/colors');

async function getCascade() {
  const workspacePackages = await workspaces();
  const all = workspacePackages
    .map(({ name, workspaceDependencies }) => ({
      name,
      deps: workspaceDependencies.map(
        (location) => workspacePackages.find((pkg) => pkg.location === location).name
      ),
    }))
    .reduce((result, { name, deps }) => ({ ...result, [name]: { name, deps, path: [] } }), {});
  delete all.root;

  const paths = [];
  function walkTree(node) {
    const path = [node.name, ...node.path];
    paths.push(path);
    node.tree = node.deps.map((dep) => ({ ...all[dep], path }));
    node.tree.forEach(walkTree);
  }
  Object.values(all).forEach(walkTree);

  const sets = paths.reduce((result, [head, ...tail]) => {
    if (!(head in result)) {
      result[head] = new Set();
    }
    tail.forEach((name) => result[head].add(name));
    return result;
  }, {});

  return Object.keys(sets)
    .sort()
    .reduce((result, name) => ({ ...result, [name]: Array.from(sets[name]).sort() }), {});
}

async function run() {
  const cascade = await getCascade();

  console.log(`${fgCyan}Dependency update cascade:${fgReset}`);
  console.dir(cascade, { depth: null });
  const [namesRaw, version] = process.argv.slice(2);
  const names = namesRaw
    .split(',')
    .map((name) => `${name}`.trim())
    .filter((name) => name in cascade);

  if (names.length < 1) {
    throw new Error('Package or comma separated multiple packages must be specified');
  }

  if (!version) {
    throw new Error('Version must be specified');
  }

  if (names.length > 1 && !['major', 'minor', 'patch', 'prerelease'].includes(version)) {
    throw new Error(
      "When publishing packages can only use one of these versions: 'major', 'minor', 'patch', 'prerelease'"
    );
  }

  const updates = Array.from(new Set(names.concat(names.flatMap((name) => cascade[name])))).map(
    (name) => {
      switch (true) {
        // If name was manually listed apply version unconditionally
        case names.includes(name):
          console.log(
            `${fgCyan}Bumping dependency ${fgGreen}${name}${fgCyan} to ${fgYellow}${version}${fgReset}`
          );
          return `yarn workspace ${name} version --deferred ${version}`;

        // When publishing exact version like `1.2.3`, update all dependent packages with `patch` strategy
        case /^\d+\.\d+\.\d+$/.test(version):
        // Use `patch` strategy for any other full release
        case ['major', 'minor', 'patch'].includes(version): {
          console.log(
            `${fgCyan}Bumping dependency ${fgGreen}${name}${fgCyan} to ${fgYellow}patch${fgReset}`
          );
          return `yarn workspace ${name} version --deferred patch`;
        }

        // When publishing pre-release version like `1.2.3-whatever`, update all dependent packages with `prerelease` strategy
        case /^\d+\.\d+\.\d+-.+$/.test(version):
        // Same for `prerelease`
        case ['prerelease'].includes(version):
        // And for any other unknown case
        default: {
          console.log(
            `${fgCyan}Bumping dependency ${fgGreen}${name}${fgCyan} to ${fgYellow}prerelease${fgReset}`
          );
          return `yarn workspace ${name} version --deferred prerelease`;
        }
      }
    }
  );

  for await (const update of updates) {
    console.log(`${fgCyan}Executing update ${fgGreen}${update}${fgReset}`);
    await exec(update);
  }
}
run();
