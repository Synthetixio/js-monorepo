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

Any PR will be automatically released with the dev tag on NPM through this action:

https://github.com/Synthetixio/js-monorepo/actions/workflows/main.yml

---

Now if your PR has been merged and you wanna do an official release, you can use the second action

https://github.com/Synthetixio/js-monorepo/actions/workflows/updateDependency.yml

- Click Run Workflow

Ignore the first field, but you gotta fill the second one, when asking for a release version

### Versioning

Our rule is to never do minor or major releases as it is the core team who actually decides it
so to tag your stuff you gotta just add -x at the end.

#### Examples:

1.0.1 would become 1.0.1-1
1.0.2.ovm-alpha => 1.0.2.ovm-alpha-1
1.1.3-1 => 1.1.3-2 (no double dash, you just increment it)
