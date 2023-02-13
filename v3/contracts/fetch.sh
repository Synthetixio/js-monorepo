#!/usr/bin/env bash

set -u

export CHAIN_NAME=$1
echo CHAIN_NAME=$CHAIN_NAME

export SYNTHETIX_VERSION=$(node -e 'process.stdout.write(require(`./package.json`).version)')
echo SYNTHETIX_VERSION=$SYNTHETIX_VERSION

export DEBUG="cannon:*"

export CHAIN_ID_HEX=$(curl -s -X POST  -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "id": 1, "method": "eth_chainId"}' "https://$CHAIN_NAME.infura.io/v3/$INFURA_KEY" | jq -r '.result')
echo CHAIN_ID_HEX=$CHAIN_ID_HEX

export CHAIN_ID=$(node -e "process.stdout.write(parseInt('$CHAIN_ID_HEX', 16).toString())")
echo CHAIN_ID=$CHAIN_ID

echo yarn cannon inspect synthetix:$SYNTHETIX_VERSION --chain-id $CHAIN_ID --write-deployments ./deployments/$CHAIN_NAME
yarn cannon inspect synthetix:$SYNTHETIX_VERSION --chain-id $CHAIN_ID --write-deployments ./deployments/$CHAIN_NAME

mkdir -p ./metadata/$CHAIN_NAME
echo yarn cannon inspect synthetix:$SYNTHETIX_VERSION --chain-id $CHAIN_ID --json | jq '. | del(.state)' > ./metadata/$CHAIN_NAME/metadata.json
yarn cannon inspect synthetix:$SYNTHETIX_VERSION --chain-id $CHAIN_ID --json | jq '. | del(.state)' > ./metadata/$CHAIN_NAME/metadata.json
yarn prettier --write ./metadata/$CHAIN_NAME/metadata.json
