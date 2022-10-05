### Get Started

1. Run `yarn` to install dependencies.
2. Run `yarn run cannon-build` to locally build the `synthetix-periphery` cannon build. See `cannonfile.toml`.
3. Run `yarn run cannon-build` to build deployment files.
   -- \_Note: use `-- --network ${network}` to build for specific networks. This will deploy contracts to the network if they are not already deployed and add it to the `deployments` folder. (See [cannon](https://usecannon.com/))
4. Run `yarn run write-ts` in the `@synthetixio/v3-ui` workspace to create `generated` directory of TS files. Move these over to `v3/ui` (TODO: will automate this)

#### Publishing a package

Add the following configuration to `hardhat.config.ts` when publishing this Cannon package.

```
cannon: {
  ipfsEndpoint: 'https://ipfs.infura.io:5001',
  ipfsAuthorizationHeader: `Basic ${Buffer.from(
    process.env.INFURA_IPFS_ID + ':' + process.env.INFURA_IPFS_SECRET
  ).toString('base64')}`,
}
```

##### Troubleshooting

- You might need to install Foundry:

1. Run `curl -L https://foundry.paradigm.xyz | bash`
2. Add `export PATH="$PATH:/Users/<your-user-name>/.foundry/bin"` to your zshrc or whatever you use.
3. Run `foundryup`

- You will need to create a `.env` file

Ask devs for the secrets

- You will need `synthetix-main:1.0.0` version

1. Go to `synthetix-v3/packages/synthetix-main`
2. Run `npm install && npx hardhat cannon:build` which builds `synthetix-main:1.0.0` and is a dependency for the `synthetix-periphery` cannon build in `v3/contracts`.
