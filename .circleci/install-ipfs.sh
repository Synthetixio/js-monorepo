#!/bin/bash

# Determine Debian architecture
ARCH=$(uname -m)

# Check if the system is running on ARM or x86_64 architecture
if [ "$ARCH" = "arm64" ]; then
  ARCH="arm64"
elif [ "$ARCH" = "x86_64" ]; then
  ARCH="amd64"
elif [ "$ARCH" = "aarch64" ]; then
  ARCH="arm64"
else
  echo "Unsupported architecture $ARCH."
  exit 1
fi

echo "Checking for existing ipfs installation..."

# Get the latest version
VERSIONS_URL="https://dist.ipfs.tech/go-ipfs/versions"
LATEST_VERSION=$(curl -sSL $VERSIONS_URL | tail -n 1)
LATEST_VERSION_NUMBER=${LATEST_VERSION#*v}

# Check if ipfs is already installed
if command -v ipfs &> /dev/null; then
  INSTALLED_VERSION=$(ipfs --version | awk '{print $3}')

  if [ "$INSTALLED_VERSION" == "$LATEST_VERSION_NUMBER" ]; then
    echo "ipfs version $INSTALLED_VERSION is already installed."
    return
  else
    echo "Updating ipfs from version $INSTALLED_VERSION to $LATEST_VERSION_NUMBER"
  fi
else
  echo "Installing ipfs version $LATEST_VERSION_NUMBER"
fi

# Download the latest version
DOWNLOAD_URL="https://dist.ipfs.tech/go-ipfs/${LATEST_VERSION}/go-ipfs_${LATEST_VERSION}_linux-${ARCH}.tar.gz"
echo "DOWNLOAD_URL=$DOWNLOAD_URL"
curl -sSL -o ipfs.tar.gz $DOWNLOAD_URL

# Extract the binary
tar -xzf ipfs.tar.gz
rm ipfs.tar.gz

# Move the binary to /usr/local/bin or another directory in your $PATH
sudo mv ./go-ipfs/ipfs /usr/local/bin/
rm -r ./go-ipfs

# Check if the installation was successful
if ipfs --version | grep -q "ipfs version"; then
  echo "ipfs version $(ipfs --version | awk '{print $3}') installed successfully."
else
  echo "Installation failed."
  exit 1
fi

echo "Initialising IPFS..."
ipfs init
