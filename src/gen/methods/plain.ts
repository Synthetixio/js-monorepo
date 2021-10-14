import { heading, multiBody, singleBody, types } from "../segments/body";
import { Schema } from "../types";

/**
 * Writes a single file which contains types and async functions for every queryable entity.
 */
export default function plain(schema: Schema): string {

    const out: string[] = [];

    out.push(heading());

    for (const type of schema.types) {
        out.push(types(type));
        out.push(`export const getOne${type.name} = ${singleBody(type)};`);
        out.push(`export const getMany${type.name} = ${multiBody(type)};`);
    }

    return out.join('\n');
}