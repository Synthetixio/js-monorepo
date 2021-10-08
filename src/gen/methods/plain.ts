import { body, types } from "../segments/body";
import { Schema } from "../types";

import fs from 'fs';
import path from 'path';

/**
 * Writes a single file which contains types and async functions for every queryable entity.
 */
export default function plain(schema: Schema, outdir: string) {

    console.log('plain to run', schema);

    const out: string[] = [];

    for (const type of schema.types) {
        out.push(types(type));
        out.push();
        out.push(`export ${type} = ${body(type)}`);
        out.push();
    }
    
    console.log('write file sync!');

    fs.writeFileSync(path.join(outdir, 'index.ts'), outdir);
}