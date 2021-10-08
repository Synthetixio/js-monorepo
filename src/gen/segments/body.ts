import { Type } from "../types";
import { mapType } from "../util";

/**
 * Generates the code needed 
 */
export function body(type: Type) {
return `
async function<T, K extends keyof ${type.name}Result>(url: string, filter: ${type.name}Options, args: K[]): Pick<${type}Result, K> {
    await fetch(url, {
        method: 'POST',
        options: generateGql(filter, args)
    });
}
`;
}

export function types(type: Type) {
    const lines: string[] = [];

lines.push(`type ${type.name}Options {`);
for (const field of type.inputFields) {
    lines.push(`${field.name}: ${mapType(field.type.name)}`);
}
lines.push('}');

lines.push(`type ${type.name}Result {`);
for (const field of type.fields) {
    lines.push(`${field.name}: ${mapType(field.type.name)}`);
}
lines.push(`}`);

    return lines.join('\n');
}