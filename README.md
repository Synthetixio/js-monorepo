# Synthetix JS - Monorepo

[![main](https://github.com/synthetixio/js-monorepo/actions/workflows/main.yml/badge.svg)](https://github.com/synthetixio/js-monorepo/actions/workflows/main.yml)

## Packages

| Package                                                               | Status                                                                                                                                               | Description                          |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| [`@synthetixio/contracts-interface`](/packages/contracts-interface)   | [![npm version](https://badge.fury.io/js/%40synthetixio%2Fcontracts-interface.svg)](https://badge.fury.io/js/%40synthetixio%2Fcontracts-interface)   | Synthetix contracts interface        |
| [`@synthetixio/queries`](/packages/queries)   | [![npm version](https://badge.fury.io/js/%40synthetixio%2Fqueries.svg)](https://badge.fury.io/js/%40synthetixio%2Fqueries)   | React library for querying data        |
| [`@synthetixio/providers`](/packages/providers)                       | [![npm version](https://badge.fury.io/js/%40synthetixio%2Fproviders.svg)](https://badge.fury.io/js/%40synthetixio%2Fproviders)                       | Synthetix providers for layer 1 and 2  |
| [`@synthetixio/optimism-networks`](/packages/optimism-networks)       | [![npm version](https://badge.fury.io/js/%40synthetixio%2Foptimism-networks.svg)](https://badge.fury.io/js/%40synthetixio%2Foptimism-networks)       | Network utility for layer 2 |
| [`@synthetixio/transaction-notifier`](/packages/transaction-notifier) | [![npm version](https://badge.fury.io/js/%40synthetixio%2Ftransaction-notifier.svg)](https://badge.fury.io/js/%40synthetixio%2Ftransaction-notifier) | Transaction utility for layer 1 and 2  |

## Developer Instructions

This repo uses Yarn workspaces to manage multiple packages in the same repo. To prepare the repository for use, run:

```
yarn install
```

This will install all dependencies, wire dependencies between packages in this repo, and allow for you to build projects.

### Building

If you make a change and want to generate the library JS code, run:

```
yarn build
```

This will ensure all projects are fully built in topological order. You are also free to run script commands from individual repositories if necessary or desired.

### Publishing

We have a GitHub workflow for publishing releases.
To publish:

1. Go here https://github.com/Synthetixio/js-monorepo/actions/workflows/updateDependency.yml
2. Click Run Workflow

#### Testing release

When you open a PR a dev package will be published automatically when CI passes. The version will be `0.0.0-<git short sha>`

#### Manual

Yarn workspaces are specially designed to handle package updates. If you want to push a new release for one or more packages in this repo, run:

```
yarn workspaces foreach publish
```

Yarn will automatically detect changes for packages, and offer to increment the version number and push a release as appropriate. Any dependant modules will be kept in sync as well.


## Adding external library to the monorepo preserving git history

This is 3-step process:
1. Prepare original repo
2. Add remote to monorepo 
3. Merge original repo branch and update build to match monorepo processes

Using `codegen-graph-ts` as an example

### 1. Prepare original repo

- Create a separate branch `move-to-monorepo` 
- Create the intended destination folder inside monorepo `mkdir -p tools/codegen-graph-ts`
- Move all the package files into `tools/codegen-graph-ts`
- Remove all the files that won't be used (CI config, lockfile, etc)
- Commit looks like this:

    ![docs/move-to-monorepo.png](docs/move-to-monorepo.png)

### 2. Add remote to monorepo

```sh
cd ~/synthetix/js-monorepo
git remote add codegen-graph-ts ~/synthetix/codegen-graph-ts
git fetch --all

# 
git merge codegen-graph-ts/move-to-monorepo --allow-unrelated-histories
```

### 3. Merge original repo branch
Using `--allow-unrelated-histories` allows merging independent git history

```sh
git merge codegen-graph-ts/move-to-monorepo --allow-unrelated-histories
```

Because we moved all the files into the separate folder we have no merge conflicts and at the same time we have full history added to the git tree

![docs/move-to-monorepo-merge.png](docs/move-to-monorepo-merge.png)

Now we can remove remote as it is no longer necessary and cleanup all the added tags too

```sh
git remote remove codegen-graph-ts

# Cleanup all local tags and re-fetch existing tags without just removed `codegen-graph-ts` remote 
git tag -l | xargs git tag -d
git fetch --tags
```
