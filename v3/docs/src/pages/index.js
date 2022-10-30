import React from 'react';

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
            <a
              target="_blank"
              style={{ float: 'right' }}
              href="https://v3.synthetix.io"
              class="button button--outline button--primary"
            >
              Go to App
            </a>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <a target="_blank" className="intro-link" href="/protocol/overview">
              <h1>Synthetix Protocol</h1>
              <span>Create and back for on-chain derivatives.</span>
            </a>
          </div>
        </div>

        <div class="row">
          <div class="col col--6">
            <a target="_blank" className="intro-link" href="/governance/overview">
              <h1>Governance</h1>
              <span>
                Vote for DAO members. Review proposed protocol upgrades and configuration changes.
              </span>
            </a>
          </div>
          <div class="col col--6">
            <a target="_blank" className="intro-link" href="/upgrades/overview">
              <h1>Upgrades</h1>
              <span>
                Review the protocol’s changelog, upcoming releases, and technical details of the
                proxy architecture.
              </span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
