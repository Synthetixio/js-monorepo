### Get Started

1. Run `yarn` to install dependencies.
2. Run `yarn run cannon-build` to locally build the `synthetix-periphery` cannon build. See `cannonfile.toml`.
3. Run `yarn run cannon-build` to build deployment files.
   -- \_Note: use `-- --network ${network}` to build for specific networks. This will deploy contracts to the network if they are not already deployed and add it to the `deployments` folder. (See [cannon](https://usecannon.com/))
4. Run `yarn run write-ts` in the `@synthetixio/v3-ui` workspace to create `generated` directory of TS files. Move these over to `v3/ui` (TODO: will automate this)
