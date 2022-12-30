import React from 'react';
import { etherscanLink } from './lib/etherscanLink';
export function AddressLink({ chain, address }) {
  return (
    <a
      target="_blank"
      href={etherscanLink({ chain, address })}
      style={{ fontFamily: 'Monaco, Consolas, monospace' }}
    >
      {address}
    </a>
  );
}
