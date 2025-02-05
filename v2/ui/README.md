[![Staking CI](https://github.com/Synthetixio/staking/actions/workflows/audit_build_verify.yml/badge.svg?branch=master)](https://github.com/Synthetixio/staking/actions/workflows/audit_build_verify.yml) [![staking](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/um36kz/master&style=flat)](https://dashboard.cypress.io/projects/um36kz/runs) [![Discord](https://img.shields.io/discord/413890591840272394.svg?color=768AD4&label=discord&logo=https%3A%2F%2Fdiscordapp.com%2Fassets%2F8c9701b98ad4372b58f13fd9f65f966e.svg)](https://discordapp.com/channels/413890591840272394/)
[![Twitter Follow](https://img.shields.io/twitter/follow/synthetix_io.svg?label=synthetix_io&style=social)](https://twitter.com/synthetix_io)

# Staking

## Tech stack

- Next.js
- React
- React Query
- Recoil
- Unstated-next
- Styled-Components
- Immer

## Ethereum stack

- ethers.js v5 - Ethereum wallet implementation.
- Blocknative Onboard - for ethereum wallet connectivity.
- [synthetix-data](https://github.com/Synthetixio/synthetix-data) - for historical data (powered by [TheGraph](https://thegraph.com/)).
- [@synthetixio/contracts-interface](https://github.com/Synthetixio/js-monorepo) - for interactions with the Synthetix protocol.
- [@synthetixio/optimism-networks](https://github.com/Synthetixio/js-monorepo) - Utility library for Optimism Layer 2 support.

## Development

### Install dependencies

```bash
yarn install
```

### Run

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build

```bash
yarn build
yarn start
```

### Test

Before running e2e tests, you have to set environmental variable named `SECRET_WORDS` which can be imported as an account in metamask.

```bash
SECRET_WORDS="word1, word2, ..." yarn test:e2e
```
