# Synthetix JS - Monorepo

[![main](https://github.com/synthetixio/js-monorepo/actions/workflows/main.yml/badge.svg)](https://github.com/synthetixio/js-monorepo/actions/workflows/main.yml)

## Packages

| Package                                                               | Status                                                                                                                                               | Description                          |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| [`@synthetixio/contracts-interface`](/packages/contracts-interface)   | [![npm version](https://badge.fury.io/js/%40synthetixio%2Fcontracts-interface.svg)](https://badge.fury.io/js/%40synthetixio%2Fcontracts-interface)   | Synthetix Contracts Interface        |
| [`@synthetixio/providers`](/packages/providers)                       | [![npm version](https://badge.fury.io/js/%40synthetixio%2Fproviders.svg)](https://badge.fury.io/js/%40synthetixio%2Fproviders)                       | Synthetix Providers for Layer 1 & 2  |
| [`@synthetixio/optimism-networks`](/packages/optimism-networks)       | [![npm version](https://badge.fury.io/js/%40synthetixio%2Foptimism-networks.svg)](https://badge.fury.io/js/%40synthetixio%2Foptimism-networks)       | Network utility for Optimism Layer 2 |
| [`@synthetixio/transaction-notifier`](/packages/transaction-notifier) | [![npm version](https://badge.fury.io/js/%40synthetixio%2Ftransaction-notifier.svg)](https://badge.fury.io/js/%40synthetixio%2Ftransaction-notifier) | Transaction utility for Layer 1 & 2  |

## Developer Instructions

This repo uses `lerna` to manage multiple packages in the same repo. To prepare the repository for use, run:

```
npm install
npm run bootstrap
```

This will install all npm dependencies, wire dependencies between packages in this repo, and allow for you to build projects.

### Building

If you make a change and want to generate the library JS code, run:

```
npm run build
```

This will ensure all projects are fully built in topological order. You are also free to run script NPM commands from individual repositories if necessary or desired.

### Publishing

We have a GitHub workflow for publishing releases.
To publish:

1. Go here https://github.com/Synthetixio/js-monorepo/actions/workflows/updateDependency.yml
2. Click Run Workflow

#### Testing release

When you open a PR a dev package will be published automatically when CI passes. The version will be `0.0.0-<git short sha>`

#### Manual

`lerna` is specially designed to handle package updates. If you want to push a new release for one or more packages in this repo, run:

```
lerna publish
```

Lerna will automatically detect changes for packages, and offer to increment the version number and push an NPM release as appropriate. Any dependant modules will be kept in sync as well.
