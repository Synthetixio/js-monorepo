import { gql } from 'graphql-request';

export const INTROSPECTION_QUERY = gql`query IntrospectionQuery {
    __schema {
        types {
            name
            inputFields {
                name
                type {
                    name
                }
            }
            fields {
                name
                type {
                    name
                }
            }
        }
    }
}
`;