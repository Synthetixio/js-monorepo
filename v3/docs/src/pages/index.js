import React from 'react';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <main>
      <div class="container" style={{ maxWidth: '720px', margin: '80px auto' }}>
        <div class="row" style={{ marginBottom: '40px' }}>
          <div class="col">
            <img
              src="/img/hp_logo.svg"
              alt="Synthetix Documentation"
              style={{ marginTop: '4px' }}
            />
            <Link
              style={{ float: 'right' }}
              to="https://snx-v3-prototype.netlify.app"
              class="button button--outline button--primary"
            >
              Go to App
            </Link>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <Link className="intro-link" to="/protocol/overview">
              <h1>Synthetix Protocol</h1>
              <span>Create, trade, and stake for on-chain derivatives.</span>
            </Link>
          </div>
        </div>

        <div class="row">
          <div class="col col--6">
            <Link className="intro-link" to="/governance/overview">
              <h1>Governance</h1>
              <span>
                Vote for the DAO and review SIPs &amp; SCCPs for protocol upgrades and
                configurations.
              </span>
            </Link>
          </div>
          <div class="col col--6">
            <Link className="intro-link" to="/upgrades/overview">
              <h1>Upgrades</h1>
              <span>
                Review the protocol’s changelog, upcoming releases, and technical details of the
                proxy architecture.
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
