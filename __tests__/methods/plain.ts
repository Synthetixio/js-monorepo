import { gen } from '../../src/gen';
import { Schema } from '../../src/gen/types';

import singleEntityInput from '../subgraphs/single-entity.json';

import { getDiagnosticsForText } from '../../helpers/ts';
import _ from 'lodash';

describe('plain', () => {
    it('generates valid typescript', () => {
        const codeOut = gen({
            schema: singleEntityInput as Schema,
            method: 'plain',
            outdir: '/tmp/testgen',
        });

        const diag = getDiagnosticsForText(__dirname, codeOut).map(d => _.pick(d, 'messageText', 'start', 'length'));

        expect(diag).toHaveLength(1); // 2 includes errors
    });
});