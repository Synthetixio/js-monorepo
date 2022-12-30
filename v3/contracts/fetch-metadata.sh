#!/usr/bin/env bash

set -u

export SYNTHETIX_VERSION=$(node -e 'process.stdout.write(require(`./package.json`).version)')
echo "SYNTHETIX_VERSION=$SYNTHETIX_VERSION"

export DEBUG="cannon:*"

echo "yarn cannon inspect synthetix:$SYNTHETIX_VERSION --json > ./deployments/metadata.json"
yarn cannon inspect synthetix:$SYNTHETIX_VERSION --json > ./deployments/metadata.json
