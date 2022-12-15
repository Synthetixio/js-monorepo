#!/usr/bin/env bash

set -u

export CHAIN_NAME=$1
echo CHAIN_NAME=$CHAIN_NAME

export SYNTHETIX_VERSION=$(node -e 'process.stdout.write(require(`./package.json`).version)')
echo SYNTHETIX_VERSION=$SYNTHETIX_VERSION

export DEBUG="cannon:*"

echo yarn cannon fetch-deployments synthetix:$SYNTHETIX_VERSION --fork https://$CHAIN_NAME.infura.io/v3/\$INFURA_KEY --output ./deployments/$CHAIN_NAME
yarn cannon fetch-deployments synthetix:$SYNTHETIX_VERSION --fork https://$CHAIN_NAME.infura.io/v3/$INFURA_KEY --output ./deployments/$CHAIN_NAME
