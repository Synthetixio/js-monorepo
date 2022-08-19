import * as _ from 'lodash';

export interface GqlArgs {
  [key: string]: true | GqlArgs;
}

export type GqlOptions = { [arg: string]: any };

export function formatGqlOptions(options: GqlOptions): string {
  return _.map(options, (v, k) => {
    let valueString: string;
    if (_.isPlainObject(v)) {
      valueString = `{${formatGqlOptions(v)}}`;
    } else if (Array.isArray(v)) {
      let parsedArray = '[';
      for (let i = 0; i < v.length; i++) {
        parsedArray = parsedArray.concat(`"${v[i]}",`);
      }
      parsedArray = parsedArray.slice(0, -1).concat(']');
      return `${k}:`.concat(parsedArray);
    } else if (_.isNil(v)) {
      valueString = 'null';
    } else if (v[1] == 'x' || (_.isNaN(parseFloat(v.toString())) && typeof v !== 'boolean')) {
      valueString = `"${v}"`;
    } else valueString = v;
    return `${k}:${valueString}`;
  }).join(',');
}

export function formatGqlArgs(args: GqlArgs): string {
  return (
    '{' +
    _.map(args, (v, k) => {
      if (v === true) {
        return k;
      } else {
        return `${k}${formatGqlArgs(v)}`;
      }
    }).join(' ') +
    '}'
  );
}

export function generateGql(name: string, options: GqlOptions, args: GqlArgs): string {
  return `{${name}${
    Object.keys(options).length ? `(${formatGqlOptions(options)})` : ''
  }${formatGqlArgs(args)}}`;
}
