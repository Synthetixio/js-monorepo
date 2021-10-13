import _ from 'lodash';
import Wei from '@synthetixio/wei';

export interface GqlArgs {
    [key: string]: true|GqlArgs
};

export type GqlOptions = {[arg: string]: any};

function formatGqlOptions(options: GqlOptions): string {
    return _.map(options, (v, k) => `${k}:${_.isPlainObject(v) ? `{${formatGqlOptions(v)}}` : (parseFloat(v.toString()) ? v : `"${v}"`)}` ).join(',');
}

function formatGqlArgs(args: GqlArgs): string {
    return '{' + _.map(args, (v, k) => {
        if (v === true) {
            return k;
        }
        else {
            return `${k}${formatGqlArgs(v)}`
        }
    }).join(' ')  + '}';
}

export default function generateGql(name: string, options: GqlOptions, args: GqlArgs): string {
return `{${name}${Object.keys(options).length ? `(${formatGqlOptions(options)})` : ''}${formatGqlArgs(args)}}`
}