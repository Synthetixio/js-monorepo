

export function mapType(graphType: string, destType: string) {
    switch (graphType) {
        case 'ID':
        case 'Bytes':
        case 'String':
            return 'string';
        case 'BigInt':
        case 'BigDecimal':
            return destType === 'Filter' ? 'WeiSource' : 'Wei';
        case 'Int':
            return 'number';
        case 'Boolean':
            return 'boolean';
    }
}