

export function mapType(graphType: string) {
    switch (graphType) {
        case 'ID':
        case 'Bytes':
        case 'String':
            return 'string';
        case 'BigInt':
        case 'BigDecimal':
            return 'Wei';
        case 'Int':
            return 'number';
        case 'Boolean':
            return 'boolean';
    }
}