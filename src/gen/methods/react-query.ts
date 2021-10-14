import { heading, multiBody, singleBody, types } from "../segments/body";
import { Schema } from "../types";

/**
 * Writes a single file which contains `useQuery` hooks for calling any subgraph query
 */
export default function reactquery(schema: Schema): string {

    const out: string[] = [];

    out.push(`import { useQuery, UseQueryOptions } from 'react-query';`);
    out.push(heading());

    for (const type of schema.types) {
        out.push(types(type));

        out.push(`export const useGetOne${type.name} = <K extends keyof ${type.name}Result>(url: string, options?: SingleQueryOptions, args?: ${type.name}Args<K>, queryOptions: UseQueryOptions<Pick<${type.name}Result, K>> = {}) => {
            const func = ${singleBody(type)};

            const enabled = options && args;

            return useQuery(
                ['codegen-graphql', enabled ? generateGql('${type.name}', options, args) : null],
                async () => func(url, options!, args!),
                {
                    ...queryOptions,
                    enabled: !!options && !!args
                }
            );
        }`);
        
        
        out.push(`export const useGetGetMany${type.name} = <K extends keyof ${type.name}Result>(url: string, options?: MultiQueryOptions<${type.name}Filter>, args?: ${type.name}Args<K>, queryOptions: UseQueryOptions<Pick<${type.name}Result, K>[]> = {}) => {
            const func = ${multiBody(type)};

            const enabled = options && args;

            return useQuery(
                ['codegen-graphql', enabled ? generateGql('${type.name}s', options, args) : null],
                async () => func(url, options!, args!),
                {
                    ...queryOptions,
                    enabled: !!options && !!args
                }
            );
        }`);
    }

    return out.join('\n');
}