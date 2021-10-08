import { gen } from '../../src/gen';
import { Schema } from '../../src/gen/types';

import schema from '../subgraphs/sample.json';

describe('plain', () => {
    it('generates', () => {
        gen({
            schema: schema as Schema,
            method: 'plain',
            outdir: '/tmp/testgen',
        });
    });
});