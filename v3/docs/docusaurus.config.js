// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require.resolve('@docusaurus/preset-classic'); // This notifies deps that this package is in use.
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Synthetix Documentation',
  tagline: 'The Derivates Liquidity Protocol',
  url: 'https://docs.synthetix.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'synthetixio', // Usually your GitHub org/user name.
  projectName: 'snx-v3-docs', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/synthetixio/js-monorepo/tree/master/v3/docs',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
      },
      routeBasePath: 'blog',
      navbar: {
        title: 'Synthetix Documentation',
        logo: {
          alt: 'Synthetix Documentation',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'protocol/overview',
            position: 'right',
            label: 'Protocol',
          },
          {
            type: 'doc',
            docId: 'governance/overview',
            position: 'right',
            label: 'Governance',
          },
          {
            type: 'doc',
            docId: 'upgrades/overview',
            position: 'right',
            label: 'Upgrades',
          },
          {
            href: 'https://github.com/Synthetixio/synthetix-v3',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
          {
            href: 'https://t.co/MoZraZDBZF',
            position: 'right',
            className: 'header-discord-link',
            'aria-label': 'Join Discord',
          },
          {
            href: 'https://twitter.com/synthetix_io',
            position: 'right',
            className: 'header-twitter-link',
            'aria-label': 'Twitter',
          },
          {
            type: 'search',
            position: 'right',
          },
          {
            href: 'https://snx-v3-prototype.vercel.app/',
            label: 'Go to App',
            className: 'button--header button button--primary button--outline',
            position: 'right',
          },
        ],
      },
      algolia: {
        apiKey: 'YOUR_API_KEY',
        appId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        indexName: 'synthetixio_snx_docs',
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
