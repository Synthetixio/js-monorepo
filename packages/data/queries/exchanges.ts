import { gql } from 'graphql-request'

export const exchangesQuery = gql`
    query shorts($account: String!) {
        shorts(where: { account: $account, isOpen: true }, orderBy: id, orderDirection: desc) {
            id
            txHash
            collateralLocked
            collateralLockedAmount
            synthBorrowed
            synthBorrowedAmount
            isOpen
            createdAt
            closedAt
        }
    }
`;