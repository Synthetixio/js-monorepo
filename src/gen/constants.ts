import { gql } from 'graphql-request';

export const INTROSPECTION_QUERY = gql`query IntrospectionQuery {
    __schema {
        types {
            name
            inputFields {
                name
                type {
                    name
                    kind
                }
            }
            fields {
                name
                type {
                    kind
                    ofType { name }
                    name
                }
            }
        }
    }
}
`;