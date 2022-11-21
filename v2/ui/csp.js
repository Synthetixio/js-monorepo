const csp = {
  'default-src': `'self'`,
  'script-src': [`'self'`, `'unsafe-inline'`, 'https://analytics.synthetix.io']
    .concat(process.env.NODE_ENV === 'production' ? [] : [`'unsafe-eval'`])
    .join(' '),
  'style-src': [`'self'`, `'unsafe-inline'`].join(' '),
  'img-src': [
    `'self'`,
    'data:',
    'https://raw.githubusercontent.com',

    // bridge
    'https://movricons.s3.ap-south-1.amazonaws.com',
    'https://assets.coingecko.com',
  ].join(' '),
  'font-src': [`'self'`, 'data:'].join(' '),
  'frame-ancestors': [`'self'`, 'https://gnosis-safe.io', 'https://app.safe.global'].join(' '),
  'form-action': `'self'`,
  'base-uri': `'self'`,
  'connect-src': [
    "'self'",
    'https://*.infura.io',
    'https://*.alchemyapi.io',
    'https://api.thegraph.com',
    'https://api.synthetix.io',
    'https://analytics.synthetix.io',

    // debt
    'https://api-v2.dhedge.org/graphql',

    // bridge
    'https://api.socket.tech',

    // v1 dashboard:
    'https://api.curve.fi',
    'https://api.yearn.finance',

    // v1 governance:
    'https://hub.snapshot.org/graphql',
    'https://api.boardroom.info',

    // onboard wallet connector:
    'https://api.tor.us',
    'wss://www.walletlink.org/rpc', // coinbase
  ].join(' '),
  'prefetch-src': [
    `'self'`,

    // onboard wallet connector:
    'https://app.tor.us',
  ].join(' '),
  'frame-src': [
    `'self'`,

    // onboard wallet connector:
    'https://widget.portis.io',
  ].join(' '),
};

const cspCompiled = Object.entries(csp)
  .map(([key, val]) => `${key} ${val}`)
  .join('; ');

function updateVercel() {
  const fs = require('fs');
  const prettier = require('prettier');

  const vercel = JSON.parse(fs.readFileSync('./vercel.json', 'utf8'));
  vercel.headers.forEach((item) =>
    item.headers.forEach((header) => {
      if (header.key === 'Content-Security-Policy') {
        header.value = cspCompiled;
      }
    })
  );

  const prettierOptions = JSON.parse(fs.readFileSync('../../.prettierrc', 'utf8'));

  fs.writeFileSync(
    './vercel.json',
    prettier.format(JSON.stringify(vercel, null, 2), { parser: 'json', ...prettierOptions }),
    'utf8'
  );
}

module.exports = {
  csp,
  cspCompiled,
  updateVercel,
};
