import { Command } from 'commander';

import fs from 'fs';

import fetch from 'node-fetch';
import { INTROSPECTION_QUERY } from './constants';
import { Schema } from './types';

import methods from './methods';

interface PullOptions {
    url?: string
}

interface GenOptions extends PullOptions {
    method: string
    outdir: string
    schema: Schema
}

export async function pull(options: PullOptions): Promise<Schema> {
    const res = await fetch(options.url!, {
        method: 'POST',
        body: JSON.stringify({query: INTROSPECTION_QUERY })
    });

    const rawSchema = (await res.json()).data.__schema as Schema;

    const newTypes = rawSchema.types
        .filter(t => !t.name.startsWith('_') && !t.name.endsWith('_filter') && !t.name.endsWith('_orderBy') && 
            t.name !== 'BigDecimal' &&
            t.name !== 'BigInt' &&
            t.name !== 'Block_height' &&
            t.name !== 'Boolean' &&
            t.name !== 'Bytes' &&
            t.name !== 'Int' &&
            t.name !== 'OrderDirection' &&
            t.name !== 'Query' &&
            t.name !== 'String')
        .map(t => ({
            ...t,
            inputFields: rawSchema.types.find(rt => rt.name === t.name + '_filter')?.inputFields || []
        }));

    return {
        types: newTypes
    };
}

export async function gen({ schema, method, outdir }: GenOptions) {

    if (!(methods as any)[method]) {
        throw new Error(`method "${method}" not supported. Please try one of: ${Object.keys(methods).join(', ')}`);
    }

    await (methods as any)[method](schema, outdir);
}

if (require.main === module) {
    const program = new Command();

    program
        .command('pull')
        .description('retrieves the graphql schema associated with the given subgraph url')
        .requiredOption('-u, --url <location>', 'subgraph to extract schema from')
        .action(async (options) => {
            console.log(JSON.stringify(await pull(options as PullOptions)));
        });
    
    
    program.command('gen')
        .description('generate the typescript code to fetch from a subgraph')
        .option('-u, --url <location>', 'subgraph to extract schema from')
        .option('-s, --schema <path to .json>', 'location of a schema previously downloded with pull')
        .requiredOption('-o, --out <directory>', 'directory to export the generated typescript files')
        .action(async (options) => {
    
            if (options.file && options.url) {
                throw new Error('only one of file or url should be specified');
            }
        
            let schema: Schema;
            if (options.url) {
                schema = await pull(options);
            }
            else if (options.file) {
                schema = JSON.parse(fs.readFileSync(options.file).toString());
            }
            else {
                throw new Error('supply either a file or url');
            }
    
            gen({
                schema,
                ...options
            })
        });
    
    program.parse(process.argv);
}