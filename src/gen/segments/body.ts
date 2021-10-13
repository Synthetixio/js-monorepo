import { Type } from "../types";
import { mapType } from "../util";

/**
 * Required imports and primitive types required for other functions
 * @returns Text to be injected for the heading
 */
export function heading() {
return `
import Wei, { WeiSource, wei } from '@synthetixio/wei';
import { fetch, generateGql } from 'codegen-graph-ts';


export type SingleQueryOptions = {
    id: string,
    block?: { 'number': number }|{ hash: string },
};

export type MultiQueryOptions<T> = {
    where?: T,
    block?: { 'number': number }|{ hash: string },
    orderBy?: string,
    orderDirection?: 'asc'|'desc' 
};
`;
}

function queryFunctionName(t: Type) {
    return t.name.replace(/^./, t.name[0].toLowerCase());
}

function injectParse(t: Type) {
    const out = [`const formattedObj = {};`];
    for (const f of t.fields) {
        switch(f.type.name) {
            case 'BigDecimal':
                out.push(`if (obj['${f.name}']) formattedObj['${f.name}'] = wei(obj['${f.name}']);`);
                break;
            case 'BigInt':
                out.push(`if (obj['${f.name}']) formattedObj['${f.name}'] = wei(obj['${f.name}'], 0);`);
                break;
            default:
                out.push(`if (obj['${f.name}']) formattedObj['${f.name}'] = obj['${f.name}'];`)
        }
    }

    return out.join('\n');
}

/**
 * Generates an async function body for fetching and parsing query options
 */
export function multiBody(t: Type) {
return `async function<K extends keyof ${t.name}Result>(url: string, options: MultiQueryOptions<${t.name}Filter>, args: ${t.name}Args<K>): Promise<Pick<${t.name}Result, K>[]> {
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({query: generateGql('${queryFunctionName(t)}s', options, args) })
    });

    const r = await res.json() as any;

    return (r.data[Object.keys(r.data)[0]] as any[]).map((obj) => {
${injectParse(t)}
        return formattedObj as Pick<${t.name}Result, K>;
    });
}`;
}

/**
 * Generates an async function body for fetching and parsing query options
 */
export function singleBody(t: Type) {
return `async function<K extends keyof ${t.name}Result>(url: string, options: SingleQueryOptions, args: ${t.name}Args<K>): Promise<Pick<${t.name}Result, K>> {
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({query: generateGql('${queryFunctionName(t)}', options, args) })
    });

    const r = await res.json() as any;

    const obj = (r.data[Object.keys(r)[0]] as any);
${injectParse(t)}
        return formattedObj as Pick<${t.name}Result, K>;
}`;
}

export function types(type: Type) {
    const lines: string[] = [];

lines.push(`export type ${type.name}Filter = {`);
for (const field of type.inputFields) {
    lines.push(`\t${field.name}?: ${mapType(field.type.name, 'Filter')}`);
}
lines.push('};');
lines.push('\n');

lines.push(`export type ${type.name}Result = {`);
for (const field of type.fields) {
    lines.push(`\t${field.name}: ${mapType(field.type.name, 'Result')}`);
}
lines.push(`};`);

lines.push(`export type ${type.name}Args<K extends keyof ${type.name}Result> = { [Property in keyof Pick<${type.name}Result, K>]: (true|{[str: string]: any}) };`);

lines.push('');

    return lines.join('\n');
}