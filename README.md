Codegen Graph TS
====

Instantly build a typescript library which can be used to query your subgraphs!

Features:

* supports all options one would use in a graphql query, without needing to format a query
* full and advanced type checking and exported types
* supports multiple library modes (currently plain async-await functions, and react-query functions)
* automatic pagination

## Usage

1. Enter your project's directory, and run `npm i --save codegen-graph-ts` (note that retention of this dependency is required for the generated code to function)
2. Download the subgraph's manifest. To do so, find the subgraph's API url (located under "Queries (HTTP)" on subgraph page), and then run: `npx codegen-graph-ts pull <url> > manifest.json`
3. Generate the code from your downloaded manifest: `npx codegen-graph-ts gen -s manifest.json -o subgraph.ts`
4. You now have a typescript file, `subgraph.ts` which can be used to query data. For example, the below code snippet can be used to download top 1500 user balances in a hypothetical subgraph, and print them out:

```
import { getManyUserBalance } from './subgraph';

const MY_SUBGRAPH_URL = 'https://thegraph...';

const func = async () => {
    const topBalances = await getManyUserBalance(MY_SUBGRAPH_URL, { first: 1500, orderBy: 'balanceOf', orderDirection: 'desc' }, { id: true, balanceOf: true, token: { symbol: true, name: true } });

    console.log('top balances:');
    for (const entry of topBalances) {
        console.log(`${entry.id}: ${entry.balanceOf.toString(2)}`);
    }
};

func();
```

It is reccomended to add your `manifest.json` (or equivalent) to your git repository, and use CI to generate the `subgraph.ts` using the command from step 3. This will allow for your projcet to retain consistancy and managed upgrades if the upstream subgraph changes.

### Usage with existing codegen

If your project has existing codegen scripts, you can generate the subgraph progmatically. For example:

```
const cgt = require('codegen-graph-ts');

const text = cgt.gen({
    schema: JSON.parse(fs.readFileSync('manifest.json')),
});

fs.writeFileSync(`subgraphQuery.ts`, text);
```

## Supported Methods

Currently supported generation methods are `plain` (raw async/await) and `reactquery` (react hooks which query subgraph--suitable for direct usage in frontend code)

TBC

## Examples

* [`codegen-demo`]() -- purpose built demo to showcase the functionality of this library
