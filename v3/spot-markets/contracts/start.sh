#!/usr/bin/env bash

set -u

export CHAIN_NAME=$1
echo CHAIN_NAME=$CHAIN_NAME

#export SYNTHETIX_VERSION=$(node -e 'process.stdout.write(require(`./package.json`).version)')
export SYNTHETIX_VERSION=${2:-latest}
echo SYNTHETIX_VERSION=$SYNTHETIX_VERSION

export DEBUG="cannon:*"

echo yarn cannon synthetix-spot-market:$SYNTHETIX_VERSION --provider-url https://$CHAIN_NAME.infura.io/v3/\$INFURA_KEY
yarn cannon synthetix-spot-market:$SYNTHETIX_VERSION --provider-url https://$CHAIN_NAME.infura.io/v3/$INFURA_KEY
