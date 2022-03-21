# Synthetix-ui

### Release

Releasing is done with the help of semantic-release. More to docs to come...

reuseable react components

### Local Development

Install globally yalc

```bash
    npm|yarn install|add yalc -g
```

Once you make some changes in the library run

```bash
yarn yalc-publish
```

Now your changes are in your local registry.
Switch to your repo that consumes this library and run

```bash
yalc add @synthetixio/ui
```
