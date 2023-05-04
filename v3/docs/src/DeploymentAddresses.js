import React from 'react';
import { deploymentAddresses } from './lib/deploymentAddresses';
import { modules } from './lib/modules';
import { kebabize } from './lib/kebabize';
import { AddressLink } from './AddressLink';

export function DeploymentAddresses({ chain }) {
  return (
    <table style={{ verticalAlign: 'top', whiteSpace: 'nowrap' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Modules</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ verticalAlign: 'top' }}>Core System</td>
          <td style={{ verticalAlign: 'top' }}>
            <AddressLink chain={chain} address={deploymentAddresses[chain].CoreProxy} />
          </td>
          <td>
            {modules[chain].CoreProxy.map((module) => (
              <p key={module} style={{ fontSize: '0.8em', marginBottom: 0 }}>
                <a href={'./smart-contracts#' + kebabize(module)}>{module}</a>
              </p>
            ))}
          </td>
        </tr>
        <tr>
          <td style={{ verticalAlign: 'top' }}>Account Token</td>
          <td style={{ verticalAlign: 'top' }}>
            <AddressLink chain={chain} address={deploymentAddresses[chain].AccountProxy} />
          </td>
          <td>
            {modules[chain].AccountProxy.map((module) => (
              <p key={module} style={{ fontSize: '0.8em', marginBottom: 0 }}>
                <a href={'./smart-contracts#' + kebabize(module)}>{module}</a>
              </p>
            ))}
          </td>
        </tr>
        <tr>
          <td style={{ verticalAlign: 'top' }}>snxUSD Token</td>
          <td style={{ verticalAlign: 'top' }}>
            <AddressLink chain={chain} address={deploymentAddresses[chain].USDProxy} />
          </td>
          <td>
            {modules[chain].USDProxy.map((module) => (
              <p key={module} style={{ fontSize: '0.8em', marginBottom: 0 }}>
                <a href={'./smart-contracts#' + kebabize(module)}>{module}</a>
              </p>
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
