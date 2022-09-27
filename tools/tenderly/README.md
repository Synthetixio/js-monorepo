# @synthetixio/tenderly

CLI and libraries for common operations with Tenderly, primarily for local testing and testing in CI


## ENV config

For the most up-to-date template look at `.env.local.example`. Copy to `.env.local` and fill the blanks


```sh
# Required ENVs:
export TENDERLY_ACCESS_KEY="***TENDERLY_ACCESS_KEY***" 
export TENDERLY_USER="synthetix"
export TENDERLY_PROJECT="mainnet"

# If you want to work with the same custom fork:
export TENDERLY_FORK_ID=""

# Custom wallet address (used in `tenderly-getsnx`, `tenderly-geteth`)
export TENDERLY_WALLET_ADDRESS=""

# Address with lots of SNX available to transfer from (used in `tenderly-getsnx`)
export TENDERLY_SNX_WHALE_ADDRESS="0xeb3107117fead7de89cd14d463d340a2e6917769"

# Checkpoint UUID to restore fork state from (used in `tenderly-load`)
export TENDERLY_CHECKPOINT=""
```



## CLI usage

```sh
# Create new fork (or reuse cached one), will generate fork.json
➜ tenderly-fork | jq -r '.simulation_fork.id'
11111111-2222-3333-4444-555555555555


# Remove current fork (cached or specified by TENDERLY_FORK_ID env)
➜ tenderly-unfork
0xTXN_ID
# Alternatively:
➜ tenderly-unfork <FORK_ID_HERE>
# Or:
➜ TENDERLY_FORK_ID=<FORK_ID_HERE> tenderly-unfork


# Save fork snapshot to restore later (returns snapshot UUID)
➜ tenderly-save
11111111-2222-3333-4444-555555555555


# Restore fork snapshot by snapshot UUID (when TENDERLY_CHECKPOINT is set)
➜ tenderly-load
# Alternatively:
➜ tenderly-load <CHECKPOINT_UUID>
# Or:
➜ TENDERLY_CHECKPOINT=<CHECKPOINT_UUID> tenderly-load


# Add 100 ETH to the wallet (when TENDERLY_WALLET_ADDRESS is set)
➜ tenderly-geteth
0xTXN_ID
# Alternatively:
➜ tenderly-geteth <WALLET_ADDRESS>
# Or:
➜ TENDERLY_WALLET_ADDRESS=<WALLET_ADDRESS> tenderly-geteth


# Add 100 SNX to the waller (when TENDERLY_WALLET_ADDRESS  and TENDERLY_SNX_WHALE_ADDRESS are set)
➜ tenderly-getsnx
0xTXN_ID
# Alternatively:
➜ tenderly-getsnx <TO_ADDRESS> <FROM_WHALE_ADDRESS> 
# Or:
➜ TENDERLY_WALLET_ADDRESS=<TO_ADDRESS> TENDERLY_SNX_WHALE_ADDRESS=<FROM_WHALE_ADDRESS> tenderly-getsnx
```


## Programmatic usage

```js
import {
  fork,
  unfork,
  save,
  load,
  geteth,
  getsnx,
} from '@synthetixio/tenderly'

const forkInfo = await fork({
  TENDERLY_ACCESS_KEY, 
  TENDERLY_USER, 
  TENDERLY_PROJECT, 
  // optional:
  // TENDERLY_FORK_ID
})

const deteletedForkTx = await unfork({
  TENDERLY_ACCESS_KEY, 
  TENDERLY_USER, 
  TENDERLY_PROJECT, 
  TENDERLY_FORK_ID: forkInfo.simulation_fork.id
})

const checkpoint = await save({
  TENDERLY_FORK_ID: forkInfo.simulation_fork.id
})

const isRestored = await load({
  TENDERLY_FORK_ID: forkInfo.simulation_fork.id,
  TENDERLY_CHECKPOINT: checkpoint
})

const getEthTx = await geteth({
  TENDERLY_FORK_ID: forkInfo.simulation_fork.id,
  TENDERLY_WALLET_ADDRESS
})

const getSnxTx = await getsnx({
  TENDERLY_FORK_ID: forkInfo.simulation_fork.id,
  TENDERLY_WALLET_ADDRESS,
  TENDERLY_SNX_WHALE_ADDRESS
})
```
